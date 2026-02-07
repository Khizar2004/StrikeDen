import { getTrainers } from '../../lib/data';
import TrainersClient from './TrainersClient';

export const revalidate = 300;

export const metadata = {
  title: 'Our Team — Strike Den',
  description: 'Meet our expert trainers. Experienced martial arts instructors dedicated to helping you achieve your fitness and training goals.',
};

export default async function TrainersPage() {
  let trainers = [];
  try {
    trainers = await getTrainers();
  } catch {}

  return <TrainersClient trainers={trainers} />;
}
