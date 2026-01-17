import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../employee/styles.css";
import NotificationBell from "../components/NotificationBell";
import { useAuth } from "../context/AuthContext";

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ FIX HERE

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="logo" />
          <div>
            <h2>CERITRACK</h2>
            <span>ENTERPRISE</span>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/employee" end className="nav-item">
            Dashboard
          </NavLink>

          <NavLink to="/employee/courses" className="nav-item">
            Course Catalog
          </NavLink>

          <NavLink to="/employee/certificates" className="nav-item">
            My Certifications
          </NavLink>
        </nav>

        <div className="support">SUPPORT</div>
        <NavLink to="/employee/help" className="nav-item muted">
  Help Center
</NavLink>


        {/* 👤 USER PROFILE */}
        <div className="profile">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <div className="name">{user?.name || "Employee"}</div>
            <div className="role">Employee</div>
          </div>
        </div>

        {/* 🚪 LOGOUT */}
        <button
          className="logout"
          onClick={() => {
            logout();            // ✅ NOW DEFINED
            navigate("/login");
          }}
        >
          Logout Session
        </button>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="topbar">
          <input placeholder="Search resources..." />
          <div className="icons">
            <NotificationBell />
            <div className="icon">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
