import { useNavigate } from "react-router-dom";
import "./Trainings.css";

const courses = [
  { id: "java", title: "Java", description: "Core Java, Spring Boot" },
  { id: "python", title: "Python", description: "Python basics & data" },
  { id: "web", title: "Web Development", description: "HTML, CSS, React" },
];

export default function Trainings() {
  const navigate = useNavigate();

  return (
    <div className="trainings-page">
      <h2>Available Trainings</h2>

      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button onClick={() => navigate(`/course/${course.id}`)}>
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
