import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/certificates/1")
      .then((res) => setCertificates(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Dashboard</h2>

      <h3>My Certificates</h3>

      {certificates.length === 0 ? (
        <p>No certificates found</p>
      ) : (
        <ul>
          {certificates.map((cert) => (
            <li key={cert.id}>
              {cert.course_name} – {cert.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
