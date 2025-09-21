import Database from 'better-sqlite3';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DATABASE_URL || path.join(__dirname, '..', 'db', 'local.db');
console.log('Using DB:', dbPath);
const db = new Database(dbPath);

function sha256hex(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}

try {
  // ensure guard table exists
  const row = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='guard'").get();
  if (!row) {
    console.error('guard table not found in DB');
    process.exit(1);
  }

  // find next G###
  const rows = db.prepare('SELECT guard_id FROM guard').all();
  let max = 0;
  for (const r of rows) {
    const g = r.guard_id;
    if (typeof g === 'string' && g.startsWith('G')) {
      const n = parseInt(g.slice(1), 10);
      if (!isNaN(n) && n > max) max = n;
    }
  }
  const next = max + 1;
  const guardId = `G${String(next).padStart(3, '0')}`;

  // but user wants username 'guard1' and password 'guard1'
  const username = 'guard1';
  const password = 'guard1';
  const passwordHash = sha256hex(password);
  const name = 'Guard 1';

  // ensure username or guardId not already exist
  const exists = db.prepare('SELECT * FROM guard WHERE username = ? OR guard_id = ?').get(username, guardId);
  if (exists) {
    console.error('A guard with that username or guardId already exists:', exists);
    process.exit(1);
  }

  const insert = db.prepare('INSERT INTO guard (username, password_hash, name, phone, guard_id, profile_pic) VALUES (?, ?, ?, ?, ?, ?)');
  const info = insert.run(username, passwordHash, name, null, guardId, null);
  console.log('Inserted guard:', { id: info.lastInsertRowid, username, guardId, password });
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  db.close();
}
