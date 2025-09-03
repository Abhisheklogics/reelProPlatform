"use client";
import { useState } from "react";

export default function VideoUploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    controls: true,
    quality: 100,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
     
      const videoUrl = "/uploads/" + videoFile?.name;
      const thumbnailUrl = "/uploads/" + thumbnailFile?.name;

     
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          videoUrl,
          thumbnailUrl,
          transformation: {
            quality: formData.quality,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMessage("✅ Video uploaded successfully!");
    } catch (error) {
      setMessage("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded-lg p-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full border rounded-lg p-2"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Video File */}
        <div>
          <label className="block font-semibold">Video File</label>
          <input
            type="file"
            accept="video/"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
        </div>

       

        {/* Controls */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="controls"
            checked={formData.controls}
            onChange={handleChange}
          />
          <label>Show Controls</label>
        </div>

        {/* Quality */}
        <div>
          <label className="block font-semibold">
            Quality (1 - 100)
          </label>
          <input
            type="number"
            name="quality"
            className="w-full border rounded-lg p-2"
            min="1"
            max="100"
            value={formData.quality}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Message */}
        {message && (
          <p className="mt-3 text-center font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
