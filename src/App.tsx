/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Teachers } from './pages/Teachers';
import { TeacherProfile } from './pages/TeacherProfile';
import { Groups } from './pages/Groups';
import { Attendance } from './pages/Attendance';
import { Payments } from './pages/Payments';
import { StudentProfile } from './pages/StudentProfile';
import { Salaries } from './pages/Salaries';
import { Courses } from './pages/Courses';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Schedule } from './pages/Schedule';
import { Gamification } from './pages/Gamification';
import { SupportTeachers } from './pages/SupportTeachers';
import { SMS } from './pages/SMS';
import { Chat } from './pages/Chat';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}><Students /></ProtectedRoute>} />
            <Route path="students/:id" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}><StudentProfile /></ProtectedRoute>} />
            <Route path="teachers" element={<ProtectedRoute allowedRoles={['ADMIN']}><Teachers /></ProtectedRoute>} />
            <Route path="teachers/:id" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}><TeacherProfile /></ProtectedRoute>} />
            <Route path="support-teachers" element={<ProtectedRoute allowedRoles={['ADMIN']}><SupportTeachers /></ProtectedRoute>} />
            <Route path="groups" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}><Groups /></ProtectedRoute>} />
            <Route path="courses" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}><Courses /></ProtectedRoute>} />
            <Route path="attendance" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}><Attendance /></ProtectedRoute>} />
            <Route path="payments" element={<ProtectedRoute allowedRoles={['ADMIN', 'STUDENT']}><Payments /></ProtectedRoute>} />
            <Route path="schedule" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}><Schedule /></ProtectedRoute>} />
            <Route path="salaries" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}><Salaries /></ProtectedRoute>} />
            <Route path="sms" element={<ProtectedRoute allowedRoles={['ADMIN']}><SMS /></ProtectedRoute>} />
            <Route path="chat" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}><Chat /></ProtectedRoute>} />
            <Route path="gamification" element={<ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'STUDENT']}><Gamification /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute allowedRoles={['ADMIN']}><Reports /></ProtectedRoute>} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

