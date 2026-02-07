import { getTrainers, getClasses } from '../lib/data';
import HomeClient from './HomeClient';

export const revalidate = 300;

export const metadata = {
  title: 'Strike Den — Where Champions Are Forged',
  description: 'World-class combat sports training in Karachi. Expert trainers, diverse programs for all skill levels. Boxing, MMA, Brazilian Jiu-Jitsu and more.',
};

export default async function Home() {
  let trainers = [];
  let classes = [];
  try {
    [trainers, classes] = await Promise.all([
      getTrainers(),
      getClasses(),
    ]);
  } catch {}

  return (
    <HomeClient
      trainers={trainers.slice(0, 3)}
      classes={classes}
    />
  );
}
