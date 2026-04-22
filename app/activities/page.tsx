import { getTripData } from '@/lib/storage';
import { ActivitiesClient } from './ActivitiesClient';

export const dynamic = 'force-dynamic';

export default async function ActivitiesPage() {
  const data = await getTripData();
  return <ActivitiesClient data={data} />;
}
