import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Blog } from '@/lib/types';
import { stripHtml, generateExcerpt } from '@/lib/utils';

export const revalidate = 60;

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data(), created_at: doc.data().created_at?.toDate?.() || new Date() } as Blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found' };
  const plainDesc = blog.meta_description
    ? stripHtml(blog.meta_description)
    : generateExcerpt(blog.content, 160);
  return {
    title: blog.meta_title || `${blog.title} - APPTD Employees Union`,
    description: plainDesc,
    keywords: blog.keywords ? blog.keywords.split(',').map((k: string) => k.trim()) : [],
    openGraph: {
      title: blog.meta_title || blog.title,
      description: plainDesc,
      images: blog.cover_image ? [blog.cover_image] : [],
    },
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 lg:w-[80%]">
        <div className="flex flex-col lg:flex-row-reverse gap-6">
          <div className="w-full lg:w-3/4">
            <Link href="/" className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 mb-6 font-medium transition-colors">
              <ArrowLeft size={20} /> Back to Home
            </Link>
            <article className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              {blog.cover_image && (
                <div className="relative h-[300px] md:h-[400px] w-full bg-gray-100">
                  <Image
                    src={blog.cover_image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">{blog.category}</span>
                  <span>{new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">{blog.title}</h1>
                <div className="rich-content text-gray-800" dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
            </article>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
