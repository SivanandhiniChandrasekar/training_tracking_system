import { useNavigate } from "react-router-dom";

export default function EmployeeLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Employee Login</h2>
      <button onClick={() => navigate("/employee/dashboard")}>
        Login
      </button>
    </div>
  );
}
