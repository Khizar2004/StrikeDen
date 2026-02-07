import { getTrainers } from '../../lib/data';
import AboutClient from './AboutClient';

export const revalidate = 300;

export const metadata = {
  title: 'About Us — Strike Den',
  description: 'Learn about Strike Den\'s journey from humble beginnings to a world-class MMA facility in Karachi. Meet our team and explore our facilities.',
};

export default async function AboutPage() {
  let trainers = [];
  try {
    trainers = await getTrainers();
  } catch {}

  return <AboutClient trainers={trainers} />;
}
