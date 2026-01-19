import { useNavigate } from "react-router-dom";
import "./Landing.css";
import heroImage from "../assets/one.png"; // add image

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">CoursePilot</div>

        <div className="nav-links">
          <span>Pricing</span>
          <span>Blog</span>
          <span onClick={() => navigate("/admin/login")} className="nav-login">
            Login
          </span>
          <button
            className="nav-btn"
            onClick={() => navigate("/admin/login")}
          >
            Set Your First Course Up Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            CoursePilot
            <br />
            <span>
              Powering structured learning and certification management.
            </span>
          </h1>

          <p>
            To scale their business, reduce dropout rate, and create
            high-quality, consistent client experiences.
          </p>

          <div className="btn-group">
            <button
              className="primary-btn"
              onClick={() => navigate("/admin/login")}
            >
              Admin Login
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/employee/login")}
            >
              Employee Login
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Learning platform" />
        </div>
      </section>
    </>
  );
}
