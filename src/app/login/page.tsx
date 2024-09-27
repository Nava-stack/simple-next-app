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

  const toastSuccessHandler = () => toast.success("Login success");
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">
        {loading ? "Processing..." : "Login"}
      </h1>
      <form
        onSubmit={handleLogin} // Corrected to handle onSubmit
        className="flex flex-col w-80 p-6 border rounded-md shadow-md text-center"
      >
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="mb-4 p-2 border text-black border-gray-300 rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          type="submit"
          className="p-2 bg-white text-black font-semibold rounded hover:bg-gray-600 hover:text-white"
          disabled={buttonDisabled} // Corrected to disable when necessary
        >
          {buttonDisabled ? "Not Ready" : "Login"}
        </button>
        <Link href="/register" className="mt-5">
          Are you a new user?
        </Link>
        <Toaster />
      </form>
    </div>
  );
}
