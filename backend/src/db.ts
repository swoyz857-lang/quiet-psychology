import initSqlJs, { type Database as SqlJsDatabase, type BindParams } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.isAbsolute(config.databaseUrl)
  ? path.dirname(config.databaseUrl)
  : path.resolve(process.cwd(), path.dirname(config.databaseUrl));

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.isAbsolute(config.databaseUrl)
  ? config.databaseUrl
  : path.resolve(process.cwd(), config.databaseUrl);

let dbInstance: SqlJsDatabase | null = null;

function findSqlJsWasm(): string {
  const candidates = [
    path.resolve(process.cwd(), 'node_modules/sql.js/dist/sql-wasm.wasm'),
    path.resolve(process.cwd(), '../node_modules/sql.js/dist/sql-wasm.wasm'),
    path.resolve(__dirname, '../node_modules/sql.js/dist/sql-wasm.wasm'),
    path.resolve(__dirname, '../../node_modules/sql.js/dist/sql-wasm.wasm'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error('sql-wasm.wasm not found. Ensure sql.js is installed.');
}

export async function initializeDb(): Promise<SqlJsDatabase> {
  if (dbInstance) return dbInstance;
  const wasmPath = findSqlJsWasm();
  const SQL = await initSqlJs({ locateFile: () => wasmPath });

  let data: Buffer | undefined;
  if (fs.existsSync(dbPath)) {
    data = fs.readFileSync(dbPath);
  }

  dbInstance = new SQL.Database(data);
  runMigrations(dbInstance);
  return dbInstance;
}

function columnExists(db: SqlJsDatabase, table: string, column: string): boolean {
  const stmt = db.prepare(`PRAGMA table_info(${table})`);
  let exists = false;
  while (stmt.step()) {
    const row = stmt.getAsObject();
    if (row.name === column) {
      exists = true;
      break;
    }
  }
  stmt.free();
  return exists;
}

function tableExists(db: SqlJsDatabase, table: string): boolean {
  const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`);
  stmt.bind([table]);
  const exists = stmt.step();
  stmt.free();
  return exists;
}

function runMigrations(db: SqlJsDatabase): void {
  if (!tableExists(db, 'products')) {
    // Schema will be initialized later; nothing to migrate yet.
    return;
  }

  if (!columnExists(db, 'products', 'external_checkout_url')) {
    db.exec(`ALTER TABLE products ADD COLUMN external_checkout_url TEXT;`);
    console.log('Migration: added external_checkout_url column');

    const urls: Record<string, string> = {
      'the-no-contact-blueprint': 'https://quietpsychologyhq.gumroad.com/l/no-contact-blueprint?wanted=true',
      'the-attachment-archive': 'https://quietpsychologyhq.gumroad.com/l/attachment-archive?wanted=true',
      'the-attraction-code': 'https://quietpsychologyhq.gumroad.com/l/attraction-code?wanted=true',
      'texting-psychology': 'https://quietpsychologyhq.gumroad.com/l/validation-cycle?wanted=true',
    };

    for (const [slug, url] of Object.entries(urls)) {
      db.run(`UPDATE products SET external_checkout_url = ? WHERE slug = ?`, [url, slug]);
    }

    persistDb();
    console.log('Migration: populated default Gumroad checkout URLs');
  }
}

export function getDb(): SqlJsDatabase {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initializeDb() first.');
  }
  return dbInstance;
}

export function persistDb(): void {
  if (!dbInstance) return;
  const data = dbInstance.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

export function initDatabase(): void {
  const db = getDb();
  const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
  persistDb();
  console.log('Database initialized.');
}

export function seedDatabase(): void {
  const db = getDb();
  const seedPath = path.resolve(__dirname, '../../database/seed.sql');
  const seed = fs.readFileSync(seedPath, 'utf-8');
  db.exec(seed);
  persistDb();
  console.log('Database seeded.');
}

export function closeDatabase(): void {
  persistDb();
  dbInstance?.close();
  dbInstance = null;
}

export function queryAll(sql: string, params?: BindParams): Record<string, unknown>[] {
  const db = getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params ?? []);
  const rows: Record<string, unknown>[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export function queryOne(sql: string, params?: BindParams): Record<string, unknown> | undefined {
  const db = getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params ?? []);
  const hasRow = stmt.step();
  const row = hasRow ? stmt.getAsObject() : undefined;
  stmt.free();
  return row;
}

export function run(
  sql: string,
  params?: BindParams
): { lastInsertRowid: number | bigint; changes: number } {
  const db = getDb();
  db.run(sql, params ?? []);
  const info = queryOne('SELECT last_insert_rowid() as id, changes() as changes') as {
    id: number | bigint;
    changes: number;
  };
  persistDb();
  return { lastInsertRowid: info.id, changes: info.changes };
}
