"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const toastSuccessHandler = () =>
    toast.success("Reset mail sent successfully");
  const toastFailHandler = () => toast.error("Email not found");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);

      if (response.data.success) {
        toastSuccessHandler();
        router.push("/login");
      } else {
        toastFailHandler();
      }
    } catch (error) {
      console.log("Forgot password failed", error);
      toastFailHandler();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[length:100px_100px] bg-black bg-center bg-repeat text-white">
      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
        {loading ? "Processing..." : "Forgot Password"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col w-full max-w-md p-8 bg-black border border-gray-700 rounded-lg shadow-lg"
      >
        {/* Email Input */}
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="mb-4 p-4 text-lg border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        {/* Send Email Button */}
        <button
          type="submit"
          className={`p-4 text-lg font-semibold rounded-lg bg-pink-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 ${
            !user.email && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!user.email}
        >
          {loading ? "Sending..." : "Send Mail"}
        </button>
        <Toaster />
      </form>
    </div>
  );
}
