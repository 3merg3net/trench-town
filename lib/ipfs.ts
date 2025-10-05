// lib/ipfs.ts
import { Web3Storage, File } from 'web3.storage';

const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN || process.env.WEB3_STORAGE_TOKEN;

let client: Web3Storage | null = null;
function getClient() {
  if (!token) throw new Error('Missing WEB3_STORAGE_TOKEN');
  if (!client) client = new Web3Storage({ token });
  return client;
}

export async function uploadJSON(name: string, obj: any): Promise<string> {
  const c = getClient();
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const file = new File([blob], `${name}.json`, { type: 'application/json' });
  const cid = await c.put([file], { wrapWithDirectory: false });
  return `ipfs://${cid}`;
}
