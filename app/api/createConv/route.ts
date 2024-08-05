// app/api/createConv/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed

export async function POST(req: Request) {
    try {
        const { uuid } = await req.json();

        if (!uuid) {
            return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
        }

        // Insert a new conversation into the conv table
        const addq = `INSERT INTO conv (chattitle) VALUES ($1) RETURNING cuid`;
        const result = await query(addq, ["dummy"]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
        }

        const newCuid = result.rows[0].cuid;
        
        const updateTitleQuery = `
        UPDATE conv
        SET chattitle = $1
        WHERE cuid = $2
    `;
        const res = await query(updateTitleQuery, [`New Conversation ${newCuid}`, newCuid]);

        // Update the cuid array in the users table
        const updateUserQ = `
            UPDATE users
            SET cuid = array_append(cuid, $1)
            WHERE uuid = $2
        `;
        await query(updateUserQ, [newCuid, uuid]);
        // Return the newly created cuid
        return NextResponse.json({ cuid: newCuid }, { status: 201 });
    } catch (error) {
        console.error('Error creating conversation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}