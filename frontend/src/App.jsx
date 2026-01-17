import { Routes, Route, Navigate } from "react-router-dom";

import EmployeeLayout from "./employee/EmployeeLayout";
import EmployeeDashboard from "./employee/EmployeeDashboard";
import ExploreTraining from "./employee/ExploreTraining";
import CoursePlayer from "./employee/CoursePlayer";
import MyCertificates from "./employee/MyCertificates";
import HelpCenter from "./employee/HelpCenter"; 
import Login from "./employee/Login";
import ProtectedRoute from "./employee/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected Employee Area */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
        <Route path="courses" element={<ExploreTraining />} />
        <Route path="course/:id" element={<CoursePlayer />} />
        <Route path="certificates" element={<MyCertificates />} />
        <Route path="help" element={<HelpCenter />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}
