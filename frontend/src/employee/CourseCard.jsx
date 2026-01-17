import { useNavigate } from "react-router-dom";
import "./styles.css";
import { enrollCourse } from "../services/api";
import { useState, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";

export default function CourseCard({
  courseId,
  tag,
  title,
  desc,
  enrolled = false,
}) {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(enrolled);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  // sync with parent
  useEffect(() => {
    setIsEnrolled(enrolled);
  }, [enrolled]);

  const handleEnroll = async () => {
  try {
    setLoading(true);
    await enrollCourse(courseId);

    // SUCCESS PATH
    setIsEnrolled(true);
    addNotification(`You enrolled in ${title}`);

  } catch (err) {
    // 👇 THIS IS THE KEY FIX
    if (err.response?.data?.detail === "Already enrolled") {
      setIsEnrolled(true);
      addNotification(`You are already enrolled in ${title}`);
    } else {
      console.error(err);
      alert("Enrollment failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  const handleStart = () => {
    navigate(`/employee/course/${courseId}`, { state: { title,courseId, } ,});
  };

  return (
    <div className="course-card">
      <div className="course-thumb">
        <span className="pill">{tag}</span>
      </div>

      <div className="course-body">
        <div className="rating">
          ★★★★★ <span>(4.9)</span>
        </div>

        <h3>{title}</h3>
        <p>{desc}</p>

        <div className="course-meta">
          <span>⏱ 2 hours</span>
          <span>📘 12m validity</span>
        </div>

        <div className="course-actions">
          <button
            className="start-btn"
            onClick={handleEnroll}
            disabled={isEnrolled || loading}
          >
            {loading ? "Enrolling..." : isEnrolled ? "Enrolled" : "Enroll"}
          </button>

          <button
            className="start-btn"
            onClick={handleStart}
            disabled={!isEnrolled}
          >
            Start →
          </button>
        </div>
      </div>
    </div>
  );
}
