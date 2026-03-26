# Eduly Backend Documentation

This document explains how the backend of the Eduly platform is structured, how it currently works, and how you can easily swap the temporary in-memory database with a real MySQL database in the future.

## Architecture Overview

The platform is built as a **Full-Stack Application** using:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Communication**: REST API (`/api/v1/*`)
- **Authentication**: JWT (JSON Web Tokens)

### How the Server Works (`server.ts`)

The `server.ts` file is the entry point for the entire application. It does two main things:
1. **Serves the API**: It defines all the backend routes (`/api/v1/students`, `/api/v1/auth/login`, etc.) and handles the business logic.
2. **Serves the Frontend**: It uses Vite middleware to serve the React frontend during development, and serves the static compiled `dist/` folder in production.

This means you only need to run **one server** to host both the frontend and the backend.

## Current Database Implementation (In-Memory)

Currently, the application uses **In-Memory Arrays** to store data. This is perfect for prototyping and testing because it requires zero configuration.

```typescript
// Example of current in-memory storage in server.ts
let mockStudents = [
  { id: '1', name: 'Alisher Sadullayev', phone: '+998 90 123 45 67', ... },
  // ...
];
```

**Limitations of In-Memory Storage:**
- Data is lost every time the server restarts.
- Not suitable for production or multiple concurrent users.

## How to Migrate to MySQL

When you are ready to deploy this to production with a real database, you can easily swap the in-memory arrays with a MySQL database.

### Step 1: Install MySQL Driver

You will need to install a MySQL driver for Node.js. `mysql2` is highly recommended.

```bash
npm install mysql2
```

### Step 2: Set up the Database Connection

At the top of your `server.ts` file, configure the connection to your MySQL database using a connection string (URL).

```typescript
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/eduly_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

### Step 3: Replace Array Methods with SQL Queries

You will need to update the route handlers in `server.ts` to use SQL queries instead of array methods (`.push()`, `.filter()`, etc.).

#### Example: Fetching Students (GET)

**Current (In-Memory):**
```typescript
app.get('/api/v1/students', authenticateToken, (req, res) => {
  res.json(mockStudents);
});
```

**New (MySQL):**
```typescript
app.get('/api/v1/students', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ detail: 'Database error' });
  }
});
```

#### Example: Adding a Student (POST)

**Current (In-Memory):**
```typescript
app.post('/api/v1/students', authenticateToken, (req, res) => {
  const newStudent = { id: Math.random().toString(), ...req.body };
  mockStudents.push(newStudent);
  res.status(201).json(newStudent);
});
```

**New (MySQL):**
```typescript
app.post('/api/v1/students', authenticateToken, async (req, res) => {
  try {
    const { name, phone, group_name, status, debt, gender, birthDate, address } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO students (name, phone, group_name, status, debt, gender, birthDate, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, phone, group_name, status, debt, gender, birthDate, address]
    );
    
    // Fetch the newly created student to return it
    const [newStudent] = await pool.query('SELECT * FROM students WHERE id = ?', [(result as any).insertId]);
    res.status(201).json(newStudent[0]);
  } catch (error) {
    res.status(500).json({ detail: 'Database error' });
  }
});
```

### Step 4: Create Your SQL Tables

You will need to create the corresponding tables in your MySQL database. Here is an example schema for the students table:

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    group_name VARCHAR(100),
    status VARCHAR(50),
    debt INT DEFAULT 0,
    gender VARCHAR(20),
    birthDate DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Notes

1. **JWT Secret**: The `JWT_SECRET` in `server.ts` is currently hardcoded with a fallback. In production, **always** set the `JWT_SECRET` environment variable to a long, random string.
2. **SQL Injection**: Always use parameterized queries (the `?` syntax shown in the examples above) when interacting with MySQL. Never concatenate user input directly into SQL strings.
3. **Passwords**: The current mock authentication checks plain text passwords. When migrating to a real database, you must hash passwords using a library like `bcrypt` before storing them, and compare hashes during login.
