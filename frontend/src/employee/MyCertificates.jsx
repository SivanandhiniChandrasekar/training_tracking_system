import { useEffect, useState } from "react";
import { getCertificates, downloadCertificate } from "../services/api";
import "./styles.css";

export default function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error("Failed to load certificates", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading certificates...</p>;

  if (certificates.length === 0) {
    return <p>No certificates earned yet.</p>;
  }

  return (
    <section className="certs">
      <h2>My Certificates</h2>

      {certificates.map((cert) => (
        <div className="cert-card" key={cert.id}>
          <span className="badge active">Active</span>

          <h3>{cert.course_title}</h3>

          <p>Issued on: {new Date(cert.issued_at).toDateString()}</p>

          <div className="cert-actions">
            {/* ONE BUTTON IS ENOUGH */}
            <button
              className="complete-btn"
              onClick={() => downloadCertificate(cert.id)}
            >
              View / Download
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
