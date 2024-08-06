import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed

export async function DELETE(req: Request) {
    try {
        const { cuid } = await req.json();

        if (!cuid) {
            return NextResponse.json({ error: 'CUID is required' }, { status: 400 });
        }

        // 실제로 대화를 삭제하는 쿼리
        const result = await query('DELETE FROM conv WHERE cuid = $1 RETURNING cuid', [cuid]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
