import { getTripData } from '@/lib/storage';
import { TravelClient } from './TravelClient';

export const dynamic = 'force-dynamic';

export default async function TravelPage() {
  const data = await getTripData();
  return <TravelClient data={data} />;
}
