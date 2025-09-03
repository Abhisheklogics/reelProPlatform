"use client";
import { useState } from "react";
import FileUpload from "./FileUpload"; // tumhare upar ka FileUpload component

export default function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quality, setQuality] = useState(100);
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (res) => {
    console.log("Video uploaded:", res);
    setVideoUrl(res.url); // ImageKit URL
    setMessage("✅ Video uploaded to ImageKit!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl) {
      setMessage("❌ Please upload a video first!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          controls: true,
          transformation: { quality },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save video");

      setMessage("✅ Video info saved successfully!");
      setTitle("");
      setDescription("");
      setQuality(100);
      setVideoUrl("");
      setProgress(0);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

      <FileUpload
        fileType="video"
        onProgress={(percent) => setProgress(percent)}
        onSuccess={handleUploadSuccess}
      />

      {progress > 0 && progress < 100 && (
        <p>Uploading: {progress}%</p>
      )}

      {videoUrl && (
        <video src={videoUrl} controls className="w-full mt-4 rounded" />
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Quality (1-100)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Video Info"}
        </button>
      </form>

      {message && (
        <p className={`mt-4 font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
