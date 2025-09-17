import { db } from '../src/lib/server/db';
import { user, admin } from '../src/lib/server/db/schema';

async function migrateAdmins() {
  // 1. Get all users with role 'admin' using raw SQL
  const admins = await db.all(
    `SELECT * FROM user WHERE role = 'admin'`
  );
  if (!admins.length) {
    console.log('No admin users found in user table.');
    return;
  }
  // 2. Insert into admin table
  for (const row of admins) {
    const u = row as {
      id: string;
      username: string;
      password_hash: string;
      name: string | null;
      email: string | null;
      phone: string | null;
      profile_pic: string | null;
    };
    await db.insert(admin).values({
      id: u.id,
      username: u.username,
      passwordHash: u.password_hash,
      name: u.name,
      email: u.email,
      phone: u.phone,
      profilePic: u.profile_pic
    });
    console.log(`Migrated admin: ${u.username}`);
  }
  // 3. Remove admins from user table using raw SQL
  await db.run(`DELETE FROM user WHERE role = 'admin'`);
  console.log('Migration complete. All admin users moved to admin table.');
}

migrateAdmins().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
