import { getTripData } from '@/lib/storage';
import { PackingClient } from './PackingClient';

export const dynamic = 'force-dynamic';

export default async function PackingPage() {
  const data = await getTripData();
  return <PackingClient data={data} />;
}
