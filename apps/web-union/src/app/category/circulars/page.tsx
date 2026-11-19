import { FileText, Image as ImageIcon, Download, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { fetchDocs } from '@/lib/firestore';
import { FileDocument } from '@/lib/types';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Circulars & Notifications - APPTD Employees Union',
  description: 'Download and view the latest circulars, notifications, and official documents from APPTD Employees Union.',
  openGraph: {
    title: 'Circulars & Notifications - APPTD Employees Union',
    description: 'Latest circulars and notifications from APPTD Employees Union.',
  },
};

export default async function CircularsPage() {
  let circulars: FileDocument[] = [];
  try { circulars = await fetchDocs<FileDocument>('circulars', 'date'); }
  catch (e) { console.error('Error fetching circulars:', e); }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 mb-6 font-medium transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-red-700 mb-8 border-b-2 border-red-700 pb-2">Circulars &amp; Notifications</h1>
          <div className="space-y-4">
            {circulars.map(c => (
              <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${c.fileType === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {c.fileType === 'pdf' ? <FileText size={24} /> : <ImageIcon size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{c.title}</h3>
                    <p className="text-sm text-gray-500">
                      {(() => { try { return new Date(c.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return c.date; } })()}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href={c.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-6 py-2 rounded-md font-medium transition-colors w-full md:w-auto ${c.fileType === 'pdf' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                  >
                    {c.fileType === 'pdf' ? <><Download size={18} /> Download PDF</> : <><Eye size={18} /> View Image</>}
                  </a>
                </div>
              </div>
            ))}
            {circulars.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No circulars available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
