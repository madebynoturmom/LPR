import 'dotenv/config';
import Database from 'better-sqlite3';

function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const client = new Database(dbUrl);
  try {
    const stmt = client.prepare("PRAGMA table_info('guard')");
    const cols = stmt.all();
    const hasPassword = cols.some((c: any) => c.name === 'password_hash');
    if (hasPassword) {
      console.log('Column password_hash already exists on guard table.');
      process.exit(0);
    }
    console.log('Adding column password_hash to guard table...');
    client.prepare("ALTER TABLE guard ADD COLUMN password_hash TEXT").run();
    console.log('Column added successfully.');
  } catch (e) {
    console.error('Failed to add column:', e);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
