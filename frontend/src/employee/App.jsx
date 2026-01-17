import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./employee/Dashboard";
import Courses from "./employee/Courses";
import Certificates from "./employee/Certificates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employee/dashboard" />} />

        <Route path="/employee/dashboard" element={<Dashboard />} />
        <Route path="/employee/courses" element={<Courses />} />
        <Route path="/employee/certificates" element={<Certificates />} />
      </Routes>
    </Router>
  );
}

export default App;
