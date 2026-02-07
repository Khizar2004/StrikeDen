import { getSchedules, getClasses, getActivePrograms } from '../../lib/data';
import ClassesClient from './ClassesClient';

export const revalidate = 300;

export const metadata = {
  title: 'Training Programs — Strike Den',
  description: 'Explore our diverse range of martial arts classes and programs. Boxing, MMA, BJJ, and more — designed for all skill levels.',
};

export default async function ClassesPage() {
  let schedules = [];
  let classes = [];
  let programs = [];
  try {
    [schedules, classes, programs] = await Promise.all([
      getSchedules(),
      getClasses(),
      getActivePrograms(),
    ]);
  } catch {}

  return (
    <ClassesClient
      schedules={schedules}
      classes={classes}
      programs={programs}
    />
  );
}
