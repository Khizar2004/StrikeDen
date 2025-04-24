import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a class title'],
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  shortDescription: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Class || mongoose.model('Class', ClassSchema); 