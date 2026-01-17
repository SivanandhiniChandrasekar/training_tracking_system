from app.database import engine
from app.models import Employee, Course, Enrollment, Certificate

print("Creating tables...")
Employee.metadata.create_all(bind=engine)
print("Done")
