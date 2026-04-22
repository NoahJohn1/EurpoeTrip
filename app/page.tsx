import { getTripData } from '@/lib/storage';
import { HomeClient } from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getTripData();
  return <HomeClient data={data} />;
}
