import { getTrainerById, getTrainerSchedules, getTrainers } from '@/lib/data';
import TrainerProfileClient from './TrainerProfileClient';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const trainers = await getTrainers();
    return trainers.map((trainer) => ({
      id: trainer._id.toString(),
    }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const trainer = await getTrainerById(id);
    if (!trainer) return { title: 'Trainer Not Found — Strike Den' };
    return {
      title: `${trainer.name} — Strike Den`,
      description: trainer.bio || `${trainer.name} — expert trainer at Strike Den.`,
    };
  } catch {
    return { title: 'Strike Den' };
  }
}

export default async function TrainerProfile({ params }) {
  const { id } = await params;
  const [trainer, schedules] = await Promise.all([
    getTrainerById(id),
    getTrainerSchedules(id),
  ]);

  if (!trainer) {
    notFound();
  }

  return <TrainerProfileClient trainer={trainer} schedules={schedules} />;
}
