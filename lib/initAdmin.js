import { connectDB } from './dbConnect';
import Admin from './Admin';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * Initializes the admin account using environment variables if no admin exists yet.
 * Also generates or uses a provided recovery key.
 * @returns {Promise<{success: boolean, recoveryKey: string|null, message: string}>}
 */
export async function initializeAdmin() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return { 
        success: false, 
        recoveryKey: null,
        message: 'Admin account already exists' 
      };
    }
    
    // Get admin credentials from environment variables
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD;
    
    // Validate password
    if (!password || password.length < 12 || 
        !/[A-Z]/.test(password) || 
        !/[a-z]/.test(password) || 
        !/[0-9]/.test(password) || 
        !/[^A-Za-z0-9]/.test(password)) {
      throw new Error('ADMIN_PASSWORD must be at least 12 characters long and include uppercase, lowercase, numbers, and special characters');
    }
    
    // Generate or use provided recovery key
    const recoveryKey = process.env.ADMIN_RECOVERY_KEY || generateRecoveryKey();
    const recoveryKeyHash = await bcrypt.hash(recoveryKey, 10);
    
    // Create admin account
    await Admin.create({
      username,
      password, // Will be hashed by the pre-save hook
      isAdmin: true,
      recoveryKeyHash
    });
    
    return { 
      success: true, 
      recoveryKey: process.env.ADMIN_RECOVERY_KEY ? null : recoveryKey,
      message: 'Admin account created successfully' 
    };
  } catch (error) {
    console.error('Admin initialization error:', error);
    return { 
      success: false, 
      recoveryKey: null,
      message: error.message 
    };
  }
}

/**
 * Generates a secure recovery key
 * @returns {string} The generated recovery key
 */
function generateRecoveryKey() {
  return crypto.randomBytes(16).toString('hex');
} 