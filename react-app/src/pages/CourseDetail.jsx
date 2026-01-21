import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CourseDetail.css";

const getYouTubeId = (url) => {
  if (!url) return "";

  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1].split("?")[0];
  }

  if (url.includes("watch?v=")) {
    return url.split("watch?v=")[1].split("&")[0];
  }

  if (url.includes("/embed/")) {
    return url.split("/embed/")[1].split("?")[0];
  }

  return url;
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // Load videos
  useEffect(() => {
    loadVideos();
  }, [courseId]);

  const loadVideos = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/courses/${courseId}/videos`
      );
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add video
  const addVideo = async () => {
    if (!title || !url) {
      alert("Fill all fields");
      return;
    }

    const videoId = getYouTubeId(url);

    try {
      await fetch(
        `http://127.0.0.1:8000/courses/${courseId}/videos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            url: videoId,   // ✅ ONLY ID stored
          }),
        }
      );

      setTitle("");
      setUrl("");
      loadVideos();
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
          placeholder="YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addVideo}>Add Video</button>
      </div>

      <div className="video-list">
        {videos.length === 0 && <p>No videos uploaded yet</p>}

        {videos.map((v) => (
          <div key={v.id} className="video-card">
            <h4>{v.title}</h4>
            <iframe
              width="100%"
              height="220"
              src={`https://www.youtube.com/embed/${v.url}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
