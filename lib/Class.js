import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Class title is required'],
    trim: true,
    maxlength: [100, 'Class title cannot exceed 100 characters']
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  pricing: {
    walkIn: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative']
    },
    weekly: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative']
    },
    monthly: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative']
    },
    annual: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative']
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

export default mongoose.models.Class || mongoose.model('Class', ClassSchema); 