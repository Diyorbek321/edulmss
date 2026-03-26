import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-eduly';

app.use(cors());
app.use(express.json());

// --- IN-MEMORY DATABASE ---
// This acts as our temporary database. In a production environment, 
// you would replace these arrays with queries to a real database like MySQL.
let mockStudents = [
  { id: '1', name: 'Alisher Sadullayev', phone: '+998 90 123 45 67', group: 'General English', status: 'Faol', debt: 0, gender: 'Erkak', birthDate: '2005-05-15', address: 'Toshkent' },
  { id: '2', name: 'Malika Karimova', phone: '+998 93 987 65 43', group: 'IELTS Intensive', status: 'Qarzdor', debt: 150000, gender: 'Ayol', birthDate: '2004-08-22', address: 'Samarqand' },
  { id: '3', name: 'Javohir Orifov', phone: '+998 99 111 22 33', group: 'Frontend React', status: 'Faol', debt: 0, gender: 'Erkak', birthDate: '2003-11-10', address: 'Buxoro' },
  { id: '4', name: 'Shaxnoza Hasanova', phone: '+998 97 444 55 66', group: 'Mathematics SAT', status: 'Muzlatilgan', debt: 0, gender: 'Ayol', birthDate: '2006-02-28', address: 'Xiva' }
];

let mockGroups = [
  { id: '1', name: 'General English N1', course: 'General English', teacher: 'Alisher Navoiy', schedule: 'Toq kunlar', time: '14:00', capacity: 18, studentsCount: 15, status: 'Faol' },
  { id: '2', name: 'IELTS Intensive 8.0', course: 'IELTS Intensive', teacher: 'Malika Ahmedova', schedule: 'Juft kunlar', time: '16:00', capacity: 15, studentsCount: 15, status: 'Yopilgan' },
  { id: '3', name: 'Frontend React', course: 'Frontend React', teacher: 'Bobur Mirzo', schedule: 'Toq kunlar', time: '18:00', capacity: 20, studentsCount: 12, status: 'Qabul ochiq' }
];

let mockTeachers = [
  { id: '1', name: 'Alisher Navoiy', subject: 'General English', phone: '+998 90 111 11 11', groupsCount: 4, studentsCount: 65, status: 'Faol' },
  { id: '2', name: 'Malika Ahmedova', subject: 'IELTS', phone: '+998 93 222 22 22', groupsCount: 3, studentsCount: 45, status: 'Faol' },
  { id: '3', name: 'Bobur Mirzo', subject: 'Dasturlash', phone: '+998 99 333 33 33', groupsCount: 2, studentsCount: 30, status: 'Faol' }
];

let mockCourses = [
  { id: '1', name: 'General English', duration: '6 oy', price: '400,000', groupsCount: 8, status: 'Faol' },
  { id: '2', name: 'IELTS Intensive', duration: '3 oy', price: '600,000', groupsCount: 5, status: 'Faol' },
  { id: '3', name: 'Frontend React', duration: '8 oy', price: '800,000', groupsCount: 3, status: 'Faol' }
];

// --- MIDDLEWARE ---
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API ROUTES ---

// Auth
app.post('/api/v1/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Simple mock authentication
  if (username === 'admin@edusaas.com' && password === 'Admin1234!') {
    const user = { id: '1', name: 'Admin User', email: username, role: 'ADMIN' };
    const access_token = jwt.sign(user, JWT_SECRET, { expiresIn: '15m' });
    const refresh_token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.json({ access_token, refresh_token });
  } else {
    res.status(401).json({ detail: 'Invalid credentials' });
  }
});

app.post('/api/v1/auth/refresh', (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.sendStatus(401);
  
  jwt.verify(refresh_token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    const userData = { id: user.id, name: user.name, email: user.email, role: user.role };
    const access_token = jwt.sign(userData, JWT_SECRET, { expiresIn: '15m' });
    res.json({ access_token, refresh_token });
  });
});

app.get('/api/v1/auth/me', authenticateToken, (req: any, res) => {
  res.json(req.user);
});

// Students
app.get('/api/v1/students', authenticateToken, (req, res) => {
  res.json(mockStudents);
});

app.post('/api/v1/students', authenticateToken, (req, res) => {
  const newStudent = { id: Math.random().toString(36).substr(2, 9), ...req.body };
  mockStudents.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/v1/students/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = mockStudents.findIndex(s => s.id === id);
  if (index !== -1) {
    mockStudents[index] = { ...mockStudents[index], ...req.body };
    res.json(mockStudents[index]);
  } else {
    res.status(404).json({ detail: 'Student not found' });
  }
});

app.delete('/api/v1/students/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  mockStudents = mockStudents.filter(s => s.id !== id);
  res.json({ success: true });
});

// Groups
app.get('/api/v1/groups', authenticateToken, (req, res) => {
  res.json(mockGroups);
});

app.post('/api/v1/groups', authenticateToken, (req, res) => {
  const newGroup = { id: Math.random().toString(36).substr(2, 9), ...req.body };
  mockGroups.push(newGroup);
  res.status(201).json(newGroup);
});

app.put('/api/v1/groups/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = mockGroups.findIndex(g => g.id === id);
  if (index !== -1) {
    mockGroups[index] = { ...mockGroups[index], ...req.body };
    res.json(mockGroups[index]);
  } else {
    res.status(404).json({ detail: 'Group not found' });
  }
});

app.delete('/api/v1/groups/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  mockGroups = mockGroups.filter(g => g.id !== id);
  res.json({ success: true });
});

// Teachers
app.get('/api/v1/teachers', authenticateToken, (req, res) => {
  res.json(mockTeachers);
});

app.post('/api/v1/teachers', authenticateToken, (req, res) => {
  const newTeacher = { id: Math.random().toString(36).substr(2, 9), ...req.body };
  mockTeachers.push(newTeacher);
  res.status(201).json(newTeacher);
});

app.put('/api/v1/teachers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = mockTeachers.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTeachers[index] = { ...mockTeachers[index], ...req.body };
    res.json(mockTeachers[index]);
  } else {
    res.status(404).json({ detail: 'Teacher not found' });
  }
});

app.delete('/api/v1/teachers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  mockTeachers = mockTeachers.filter(t => t.id !== id);
  res.json({ success: true });
});

// Courses
app.get('/api/v1/courses', authenticateToken, (req, res) => {
  res.json(mockCourses);
});

app.post('/api/v1/courses', authenticateToken, (req, res) => {
  const newCourse = { id: Math.random().toString(36).substr(2, 9), ...req.body };
  mockCourses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put('/api/v1/courses/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = mockCourses.findIndex(c => c.id === id);
  if (index !== -1) {
    mockCourses[index] = { ...mockCourses[index], ...req.body };
    res.json(mockCourses[index]);
  } else {
    res.status(404).json({ detail: 'Course not found' });
  }
});

app.delete('/api/v1/courses/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  mockCourses = mockCourses.filter(c => c.id !== id);
  res.json({ success: true });
});

// --- VITE MIDDLEWARE & STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Fallback for SPA routing
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
