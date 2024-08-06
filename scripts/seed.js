import pkg from "@vercel/postgres";
import { DEFAULT_CIPHERS } from "tls";
const { sql } = pkg

await sql`
        CREATE TABLE IF NOT EXISTS users(
            useruid INTEGER PRIMARY KEY AUTOINCREMENT,
            userId VARCHAR(50) NOT NULL UNIQUE,
            userName VARCHAR(20) NOT NULL,
            password VARCHAR(50) NOT NULL,
            registerDate DATETIME DEFAULT (datetime('now', 'localtime'))
        )`

// Table 생성
// users
CREATE TABLE IF NOT EXISTS users (
    uuid SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    userName VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    cuids INTEGER[] DEFAULT '{}'
);
// convs
CREATE TABLE IF NOT EXISTS conv (
    cuid SERIAL PRIMARY KEY,
    chattitle VARCHAR(60),
    category VARCHAR(50)
);
// chatlog
CREATE TABLE IF NOT EXISTS chatlog (
    cuid SERIAL NOT NULL,
    uid SERIAL NOT NULL,
    content VARCHAR(1024),
    side BOOLEAN,
    PRIMARY KEY (cuid, uid)
);

// Dummy 데이터 생성
INSERT INTO users(email, userName, password)
VALUES (dummy@next.js, dummy, 1234)