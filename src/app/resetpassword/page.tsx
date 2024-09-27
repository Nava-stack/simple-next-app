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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">
        {loading ? "Processing..." : "Reset Password"}
      </h1>
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col w-80 p-6 border rounded-md shadow-md text-center"
      >
        <input
          id="password"
          type="password"
          placeholder="Enter your new password"
          className="mb-4 p-2 border text-black border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-white text-black font-semibold rounded hover:bg-gray-600 hover:text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm reset"}
        </button>
        <Toaster />
      </form>
    </div>
  );
}
