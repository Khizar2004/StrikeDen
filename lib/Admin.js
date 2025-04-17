import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    isAdmin: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: null
    },
    recoveryKeyHash: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

// Hash password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Helper method to compare passwords
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Helper method to compare recovery key
AdminSchema.methods.compareRecoveryKey = async function(candidateKey) {
  if (!this.recoveryKeyHash) return false;
  return await bcrypt.compare(candidateKey, this.recoveryKeyHash);
};

// Use mongoose.models to check if the model already exists
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin; 