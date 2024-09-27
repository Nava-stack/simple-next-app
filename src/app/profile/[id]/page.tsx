"use client";
import Link from "next/link";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-6">
        Person Profile
      </h1>

      <p className="text-3xl my-3">
        <span className="bg-orange-500 text-white px-6 py-3 rounded-lg">
          User ID: {params.id}
        </span>
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          href="/profile"
          className="bg-blue-500 text-white text-xl px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Back to Profile
        </Link>

        <Link
          href="/"
          className="bg-pink-500 text-white text-xl px-6 py-3 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
        >
          Back to Home
        </Link>

        <Link
          href="/login"
          className="bg-red-500 text-white text-xl px-6 py-3 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
