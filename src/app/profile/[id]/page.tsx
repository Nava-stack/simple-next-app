export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Person Profile</h1>
      <p className="text-4xl">User ID: </p>
      <p className="text-3xl my-3 bg-orange-500 px-4 py-2 rounded-md">
        {params.id}
      </p>
    </div>
  );
}
