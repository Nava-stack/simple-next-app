"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      if (response.data.success) {
        toast.success("Password reset successfully");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[length:100px_100px] bg-black bg-center bg-repeat text-white">
      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
        {loading ? "Processing..." : "Reset Password"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col w-full max-w-md p-8 bg-black border border-gray-700 rounded-lg shadow-lg"
      >
        {/* Password Input */}
        <input
          id="password"
          type="password"
          placeholder="Enter your new password"
          className="mb-4 p-4 text-lg border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Reset Button */}
        <button
          type="submit"
          className={`p-4 text-lg font-semibold rounded-lg bg-pink-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Reset"}
        </button>
        <Toaster />
      </form>
    </div>
  );
}
