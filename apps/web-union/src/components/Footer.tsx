import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-4 lg:w-[80%]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">APPTD Employees Union</h3>
                        <p className="text-gray-400 text-sm">
                            Providing latest updates, circulars, and information for APPTD employees.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-red-500">Contact</h3>
                        <p className="text-gray-400 text-sm">
                            Address: Vijayawada, Andhra Pradesh
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} APPTD Employees Union. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
