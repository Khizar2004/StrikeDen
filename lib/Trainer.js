// lib/Trainer.js
import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, 'Trainer name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  specialization: {
    type: [String],
    required: [true, 'At least one specialization is required'],
    validate: {
      validator: (specs) => specs.length > 0,
      message: 'At least one specialization is required'
    }
  },
  experience: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  active: {
    type: Boolean,
    default: true
  },
  certifications: {
    type: [String],
    validate: {
      validator: (certs) => certs.length <= 10,
      message: 'Cannot have more than 10 certifications'
    }
  }
}, { timestamps: true });

// Add text index for search functionality
TrainerSchema.index({ name: 'text', specialization: 'text' });

export default mongoose.models.Trainer || 
       mongoose.model('Trainer', TrainerSchema);