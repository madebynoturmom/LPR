import 'dotenv/config';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../src/lib/server/db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const client = new Database(dbUrl);
  const db = drizzle(client, { schema });

  const guards = await db.select().from(schema.guard);
  const created: Array<{ username: string; password: string } > = [];

  for (const g of guards) {
    // skip if passwordHash exists and non-empty
    if ((g as any).passwordHash) continue;
    const guardId = (g as any).guardId || (g as any).username || `G${Date.now()}`;
    const plainPassword = String(guardId);
    const passwordHash = encodeHexLowerCase(sha256(new TextEncoder().encode(plainPassword)));
    try {
  await db.update(schema.guard).set({ passwordHash }).where(eq(schema.guard.id, g.id));
      created.push({ username: g.username, password: plainPassword });
    } catch (e) {
      console.error('Failed to update guard', g, e);
    }
  }

  if (created.length === 0) {
    console.log('No guards needed password updates.');
  } else {
    console.log('Default passwords set for guards:');
    for (const c of created) {
      console.log(`${c.username} -> ${c.password}`);
    }
  }

  client.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
