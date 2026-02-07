import { cache } from 'react';
import { connectDB } from './dbConnect';
import Trainer from './Trainer';
import Class from './Class';
import Program from './Program';
import Schedule from './Schedule';
import Settings from './Settings';

function serialize(data) {
  return JSON.parse(JSON.stringify(data));
}

export const getClasses = cache(async () => {
  await connectDB();
  const classes = await Class.find({}).lean();
  return serialize(classes);
});

export const getPrograms = cache(async () => {
  await connectDB();
  const programs = await Program.find({}).lean();
  return serialize(programs);
});

export const getActivePrograms = cache(async () => {
  await connectDB();
  const programs = await Program.find({ active: true }).lean();
  return serialize(programs);
});

export const getTrainers = cache(async () => {
  await connectDB();
  const trainers = await Trainer.find({}).sort({ createdAt: -1 }).lean();
  return serialize(trainers);
});

export const getSchedules = cache(async () => {
  await connectDB();
  const schedules = await Schedule.find({ active: true })
    .populate('trainer', 'name image specialization')
    .sort({ dayOfWeek: 1, startTimeString: 1 })
    .lean();
  return serialize(schedules);
});

export const getTrainerById = cache(async (id) => {
  await connectDB();
  const trainer = await Trainer.findById(id).lean();
  if (!trainer) return null;
  return serialize(trainer);
});

export const getTrainerSchedules = cache(async (trainerId) => {
  await connectDB();
  const schedules = await Schedule.find({ trainer: trainerId, active: true })
    .sort({ dayOfWeek: 1, startTimeString: 1 })
    .lean();
  return serialize(schedules);
});

export const getGlobalPromotion = cache(async () => {
  await connectDB();
  const setting = await Settings.findOne({ key: 'globalPromotion' }).lean();
  return setting ? serialize(setting.value) : '';
});
