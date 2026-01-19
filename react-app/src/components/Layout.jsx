import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "220px", width: "100%", padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
