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

  const toastSuccessHandler = () => toast.success("Register success");
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
      console.log("Register complete");
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col w-80 p-6 border rounded-md shadow-md text-center">
        <h1 className="mb-6 text-2xl font-bold">
          {loading ? "Processing" : "Register"}
        </h1>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="mb-4 p-2 border text-black border-gray-300 rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="mb-4 p-2 border text-black border-gray-300 rounded"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="mb-6 p-2 border text-black border-gray-300 rounded"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="button"
          className="p-2 bg-white text-black font-semibold rounded hover:bg-gray-600 hover:text-white"
          onClick={handleRegister}
        >
          {buttonDisabled ? "Can't" : "Sign up"}
        </button>
        <Link href="/login" className="mt-5">
          Already have an account?
        </Link>
        <Toaster />
      </form>
    </div>
  );
}
