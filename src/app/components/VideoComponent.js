"use client";

import { useEffect, useState } from "react";

export default function VideoReel() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error("Failed to fetch videos");

        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading videos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!videos || videos.length === 0)
    return <p className="text-center mt-10">No videos found.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Video Reels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <video
              src={video.videoUrl}
              controls={video.controls}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate">{video.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
