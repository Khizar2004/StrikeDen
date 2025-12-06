import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  className: { 
    type: String, 
    required: [true, 'Class name is required'],
    trim: true
  },
  classType: {
    type: String,
    required: [true, 'Class type is required'],
  },
  dayOfWeek: {
    type: String,
    required: [true, 'Day of week is required'],
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    lowercase: true,
  },
  startTimeString: {
    type: String,
    required: [true, 'Start time is required'],
    validate: {
      validator: function(v) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format! Use HH:mm`
    }
  },
  endTimeString: {
    type: String,
    required: [true, 'End time is required'],
    validate: {
      validator: function(v) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid time format! Use HH:mm`
    }
  },
  trainer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trainer'
  },
  capacity: {
    type: Number,
    required: [true, 'Class capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [50, 'Capacity cannot exceed 50'],
    default: 20
  },
  active: {
    type: Boolean,
    default: true
  },
  participants: {
    type: Number,
    default: 0,
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for available spots
ScheduleSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.participants;
});

// Custom validator to ensure end time is after start time
ScheduleSchema.pre('validate', function(next) {
  if (this.startTimeString && this.endTimeString) {
    const [startHour, startMinute] = this.startTimeString.split(':').map(Number);
    const [endHour, endMinute] = this.endTimeString.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    
    if (endMinutes <= startMinutes) {
      this.invalidate('endTimeString', 'End time must be after start time');
    }
  }
  next();
});

// Ensure we can't exceed capacity
ScheduleSchema.pre('save', function(next) {
  if (this.participants > this.capacity) {
    next(new Error('Cannot exceed class capacity'));
  }
  next();
});

// Add indexes for efficient queries
ScheduleSchema.index({ dayOfWeek: 1 });
ScheduleSchema.index({ dayOfWeek: 1, startTimeString: 1 });
// Keep trainer lookups fast as data grows
ScheduleSchema.index({ trainer: 1, dayOfWeek: 1, startTimeString: 1 });

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

export default Schedule;
