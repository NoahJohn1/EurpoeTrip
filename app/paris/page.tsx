import { getTripData } from '@/lib/storage';
import { ParisClient } from './ParisClient';

export const dynamic = 'force-dynamic';

export default async function ParisPage() {
  const data = await getTripData();
  return <ParisClient data={data} />;
}
