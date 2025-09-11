import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private init() {
    // Create users table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        about_me TEXT,o
        street_address TEXT,
        city TEXT,
        state TEXT,
        zip TEXT,
        birthdate TEXT,
        current_step INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create onboarding_config table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS onboarding_config (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_2_components TEXT NOT NULL,
        page_3_components TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default configuration if none exists
    this.db.get('SELECT COUNT(*) as count FROM onboarding_config', (err, row: unknown) => {
      if (err) {
        console.error('Error checking config:', err);
        return;
      }
      
      if ((row as { count: number }).count === 0) {
        this.db.run(`
          INSERT INTO onboarding_config (page_2_components, page_3_components)
          VALUES ('["about_me", "birthdate"]', '["address"]')
        `);
      }
    });
  }

  // Promisify database methods
  run(sql: string, params: unknown[] = []): Promise<{ lastID: number; changes: number }> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }

  get(sql: string, params: unknown[] = []): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(sql: string, params: unknown[] = []): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  close() {
    this.db.close();
  }
}

export const db = new Database();
