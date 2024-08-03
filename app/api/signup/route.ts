// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function POST(req: Request) {
    try {
        const { email, username, password } = await req.json();
        console.log(email);
        console.log(username);
        console.log(password);
        // Validate input
        if (typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string') {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        // Check if email already exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
        const existingUser = await query(checkUserQuery, [email]);
        if (existingUser.rowCount > 0) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Insert new user into database
        const insertUserQuery = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING email';
        const result = await query(insertUserQuery, [email, username, hashedPassword]);
        const userId = result.rows[0].email;

        return NextResponse.json({ message: 'User created successfully', userId }, { status: 201 });
    } catch (error) {
        console.error('Error during signup:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
