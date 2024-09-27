"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toastSuccessHandler = () =>
    toast.success("Reset mail send successfully");
  const toastFailHandler = () => toast.error("Email not found");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);

      if (response.data.success) {
        toastSuccessHandler();
        setVerified(true);
      } else {
        toastFailHandler();
      }
    } catch (error) {
      console.log("Login failed", error);
      toastFailHandler();
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        token: token,
        password: user.password,
      });
      if (response.data.success) {
        toast.success("Password reset successfully");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    if (token) {
      setToken(token || "");
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      handleResetPassword();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">
        {loading ? "Processing..." : "Reset Password"}
      </h1>
      {verified ? (
        <form
          onSubmit={handleResetPassword} // Corrected to handle onSubmit
          className="flex flex-col w-80 p-6 border rounded-md shadow-md text-center"
        >
          <input
            id="password"
            type="password"
            placeholder="Email"
            className="mb-4 p-2 border text-black border-gray-300 rounded"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="submit"
            className="p-2 bg-white text-black font-semibold rounded hover:bg-gray-600 hover:text-white"
            disabled={buttonDisabled} // Corrected to disable when necessary
          >
            {buttonDisabled ? "Not Ready" : "Confirm reset"}
          </button>
          <Toaster />
        </form>
      ) : (
        <form
          onSubmit={handleForgotPassword} // Corrected to handle onSubmit
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
            disabled={buttonDisabled} // Corrected to disable when necessary
          >
            {buttonDisabled ? "Not Ready" : "Send Mail"}
          </button>
          <Toaster />
        </form>
      )}
    </div>
  );
}
