"use client"; // This component must be a client component

import {

  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";


const FileUpload = ({ onSuccess, onProgress, fileType }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  //optional validation

  const validateFile = (file) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }
    return true;
  };

  const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  setError(null);

  try {
    // 1️⃣ Get auth parameters from backend
    const authRes = await fetch("/api/auth/upload-file");
    const auth = await authRes.json();

    if (!auth.token || !auth.signature || !auth.expire) {
      throw new Error("Auth parameters missing from server");
    }

    // 2️⃣ Upload to ImageKit
    const res = await upload({
      file,
      fileName: file.name,
      publicKey: auth.publicKey,
      token: auth.token,
      signature: auth.signature,
      expire: auth.expire,
      onProgress: (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = (event.loaded / event.total) * 100;
          onProgress(Math.round(percent));
        }
      },
    });

    onSuccess(res);
  } catch (err) {
    console.error("Upload failed", err);
    setError(err.message);
  } finally {
    setUploading(false);
  }
};

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Loading....</span>}
    </>
  );
};

export default FileUpload;