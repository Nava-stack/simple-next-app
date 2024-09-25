"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/person");
    setData(res.data);
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile Page</h1>
      <p className="text-4xl">Profile Page</p>
      <h2>{data === "" ? "Nothing" : `${data}`}</h2>
      <button
        onClick={getUserDetails}
        className="bg-purple-800 text-white font-semibold text-2xl px-4 py-2 rounded-md"
      >
        Get User
      </button>
      <hr />
      <button
        onClick={handleLogout}
        className="bg-white text-black text-2xl px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
