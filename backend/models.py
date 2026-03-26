from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from database import Base
import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class DBUser(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    full_name = Column(String)
    role = Column(String) # ADMIN, TEACHER, STUDENT
    avatar = Column(String, nullable=True)
    deleted_at = Column(DateTime, nullable=True)

class DBStudent(Base):
    __tablename__ = "students"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    status = Column(String)
    joined_date = Column(String)
    balance = Column(Float, default=0.0)
    coins = Column(Integer, default=0)
    deleted_at = Column(DateTime, nullable=True)

class DBTeacher(Base):
    __tablename__ = "teachers"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    subject = Column(String)
    status = Column(String)
    base_salary = Column(Float, default=0.0)
    hourly_rate = Column(Float, default=0.0)
    deleted_at = Column(DateTime, nullable=True)

class DBCourse(Base):
    __tablename__ = "courses"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    title = Column(String)
    description = Column(String)
    teacher_id = Column(String, ForeignKey("teachers.id"))
    status = Column(String)
    deleted_at = Column(DateTime, nullable=True)

class DBGroup(Base):
    __tablename__ = "groups"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    name = Column(String)
    course_id = Column(String, ForeignKey("courses.id"))
    schedule = Column(String)
    status = Column(String)
    deleted_at = Column(DateTime, nullable=True)

class DBAttendance(Base):
    __tablename__ = "attendance"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    student_id = Column(String, ForeignKey("students.id"))
    group_id = Column(String, ForeignKey("groups.id"))
    date = Column(String)
    status = Column(String) # PRESENT, ABSENT, LATE

class DBPayment(Base):
    __tablename__ = "payments"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    student_id = Column(String, ForeignKey("students.id"))
    amount = Column(Float)
    status = Column(String) # PENDING, SUCCESS, VOID
    date = Column(DateTime, default=datetime.datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

class DBSalary(Base):
    __tablename__ = "salaries"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    teacher_id = Column(String, ForeignKey("teachers.id"))
    month = Column(Integer)
    year = Column(Integer)
    amount = Column(Float)
    hourly_rate_snapshot = Column(Float)
    status = Column(String) # DRAFT, PAID

class DBReward(Base):
    __tablename__ = "rewards"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    name = Column(String)
    cost_coins = Column(Integer)
    stock = Column(Integer)

class DBChat(Base):
    __tablename__ = "chats"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    name = Column(String)

class DBChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    chat_id = Column(String, ForeignKey("chats.id"))
    sender_id = Column(String, ForeignKey("users.id"))
    text = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class DBSMS(Base):
    __tablename__ = "sms_history"
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    to_number = Column(String)
    text = Column(String)
    status = Column(String)
    sent_at = Column(DateTime, default=datetime.datetime.utcnow)
