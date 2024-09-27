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
  const [buttonDisabled] = useState(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">
        {loading ? "Processing..." : "Forgot Password"}
      </h1>
      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col w-80 p-6 border rounded-md shadow-md text-center"
      >
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="mb-4 p-2 border text-black border-gray-300 rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button
          type="submit"
          className="p-2 bg-white text-black font-semibold rounded hover:bg-gray-600 hover:text-white"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Not Ready" : "Send Mail"}
        </button>
        <Toaster />
      </form>
    </div>
  );
}
