import { getTripData } from '@/lib/storage';
import { LondonClient } from './LondonClient';

export const dynamic = 'force-dynamic';

export default async function LondonPage() {
  const data = await getTripData();
  return <LondonClient data={data} />;
}
