"use client";

import React from "react";

const login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>
      <form className="flex flex-col w-80 p-6 border rounded-lg shadow-md text-center">
        <input
          type="text"
          placeholder="Username"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="p-2 bg-white text-black font-semibold rounded hover:bg-gray-600 hover:text-white"
        >
          Login
        </button>
        <a href="/register" className="mt-5">
          register here
        </a>
      </form>
    </div>
  );
};

export default login;
