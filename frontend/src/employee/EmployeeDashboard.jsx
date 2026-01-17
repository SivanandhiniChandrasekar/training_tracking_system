import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { getCourses, getCertificates } from "../services/api";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const [coursesCount, setCoursesCount] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [courses, certs] = await Promise.all([
        getCourses(),
        getCertificates(),
      ]);

      setCoursesCount(courses?.length || 0);
      setCertificates(certs || []);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔢 Stats
  const today = new Date();

  const activeCerts = certificates.filter(
    (c) => !c.expiry_date || new Date(c.expiry_date) >= today
  ).length;

  const expiredCerts = certificates.filter(
    (c) => c.expiry_date && new Date(c.expiry_date) < today
  ).length;

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading dashboard...</p>;
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <span className="welcome">Welcome back</span>

        <h1>
          Advance Your <span>Career</span>
          <br />
          Skills
        </h1>

        <p>
          You have {activeCerts} active certifications. Keep your compliance
          score at 100% by completing your assigned training modules.
        </p>

        <div className="hero-actions">
          <button
            className="primary"
            onClick={() => navigate("/employee/courses")}
          >
            Explore Courses
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/employee/certificates")}
          >
            My Certificates
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <Stat
          title="Active Certs"
          value={activeCerts}
          note="Valid & compliant"
        />
        <Stat
          title="Expired"
          value={expiredCerts}
          danger
          note="Needs renewal"
        />
        <Stat
          title="Courses Available"
          value={coursesCount}
          note="Start learning"
        />
      </section>

      {/* CONTENT */}
      <section className="content">
        {/* CERTIFICATES */}
        <div className="certs">
          <div className="certs-header">
            <h3>Recent Certificates</h3>
            <span
              className="link"
              onClick={() => navigate("/employee/certificates")}
            >
              View Gallery →
            </span>
          </div>

          {certificates.length === 0 && <p>No certificates yet</p>}

          {certificates.slice(0, 3).map((cert) => (
            <CertCard
              key={cert.id}
              status={
                cert.expiry_date && new Date(cert.expiry_date) < today
                  ? "Expired"
                  : "Active"
              }
              title={`Course ID ${cert.course_id}`}
              expiry={cert.expiry_date || "No expiry"}
              code={cert.certificate_code}
            />
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="right">
          <div className="learning">
            <h3>Continue Learning</h3>
            <Progress title="Course progress" value={50} />
          </div>

          <div className="top-rated">
            <h3>Available Courses</h3>
            <Course title="Explore new trainings" />
          </div>
        </div>
      </section>
    </>
  );
}

/* COMPONENTS */

function Stat({ title, value, note, danger }) {
  return (
    <div className="stat">
      <h4>{title}</h4>
      <div className="value">{value}</div>
      <div className={danger ? "note danger" : "note"}>{note}</div>
    </div>
  );
}

function CertCard({ title, expiry, code, status }) {
  return (
    <div className="cert-card">
      <span className={`badge ${status.toLowerCase()}`}>{status}</span>
      <h4>{title}</h4>
      <p>Expires: {expiry}</p>
      <span className="code">{code}</span>
    </div>
  );
}

function Progress({ title, value }) {
  return (
    <div className="progress-card">
      <div className="progress-title">{title}</div>
      <div className="bar">
        <div className="fill" style={{ width: `${value}%` }} />
      </div>
      <span>{value}%</span>
    </div>
  );
}

function Course({ title }) {
  return (
    <div className="course">
      <span className="star">★</span>
      <div>
        <strong>{title}</strong>
        <span>Backend connected</span>
      </div>
    </div>
  );
}
