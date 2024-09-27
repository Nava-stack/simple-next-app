"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log(response.data);
      setVerified(true);
    } catch (error: any) {
      console.log(error.response.data);
      setError(true);
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
      handleVerifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[length:100px_100px] bg-black bg-center bg-repeat text-white">
      {verified ? (
        <div className="flex flex-col items-center justify-center bg-gray-200  p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-green-600">
            Email Verified
          </h1>
          <p className="text-lg mb-4 text-black">
            You can now login with your email and password
          </p>
          <Link
            href="/login"
            className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-200 p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-red-600">
            Email Verification
          </h1>
          <p className="text-lg mb-4 text-black">
            Your email is not verified. Please verify your email
          </p>
          <Link
            href="/login"
            className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
