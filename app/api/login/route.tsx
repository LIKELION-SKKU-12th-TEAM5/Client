// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: Request) {
    const { email, password } = await req.json();
    
    // if (typeof email !== 'string' || typeof password !== 'string') {
    //     return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    // }

    // Fetch user from the database
    const q = 'SELECT * FROM users WHERE email = $1';
    try {
        const result = await query(q, [email]);
        const user = result.rows[0];
        
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({ userEmail: user.email }, SECRET_KEY, { expiresIn: '1h' });

            // Set token in cookie
            const headers = new Headers();
            headers.append('Set-Cookie', `authToken=${token}; Path=/`); // http only

            return NextResponse.json({ message: 'Login successful' }, { status: 200, headers });
        } else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}