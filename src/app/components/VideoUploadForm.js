"use client";
import { useState } from "react";
import { Upload, FileVideo, Image as ImageIcon } from "lucide-react";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          videoUrl,
          thumbnailUrl,
          transformation: { quality: formData.quality },
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
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="bg-base-100 shadow-lg rounded-2xl p-6 md:p-8 border border-base-300">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Upload className="w-6 h-6 text-blue-600" /> Upload Video
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter video title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Write a short description..."
            />
          </div>

          {/* Video File */}
          <div>
            <label className="block font-semibold mb-1">Video File</label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-base-200 transition">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="videoFile"
                onChange={(e) => setVideoFile(e.target.files[0])}
                required
              />
              <label htmlFor="videoFile" className="cursor-pointer flex flex-col items-center gap-2">
                <FileVideo className="w-8 h-8 text-blue-600" />
                <span className="text-sm text-gray-600">
                  {videoFile ? videoFile.name : "Click to upload or drag & drop"}
                </span>
              </label>
            </div>
            {videoFile && (
              <video
                src={URL.createObjectURL(videoFile)}
                controls
                className="mt-3 rounded-lg max-h-48 w-full object-cover"
              />
            )}
          </div>

         

          {/* Controls */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="controls"
              checked={formData.controls}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label>Show Controls</label>
          </div>

          {/* Quality */}
          <div>
            <label className="block font-semibold mb-1">Quality (1 - 100)</label>
            <input
              type="number"
              name="quality"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
