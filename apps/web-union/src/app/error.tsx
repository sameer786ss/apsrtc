'use client';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Try Again</button>
          <Link href="/" className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
