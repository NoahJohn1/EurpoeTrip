import { put, list } from '@vercel/blob';
import { SEED_DATA, TripData } from './seed';

const BLOB_PATHNAME = 'trip-data.json';

function hasBlobToken(): boolean {
  return Object.keys(process.env).some(
    (k) => k === 'BLOB_READ_WRITE_TOKEN' || k.endsWith('_READ_WRITE_TOKEN')
  );
}

export async function getTripData(): Promise<TripData> {
  try {
    if (!hasBlobToken()) return SEED_DATA;

    const { blobs } = await list({ prefix: BLOB_PATHNAME });
    if (!blobs.length) return SEED_DATA;

    const res = await fetch(blobs[0].url, { cache: 'no-store' });
    if (!res.ok) return SEED_DATA;
    return await res.json();
  } catch {
    return SEED_DATA;
  }
}

export async function saveTripData(data: TripData): Promise<string> {
  const blob = await put(BLOB_PATHNAME, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
  return blob.url;
}
