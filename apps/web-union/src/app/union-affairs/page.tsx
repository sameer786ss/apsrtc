import { FileText, Image as ImageIcon, Download, Eye, ArrowLeft, Music } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { fetchDocs } from '@/lib/firestore';
import { FileDocument } from '@/lib/types';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Union Affairs - APPTD Employees Union',
  description: 'Stay updated with the latest union affairs, announcements, documents and audio recordings from APPTD Employees Union.',
  openGraph: {
    title: 'Union Affairs - APPTD Employees Union',
    description: 'Latest union affairs, documents and announcements.',
  },
};

export default async function UnionAffairsPage() {
  let items: FileDocument[] = [];
  try { items = await fetchDocs<FileDocument>('union_affairs', 'date'); }
  catch (e) { console.error('Error fetching union affairs:', e); }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 lg:w-[80%]">
        <div className="flex flex-col lg:flex-row-reverse gap-6">
          <div className="w-full lg:w-3/4">
            <Link href="/" className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 mb-6 font-medium transition-colors">
              <ArrowLeft size={20} /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-red-700 mb-8 border-b-2 border-red-700 pb-2">Union Affairs</h1>
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg flex-shrink-0 ${item.fileType === 'pdf' ? 'bg-red-50 text-red-600' : item.fileType === 'audio' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {item.fileType === 'pdf' ? <FileText size={24} /> : item.fileType === 'audio' ? <Music size={24} /> : <ImageIcon size={24} />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-gray-800 text-xl leading-tight mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {(() => { try { return new Date(item.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return item.date; } })()}
                      </p>
                    </div>
                  </div>
                  <div className="pl-0 md:pl-[60px] space-y-4">
                    {item.fileType === 'audio' && (
                      <div className="w-full bg-gray-50 p-2 rounded-md">
                        <audio controls className="w-full"><source src={item.fileUrl} type="audio/mpeg" />Your browser does not support audio.</audio>
                      </div>
                    )}
                    {item.fileType === 'image' && (
                      <div className="relative h-64 w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                        <Image src={item.fileUrl} alt={item.title} fill className="object-contain" />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {item.fileType === 'pdf' && <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"><Download size={18} /> Download PDF</a>}
                      {item.fileType === 'image' && <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"><Eye size={18} /> View Full Image</a>}
                      {item.fileType === 'audio' && <a href={item.fileUrl} download className="inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"><Download size={18} /> Download Audio</a>}
                    </div>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500">No union affairs posts available at the moment.</p>
                </div>
              )}
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
