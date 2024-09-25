"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile Page</h1>
      <p className="text-4xl">Profile Page</p>
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
