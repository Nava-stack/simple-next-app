"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toastSuccessHandler = () => toast.success("Register successful");
  const toastFailHandler = () => toast.error("Register failed");

  const handleRegister = async () => {
    try {
      console.log("Registering user", user);
      setLoading(true);
      const response = await axios.post("/api/users/register", user);
      console.log("Signup success", response.data);
      toastSuccessHandler();
      router.push("/login");
    } catch (error: any) {
      console.log("Register failed", error.message, error.response.data);
      toastFailHandler();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[length:100px_100px] bg-black bg-center bg-repeat text-white">
      {/* Form Container */}
      <form className="flex flex-col w-full max-w-md p-8 bg-black border border-gray-700 rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          {loading ? "Processing..." : "Register"}
        </h1>

        {/* Email Input */}
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="mb-4 p-4 text-lg border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        {/* Username Input */}
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="mb-4 p-4 text-lg border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
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

        {/* Register Button */}
        <button
          type="button"
          onClick={handleRegister}
          className={`p-4 text-lg font-semibold rounded-lg bg-pink-500 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Can't Sign Up" : "Sign up"}
        </button>

        {/* Links */}
        <Link
          href="/login"
          className="mt-5 text-pink-400 hover:text-pink-500 transition duration-300 text-center"
        >
          Already have an account?
        </Link>
        <Toaster />
      </form>
    </div>
  );
}
