import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // later from JWT

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/certificates/user/${userId}`
      );
      setCertificates(res.data);
    } catch (err) {
      console.error("Failed to fetch certificates", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading certificates...</p>;

  return (
    <div className="certificates-page">
      <h1>My Certificates</h1>

      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        certificates.map((cert) => (
          <div key={cert.id} className="certificate-card">
            <p><b>Course ID:</b> {cert.course_id}</p>
            <p><b>Certificate Code:</b> {cert.certificate_code}</p>

            <a
              href={`${API_BASE_URL}/certificates/${cert.id}/download`}
              target="_blank"
              rel="noreferrer"
            >
              Download PDF
            </a>
          </div>
        ))
      )}
    </div>
  );
}
