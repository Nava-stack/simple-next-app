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
  });

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-3">Profile Page</h1>
      <h2 className="my-5">
        {data === "" ? (
          "No User Found"
        ) : (
          <Link
            className="bg-pink-500 text-white  text-2xl px-4 py-2 rounded-md my-3 hover:bg-pink-400 hover:font-semibold"
            href={`/profile/${data}`} // Link to user profile details
          >
            {data}
          </Link>
        )}
      </h2>
      <button
        type="button"
        onClick={getUserDetails}
        className="bg-green-600 text-white text-2xl px-4 py-2 rounded-md my-4"
      >
        Reload User Details
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-white text-black text-2xl px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
