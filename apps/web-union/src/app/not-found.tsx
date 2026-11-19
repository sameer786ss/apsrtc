import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-red-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 inline-block">Back to Home</Link>
      </div>
    </div>
  );
}
