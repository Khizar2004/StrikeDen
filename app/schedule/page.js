import { getSchedules } from '@/lib/data';
import ScheduleClient from './ScheduleClient';

export const revalidate = 300;

export const metadata = {
  title: 'Class Schedule — Strike Den',
  description: 'View our weekly class schedule. Plan your training sessions across all martial arts disciplines.',
};

export default async function SchedulePage() {
  let schedules = [];
  try {
    schedules = await getSchedules();
  } catch {}

  return <ScheduleClient schedules={schedules} />;
}
