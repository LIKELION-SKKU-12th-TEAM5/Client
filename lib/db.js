import { Pool } from 'pg';

const connectionString = process.env.POSTGRES_URL;

const pool = new Pool({
    connectionString,
    // Use SSL in production environment
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false, // No SSL for local development
  });

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

