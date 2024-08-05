// app/api/conv/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed

export async function GET(req: Request) {
    const url = new URL(req.url);
    const cuid = url.searchParams.get('cuid');

    if (!cuid) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const q = `
    SELECT * FROM chatlog
    WHERE cuid = $1
    ORDER BY uid ASC
  `;

    try {
        const result = await query(q, [cuid]);
        // const contents = result.rows.map(row => row.content);
        // console.log(contents)
        return NextResponse.json({contents: result.rows}, {status: 200});
    } catch (error) {
        console.error('Error fetching chat logs:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}