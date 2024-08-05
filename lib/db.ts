import { Pool } from 'pg';

const connectionString = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString,
  // Use SSL in production environment
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false, // No SSL for local development
});

// export async function query(text, params) {
//   const res = await pool.query(text, params);
//   return res;
// };


interface QueryResult {
  rowCount: number;
  rows: Array<{
    cuid: number,
    password: string,
    email: string
  }>;
}

export async function query(text: string, params: any[]): Promise<QueryResult> {
  const res = await pool.query(text, params);
  return res;
}