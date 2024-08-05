// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed

export async function POST(req: Request) {
  const { cuid, content, side } = await req.json();
  
  if (typeof cuid !== 'number' || typeof content !== 'string' || typeof side !== 'boolean') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const q = `
    INSERT INTO chatlog (cuid, content, side)
    VALUES ($1, $2, $3)
  `;

  try {
    const result = await query(q, [cuid, content, side]);
    // const { content } = result.rows[0];
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error inserting chat log:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
