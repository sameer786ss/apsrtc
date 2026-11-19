import Sidebar from '@/components/Sidebar';

function Skel({ className }: { className: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 lg:w-[80%]">
        <div className="flex flex-col lg:flex-row-reverse gap-6">
          <div className="w-full lg:w-3/4">
            {/* Back link skeleton */}
            <Skel className="h-5 w-28 mb-6" />
            <article className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              {/* Cover image skeleton */}
              <div className="relative h-[300px] md:h-[400px] w-full bg-gray-200 animate-pulse" />
              <div className="p-6 md:p-10">
                {/* Category pill + date */}
                <div className="flex items-center gap-4 mb-6">
                  <Skel className="h-7 w-24 rounded-full" />
                  <Skel className="h-4 w-24" />
                </div>
                {/* Title */}
                <Skel className="h-9 w-3/4 mb-3" />
                <Skel className="h-9 w-1/2 mb-8" />
                {/* Content paragraphs */}
                <div className="space-y-3">
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-5/6" />
                  <Skel className="h-4 w-full" />
                </div>
                <div className="space-y-3 mt-6">
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-4/5" />
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-3/4" />
                </div>
                {/* Simulated heading break */}
                <Skel className="h-7 w-2/5 mt-8 mb-4" />
                <div className="space-y-3">
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-5/6" />
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-2/3" />
                </div>
                {/* Blockquote-like skeleton */}
                <div className="mt-6 border-l-4 border-gray-200 pl-4 space-y-2">
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-4/5" />
                </div>
                <div className="space-y-3 mt-6">
                  <Skel className="h-4 w-full" />
                  <Skel className="h-4 w-5/6" />
                  <Skel className="h-4 w-3/4" />
                </div>
              </div>
            </article>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
