import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: API_BASE_URL,
});

/* =========================
   🔐 ATTACH TOKEN TO ALL REQUESTS
========================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   AUTH
========================= */
export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};

/* =========================
   COURSES
========================= */
export const getCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

/* =========================
   ENROLLMENTS
========================= */
export const enrollCourse = async (course_id) => {
  const res = await api.post("/enrollments/", { course_id });
  return res.data;
};

export const completeEnrollment = async (enrollment_id) => {
  const res = await api.put("/enrollments/complete", { enrollment_id });
  return res.data;
};

/* =========================
   CERTIFICATES
========================= */
export const generateCertificate = async (course_id) => {
  const res = await api.post("/certificates/generate", {
    course_id,
  });
  return res.data;
};

export const getCertificates = async () => {
  const res = await api.get("/certificates/me");
  return res.data;
};

export const downloadCertificate = async (certificateId) => {
  const response = await api.get(
    `/certificates/${certificateId}/download`,
    { responseType: "blob" }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = `certificate_${certificateId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
export default api;
