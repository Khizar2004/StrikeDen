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
    enum: {
      values: ['Boxing', 'Brazilian Jiu-Jitsu', 'Muay Thai', 'Wrestling', 'MMA', 'Conditioning'],
      message: '{VALUE} is not a valid class type'
    }
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required'],
    validate: {
      validator: function(endTime) {
        return endTime > this.startTime;
      },
      message: 'End time must be after start time'
    }
  },
  trainer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trainer',
    required: [true, 'Trainer is required']
  },
  capacity: {
    type: Number,
    required: [true, 'Class capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [50, 'Capacity cannot exceed 50']
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  waitlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  }],
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    type: String,
    enum: {
      values: ['daily', 'weekly', 'biweekly', 'monthly', null],
      message: '{VALUE} is not a valid recurring pattern'
    },
    default: null
  },
  active: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for available spots
ScheduleSchema.virtual('availableSpots').get(function() {
  return this.capacity - (this.enrolledStudents?.length || 0);
});

// Ensure we can't enroll more students than capacity
ScheduleSchema.pre('save', function(next) {
  if (this.enrolledStudents?.length > this.capacity) {
    next(new Error('Cannot exceed class capacity'));
  }
  next();
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

export default Schedule;
