export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <main className="flex flex-col gap-8 text-center items-center">
        <h1 className="text-5xl font-bold text-center">
          Welcome to Next.js! Simple App
        </h1>
        <div className="flex items-center justify-between gap-4">
          <a
            href="/login"
            className="bg-white text-black text-2xl px-4 py-2 rounded-md "
          >
            Login
          </a>
          <a
            href="/register"
            className=" text-white text-2xl px-4 py-2 rounded-md  border border-white"
          >
            Register
          </a>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
        <p>Developed by Navarasan</p>
      </footer>
    </div>
  );
}
