"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   const result = await signIn("credentials", {

    email,
    password,
    redirect: false,

});


    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
            Login
          </button>
        </form>
         <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
       Create a new account?{" "}
        <Link href="/register" className="text-blue-600 font-semibold hover:underline">
         Register
        </Link>
      </p>
    </div>
      </div>
      
    </div>
  );
}
