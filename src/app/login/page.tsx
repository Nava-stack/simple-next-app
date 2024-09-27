/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toastSuccessHandler = () => toast.success("Login successful");
  const toastFailHandler = () => toast.error("Login failed");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.data.success) {
        toastSuccessHandler();
        console.log("Redirecting to profile page...");
        router.push("/profile"); // Navigate to profile after login
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

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[length:100px_100px] bg-black bg-center bg-repeat text-white">
      {/* Title */}
      <h1 className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
        {loading ? "Processing..." : "Login"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-full max-w-md p-8 border border-gray-700 bg-black rounded-lg shadow-lg "
      >
        {/* Email Input */}
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="mb-4 p-4 text-lg border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        {/* Password Input */}
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="mb-6 p-4 text-lg border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        {/* Login Button */}
        <button
          type="submit"
          className={`p-4 text-lg font-semibold rounded-lg bg-pink-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 ${
            buttonDisabled && "opacity-50 cursor-not-allowed"
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Not Ready" : "Login"}
        </button>

        {/* Links */}
        <div className="flex justify-between mt-5 text-sm">
          <Link
            href="/register"
            className="text-pink-400 hover:text-pink-500 transition duration-300"
          >
            Are you a new user?
          </Link>
          <Link
            href="/forgotpassword"
            className="text-pink-400 hover:text-pink-500 transition duration-300"
          >
            Forgot password?
          </Link>
        </div>
        <Toaster />
      </form>
    </div>
  );
}
