from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)

def test_enroll():
    response = client.post("/enroll?employee_id=1&course_id=1")
    assert response.status_code == 200
