import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { fetchDocs } from '@/lib/firestore';
import { Blog } from '@/lib/types';
import { generateExcerpt } from '@/lib/utils';

export const revalidate = 60;

export default async function Home() {
  let blogs: Blog[] = [];
  try { blogs = await fetchDocs<Blog>('blogs', 'created_at'); }
  catch (e) { console.error('Error fetching blogs:', e); }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:w-[80%]">
        <div className="flex flex-col lg:flex-row gap-4">
          <Sidebar />
          <div className="w-full lg:w-3/4">
            <h2 className="text-2xl font-bold mb-6 text-red-700 border-b-2 border-red-700 pb-2">Latest Updates &amp; Circulars</h2>
            <div className="flex flex-col gap-4">
              {blogs.map((blog) => (
                <Link href={`/blog/${blog.slug}`} key={blog.id} className="group">
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row border border-gray-100">
                    <div className="relative h-48 sm:h-auto sm:w-56 md:w-64 flex-shrink-0 bg-gray-100">
                      <Image
                        src={blog.cover_image || '/logo.jpg'}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 256px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow min-w-0">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-sm uppercase">{blog.category || 'Update'}</span>
                          <span className="text-xs text-gray-500">{blog.created_at.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 group-hover:text-red-700 line-clamp-2 leading-tight">{blog.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 hidden sm:block">
                          {blog.excerpt || generateExcerpt(blog.content, 150)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-xs font-medium text-red-600 group-hover:underline">Read More &rarr;</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {blogs.length === 0 && (
              <div className="text-center py-12 bg-white rounded shadow">
                <p className="text-gray-500">No updates available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
