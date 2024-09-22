export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile Page</h1>
      <p className="text-4xl">User ID: {params.id}</p>
    </div>
  );
}
