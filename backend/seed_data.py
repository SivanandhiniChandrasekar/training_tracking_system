from app.database import SessionLocal
from models.employee import Employee
from models.course import Course

db = SessionLocal()

def seed_data():
    emp1 = Employee(name="John Employee", email="john@example.com")
    emp2 = Employee(name="Jane Employee", email="jane@example.com")

    course1 = Course(title="Cybersecurity Awareness Level 1")
    course2 = Course(title="Workplace Safety Standards")
    course3 = Course(title="Data Privacy & GDPR")

    db.add_all([emp1, emp2, course1, course2, course3])
    db.commit()

    print("✅ Sample data inserted successfully")

if __name__ == "__main__":
    seed_data()
