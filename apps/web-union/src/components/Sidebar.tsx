import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-full lg:w-1/4 space-y-4">
      <div className="bg-amber-500 rounded-lg overflow-hidden shadow-md">
        <div className="bg-amber-600 px-4 py-3">
          <h3 className="font-bold text-white text-lg tracking-wide">MENU</h3>
        </div>
        <div className="divide-y divide-amber-400">
          {[
            { href: '/', label: 'Home' },
            { href: '/union-affairs', label: 'Union Affairs' },
            { href: '/category/circulars', label: 'Circulars' },
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact Us' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="flex items-center justify-between px-4 py-3 text-amber-900 font-semibold hover:bg-amber-400 transition-colors">
              <span>{label}</span>
              <span className="text-amber-700 font-bold">&raquo;</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-700">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li><a href="https://www.apsrtc.ap.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">APSRTC Official Site</a></li>
          <li><a href="http://apsrtcpf.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">Employee Login (PF Trust)</a></li>
          <li><a href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/" target="_blank" rel="noopener noreferrer" className="hover:underline">EPFO Member Login</a></li>
          <li><a href="https://drive.google.com/uc?export=download&id=1gKfNuw8ik15yKiWWkKEVUeOLjfRHyVgL" target="_blank" rel="noopener noreferrer" className="hover:underline">Leave Application</a></li>
        </ul>
      </div>
    </div>
  );
}
