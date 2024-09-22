"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import React from "react";

export default function RegisterPage() {
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/register", user);
      if (response.status === 200) {
        alert("Register success");
      }
    } catch (error) {
      alert("Register failed");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>
      <form className="flex flex-col w-80 p-6 border rounded-md shadow-md text-center">
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          className="mb-4 p-2 border border-gray-300 rounded"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 p-2 border border-gray-300 rounded"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          className="p-2 bg-white text-black font-semibold rounded hover:bg-gray-600 hover:text-white"
          onClick={handleRegister}
        >
          Signup
        </button>
        <Link href="/login" className="mt-5">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
