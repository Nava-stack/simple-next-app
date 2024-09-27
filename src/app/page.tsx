import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <main className="flex flex-col gap-8 text-center items-center">
        {/* Hero Section */}
        <h1 className="text-6xl font-extrabold tracking-tight text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Welcome to Next.js! Authentication App
        </h1>

        {/* Login/Register Links */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/login"
            className="bg-pink-500 hover:bg-pink-600 text-white text-2xl px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-white text-2xl px-6 py-3 rounded-lg border border-white hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-10 text-gray-400">
        <p className="text-lg">Developed by Navarasan</p>
      </footer>
    </div>
  );
}
