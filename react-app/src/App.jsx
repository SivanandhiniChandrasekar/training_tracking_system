import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Trainings from "./pages/Trainings";
import CourseDetail from "./pages/CourseDetail";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trainings" element={<Trainings />} />
        <Route path="course/:courseId" element={<CourseDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
