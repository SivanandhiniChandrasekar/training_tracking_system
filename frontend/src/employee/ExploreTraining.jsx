import "./styles.css";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";

export default function ExploreTraining() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const enrollments = await getEnrollments();

      // extract course_id list
      const courseIds = enrollments.map((e) => e.course_id);
      setEnrolledCourses(courseIds);
    } catch (err) {
      console.error("Failed to load enrollments", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <section className="explore">
      <div className="explore-header">
        <h1>Explore Training</h1>
        <p>Enhance your skills with our curated professional curriculum.</p>
      </div>

      <div className="course-grid">
        <CourseCard
          courseId={4}
          tag="Security"
          title="Cybersecurity Awareness Level 1"
          desc="Fundamental security practices for employees."
          enrolled={enrolledCourses.includes(4)}
        />

        <CourseCard
          courseId={5}
          tag="Safety"
          title="Workplace Safety Standards"
          desc="Safety and compliance training."
          enrolled={enrolledCourses.includes(5)}
        />

        <CourseCard
          courseId={6}
          tag="Compliance"
          title="Data Privacy & GDPR"
          desc="Compliance training for data handling."
          enrolled={enrolledCourses.includes(6)}
        />
      </div>
    </section>
  );
}
