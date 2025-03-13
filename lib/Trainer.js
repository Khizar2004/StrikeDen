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
    type: String,
    required: [true, 'Specialization is required'],
    enum: {
      values: ['Boxing', 'Brazilian Jiu-Jitsu', 'Muay Thai', 'Wrestling', 'MMA', 'Conditioning', 'Strength Training', 'Boxing Coach', 'MMA Coach'],
      message: '{VALUE} is not a valid specialization'
    }
  },
  experience: {
    type: Number,
    required: true,
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience cannot exceed 50 years']
  },
  image: {
    type: String,
    match: [
      /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/,
      'Invalid image URL format'
    ]
  },
  bio: {
    type: String,
    maxlength: [200, 'Bio cannot exceed 200 characters']
  },
  active: {
    type: Boolean,
    default: true
  },
  certifications: {
    type: [String],
    validate: {
      validator: (certs) => certs.length <= 5,
      message: 'Cannot have more than 5 certifications'
    }
  }
}, { timestamps: true });

// Add text index for search functionality
TrainerSchema.index({ name: 'text', specialization: 'text' });

export default mongoose.models.Trainer || 
       mongoose.model('Trainer', TrainerSchema);