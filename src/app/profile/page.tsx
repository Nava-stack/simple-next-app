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
    setData(res.data.data._id);
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-3">Profile Page</h1>
      <h2 className="my-5">
        {data === "" ? (
          "Nothing"
        ) : (
          <Link
            className="bg-pink-500 text-white  text-2xl px-4 py-2 rounded-md my-3 hover:bg-pink-400 hover:font-semibold"
            href={`/profile/${data}`}
          >
            {data}
          </Link>
        )}
      </h2>
      <button
        onClick={getUserDetails}
        className="bg-green-600 text-white text-2xl px-4 py-2 rounded-md my-4"
      >
        Get User
      </button>
      <button
        onClick={handleLogout}
        className="bg-white text-black text-2xl px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
