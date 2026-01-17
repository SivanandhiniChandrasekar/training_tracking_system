import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { generateCertificate } from "../services/api";
import { useNotifications } from "../context/NotificationContext";
import "./styles.css";

export default function CoursePlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const title = state?.title || "Course";
  const courseId = state?.courseId;

  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addNotification } = useNotifications();

  const handleComplete = async () => {
  if (!courseId) {
    alert("Invalid course");
    return;
  }

  try {
    setLoading(true);
    await generateCertificate(courseId);

    setCompleted(true);
    addNotification(`🎓 Certificate generated for ${title}`);
    alert("Course completed! Certificate generated.");
  } catch (err) {
    // 👇 IMPORTANT FIX
    if (err.response?.status === 400 || err.response?.status === 409) {
      setCompleted(true);
      addNotification(`🎓 Certificate already generated for ${title}`);
      alert("Certificate already exists.");
    } else {
      console.error(err);
      alert("Certificate generation failed");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="course-player">
      <h1>{title}</h1>

      <div className="video-wrapper">
        <video controls width="100%">
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <button
        className="complete-btn"
        onClick={handleComplete}
        disabled={completed || loading}
      >
        {completed
          ? "Completed ✅"
          : loading
          ? "Processing..."
          : "Mark as Completed & Generate Certificate"}
      </button>
    </section>
  );
}
