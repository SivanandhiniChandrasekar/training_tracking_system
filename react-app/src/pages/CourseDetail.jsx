import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CourseDetail.css";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

useEffect(() => {
  const loadVideos = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/courses/${courseId}/videos`
    );
    const data = await res.json();
    setVideos(data);
  };
  loadVideos();
}, [courseId]);


  const loadVideos = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/courses/${courseId}/videos`
      );
      if (!res.ok) throw new Error("Failed to load videos");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load videos");
    }
  };

  const addVideo = async () => {
    if (!title || !url) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/courses/${courseId}/videos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, url }),
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      setTitle("");
      setUrl("");
      loadVideos(); // reload after upload
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="course-detail">
      <h2>{courseId.toUpperCase()} Course</h2>

      <div className="upload-box">
        <input
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addVideo}>Add Video</button>
      </div>

      <div className="video-list">
        {videos.length === 0 && <p>No videos uploaded yet</p>}

        {videos.map((v) => (
          <div key={v.id}>
            <h4>{v.title}</h4>
            <iframe
              width="100%"
              height="220"
              src={`https://www.youtube.com/embed/${v.url.split("v=").pop()}`}
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
}
