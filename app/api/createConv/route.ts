// app/api/createConv/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed

export async function POST(req: Request) {
    try {
        const { uuid, category } = await req.json();

        if (!uuid) {
            return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
        }

        // Insert a new conversation into the conv table
        const addq = `INSERT INTO conv (chattitle, category) VALUES ($1, $2) RETURNING cuid`;
        const result = await query(addq, ["dummy", category]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
        }

        const newCuid = result.rows[0].cuid;

        // Update the cuid array in the users table
        const updateUserQ = `
            UPDATE users
            SET cuids = array_append(cuids, $1)
            WHERE uuid = $2
            RETURNING cuids
        `;
        const cuids = await query(updateUserQ, [newCuid, uuid]);

        const updateTitleQuery = `
            UPDATE conv
            SET chattitle = $1
            WHERE cuid = $2
        `;
        console.log(cuids);
        const len = cuids.rows[0].cuids.length
        const title = `대화 ${len} - ${category}`
        const res = await query(updateTitleQuery, [title, newCuid]);


        // Return the newly created cuid
        return NextResponse.json({ cuid: newCuid, title: title }, { status: 201 });
    } catch (error) {
        console.error('Error creating conversation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}