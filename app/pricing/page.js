import { getActiveClasses, getGlobalPromotion } from '../../lib/data';
import PricingClient from './PricingClient';

export const revalidate = 300;

export const metadata = {
  title: 'Class Pricing — Strike Den',
  description: 'View pricing for all Strike Den classes. Regular, student, kids, and women discounted rates available.',
};

export default async function PricingPage() {
  let classes = [];
  let globalPromotion = null;
  try {
    [classes, globalPromotion] = await Promise.all([
      getActiveClasses(),
      getGlobalPromotion(),
    ]);
  } catch {}

  return (
    <PricingClient
      classes={classes}
      globalPromotion={globalPromotion}
    />
  );
}
