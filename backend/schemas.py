from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

# --- Auth & Users ---
class LoginRequest(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    avatar: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class AuthResponse(BaseModel):
    user: User
    access_token: str
    refresh_token: str

class RefreshRequest(BaseModel):
    refresh_token: str

# --- Students ---
class StudentBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    status: str

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: str
    joined_date: str
    balance: float
    coins: int
    model_config = ConfigDict(from_attributes=True)

# --- Teachers ---
class TeacherBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    subject: str
    status: str
    base_salary: float = 0.0
    hourly_rate: float = 0.0

class TeacherCreate(TeacherBase):
    pass

class Teacher(TeacherBase):
    id: str
    model_config = ConfigDict(from_attributes=True)

# --- Courses ---
class CourseBase(BaseModel):
    title: str
    description: str
    teacher_id: str
    status: str

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: str
    model_config = ConfigDict(from_attributes=True)

# --- Groups ---
class GroupBase(BaseModel):
    name: str
    course_id: str
    schedule: str
    status: str

class GroupCreate(GroupBase):
    pass

class Group(GroupBase):
    id: str
    model_config = ConfigDict(from_attributes=True)

# --- Dashboard ---
class Stats(BaseModel):
    total_students: int
    total_teachers: int
    total_courses: int
    active_groups: int

# --- Attendance ---
class AttendanceRecord(BaseModel):
    student_id: str
    status: str

class AttendanceBatch(BaseModel):
    group_id: str
    date: str
    records: List[AttendanceRecord]

# --- Chat ---
class ChatMessage(BaseModel):
    id: str
    chat_id: str
    sender_id: str
    text: str
    timestamp: datetime
    model_config = ConfigDict(from_attributes=True)

class Chat(BaseModel):
    id: str
    name: str
    model_config = ConfigDict(from_attributes=True)
