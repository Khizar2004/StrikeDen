import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  updatedBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
