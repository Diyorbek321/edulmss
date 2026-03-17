/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
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
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teachers/:id" element={<TeacherProfile />} />
          <Route path="support-teachers" element={<SupportTeachers />} />
          <Route path="groups" element={<Groups />} />
          <Route path="courses" element={<Courses />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payments" element={<Payments />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="salaries" element={<Salaries />} />
          <Route path="sms" element={<SMS />} />
          <Route path="chat" element={<Chat />} />
          <Route path="gamification" element={<Gamification />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
