// app/api/fetchUserInfo/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path as needed
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: Request) {
    try{
        const { token } = await req.json();

        // Example token verification logic
        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }
    
        // Verify the token (dummy verification for example purposes)
        const isValid = verifyToken(token);
        
        if (!isValid.valid) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }
    
        // Fetch user information based on the token
        const userData = await getUserInfo(isValid.decoded.userEmail);
    
        // Return user data if successful
        if (userData) {
            return NextResponse.json(userData, { status: 200 });
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


// Dummy token verification function
function verifyToken(token) {
    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        return { valid: true, decoded };
    } catch (error) {
        console.error('Token verification failed:', error);
        return { valid: false, error };
    }
}

// Real function to get user info
async function getUserInfo(email) {
    
    try {
        const result = await query('SELECT uuid, email, userName, cuid FROM users WHERE email = $1', [email]);
        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error('Error fetching user info');
    }
}