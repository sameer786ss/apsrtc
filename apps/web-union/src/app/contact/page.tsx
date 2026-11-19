import { Phone, MapPin, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us - APPTD Employees Union',
  description: 'Contact information for APPTD Employees Union representatives and office bearers.',
};

const contacts = [
  { role: 'State President', name: 'Palisetti Damodararao', phone: '9989397989', location: 'Vijayawada' },
  { role: 'General Secretary', name: 'G.V. Narasaiah', phone: '9441195580', location: 'Vijayawada' },
  { role: 'Working President', name: 'P Subramanyamraju', phone: '9440765005', location: 'Vijayawada' },
  { role: 'Chief Vice President', name: 'K Nageswararao', phone: '7382887911', location: 'Vijayawada' },
  { role: 'Treasurer', name: 'M. Srinivasa Rao', phone: '9440022222', location: 'Guntur' },
];

const zones = [
  { name: 'Vizianagaram Zone', contact: '9490000001' },
  { name: 'Vijayawada Zone', contact: '9490000002' },
  { name: 'Nellore Zone', contact: '9490000003' },
  { name: 'Kadapa Zone', contact: '9490000004' },
  { name: 'Kurnool Zone', contact: '9490000005' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 mb-6 font-medium transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-red-700 mb-2 text-center">Contact Us</h1>
          <p className="text-gray-600 text-center mb-12">Get in touch with the APPTD Employees Union representatives.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {contacts.map((c, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-700 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{c.role}</h3>
                <div className="flex items-center gap-2 text-red-600 font-medium mb-4"><User size={18} />{c.name}</div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3"><Phone size={16} className="text-gray-400" /><a href={`tel:${c.phone}`} className="hover:text-red-700 transition-colors">{c.phone}</a></div>
                  <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-400" /><span>{c.location}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Zonal Representatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {zones.map((z, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-100">
                  <span className="font-medium text-gray-700">{z.name}</span>
                  <a href={`tel:${z.contact}`} className="text-red-700 font-bold hover:underline">{z.contact}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
