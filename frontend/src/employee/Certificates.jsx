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
      // 1️⃣ Fetch user's certificates
      const res = await axios.get(
        `${API_BASE_URL}/certificates/user/${userId}`
      );
      const certsWithValidity = await Promise.all(
        res.data.map(async (cert) => {
          // 2️⃣ Check validity for each certificate
          try {
            const validityRes = await axios.get(
              `${API_BASE_URL}/certificates/validity/${cert.id}`
            );
            return { ...cert, ...validityRes.data };
          } catch (err) {
            console.error("Failed to fetch validity for cert", cert.id, err);
            return { ...cert, is_valid: true }; // fallback
          }
        })
      );

      setCertificates(certsWithValidity);
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
          <div key={cert.id} className="certificate-card" style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
            <p><b>Course ID:</b> {cert.course_id}</p>
            <p><b>Certificate Code:</b> {cert.certificate_code}</p>
            <p>
              <b>Expiry Date:</b> {cert.expiry_date ? new Date(cert.expiry_date).toLocaleDateString() : "N/A"}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span style={{color: cert.is_valid ? "green" : "red"}}>
                {cert.is_valid ? "Valid" : "Expired"}
              </span>
            </p>

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
