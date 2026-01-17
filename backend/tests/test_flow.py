def test_enroll_course(test_client):
    response = test_client.post(
        "/enrollments/",
        json={"user_id": 1, "course_id": 1}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert data["course_id"] == 1
    assert data["status"] == "enrolled"


def test_complete_course(test_client):
    response = test_client.put(
        "/enrollments/complete",
        json={"enrollment_id": 1}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "completed"


def test_generate_certificate(test_client):
    response = test_client.post(
        "/certificates/generate",
        params={"user_id": 1, "course_id": 1}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 1
    assert data["course_id"] == 1
    assert "certificate_code" in data


def test_get_certificates(test_client):
    response = test_client.get("/certificates/")
    assert response.status_code == 200
    assert len(response.json()) >= 1
