import { getActivePrograms, getGlobalPromotion } from '../../lib/data';
import PricingClient from './PricingClient';

export const revalidate = 300;

export const metadata = {
  title: 'Program Pricing — Strike Den',
  description: 'View pricing for all Strike Den programs. Flexible walk-in, weekly, monthly, and annual plans available.',
};

export default async function PricingPage() {
  let programs = [];
  let globalPromotion = null;
  try {
    [programs, globalPromotion] = await Promise.all([
      getActivePrograms(),
      getGlobalPromotion(),
    ]);
  } catch {}

  return (
    <PricingClient
      programs={programs}
      globalPromotion={globalPromotion}
    />
  );
}
