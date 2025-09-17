
import { db } from '../src/lib/server/db/index.ts';
import { user as userTable } from '../src/lib/server/db/schema.ts';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { v4 as uuidv4 } from 'uuid';

async function createAdmin() {
  const username = 'admin1';
  const password = 'admin1';
  const passwordHash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
  const id = uuidv4();

  await db.insert(userTable).values({
    id,
    username,
    passwordHash,
    role: 'admin'
  });

  console.log('Admin user created:', username);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
