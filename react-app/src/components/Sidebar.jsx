import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/trainings">Trainings</Link>
        <Link to="/certificates">Certificates</Link>
      </nav>
    </div>
  );
}
