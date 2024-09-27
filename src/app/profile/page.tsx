/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  // Fetch user details on component mount
  useEffect(() => {
    getUserDetails();
  }); // Only runs once when the component mounts

  // Function to log out user
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout"); // Logout API call
      toast.success("Logout successful");
      router.push("/login"); // Redirect to login page
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to logout: " + error.message);
    }
  };

  // Function to get user details
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/person"); // Fetch user details from API
      if (res.data && res.data.data) {
        setData(res.data.data._id); // Store user ID
        console.log("User ID: ", res.data.data._id);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to load user details: " + error.message);
      router.push("/login"); // Redirect to login if not authenticated
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
        Profile Page
      </h1>

      <h2 className="my-5 text-2xl">
        {data === "" ? (
          "No User Found"
        ) : (
          <Link
            className="bg-pink-500 text-white text-2xl px-6 py-3 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
            href={`/profile/${data}`} // Link to user profile details
          >
            View Profile: {data}
          </Link>
        )}
      </h2>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={getUserDetails}
          className="bg-green-600 text-white text-xl px-6 py-3 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Reload User Details
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 text-white text-xl px-6 py-3 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      <Link
        href="/"
        className="mt-8 text-xl text-pink-400 hover:text-pink-500 transition-transform transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
}
