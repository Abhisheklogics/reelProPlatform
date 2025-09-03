"use client";


import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert(" Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[300px] flex items-center justify-center min-h-screen">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
     <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
    welcome to Kamwale User
    </h1>
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Create an Account
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>

    {errorMsg && (
      <p className="text-red-500 text-sm mt-3 text-center">{errorMsg}</p>
    )}

    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 font-semibold hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
</div>

  );
}

export default RegisterPage;
