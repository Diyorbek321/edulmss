from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from models import DBUser, DBStudent, DBTeacher, DBCourse, DBGroup, DBChat
from security import get_password_hash

# Import routers
from routers import auth, students, teachers, courses, groups, dashboard, chat, attendance, payments, salaries, gamification

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Eduly API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(students.router)
app.include_router(teachers.router)
app.include_router(courses.router)
app.include_router(groups.router)
app.include_router(chat.router)
app.include_router(attendance.router)
app.include_router(payments.router)
app.include_router(salaries.router)
app.include_router(gamification.router)

# --- Seed Initial Data ---
def seed_data():
    db = SessionLocal()
    if not db.query(DBUser).first():
        admin = DBUser(
            id="1", 
            email="admin@edusaas.com", 
            password_hash=get_password_hash("Admin1234!"), 
            full_name="System Admin", 
            role="ADMIN"
        )
        db.add(admin)
        
        # Add some mock students
        db.add(DBStudent(id="s1", first_name="John", last_name="Doe", email="john@example.com", phone="1234567890", status="ACTIVE", joined_date="2024-01-01"))
        db.add(DBStudent(id="s2", first_name="Jane", last_name="Smith", email="jane@example.com", phone="0987654321", status="ACTIVE", joined_date="2024-01-15"))
        
        # Add mock teachers
        db.add(DBTeacher(id="t1", first_name="Sarah", last_name="Wilson", email="sarah@example.com", subject="Mathematics", status="ACTIVE", base_salary=5000, hourly_rate=50))
        
        # Add mock courses
        db.add(DBCourse(id="c1", title="Advanced Mathematics", description="Calculus and Algebra", teacher_id="t1", status="ACTIVE"))
        
        # Add mock groups
        db.add(DBGroup(id="g1", name="Math-101-A", course_id="c1", schedule="Mon/Wed 10:00 AM", status="ACTIVE"))
        
        # Add mock chat
        db.add(DBChat(id="chat1", name="General Discussion"))

        db.commit()
    db.close()

seed_data()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
