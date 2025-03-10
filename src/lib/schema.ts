import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const databasePath = 'sqlite.db';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

// Create the orders table schema
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  street_address: text('street_address').notNull(),
  city: text('city').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  additional_info: text('additional_info'),
  total_checkout_amount: integer('total_checkout_amount').notNull(),
  created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Ensure the orders table is created
db.run(sql`CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  additional_info TEXT,
  total_checkout_amount INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);
