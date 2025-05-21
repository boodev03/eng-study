export default function PermissionDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <a href="/" className="text-blue-600 hover:text-blue-800 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
}
