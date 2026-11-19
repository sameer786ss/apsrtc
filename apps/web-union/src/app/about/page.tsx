import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'About Us - APPTD Employees Union',
  description: 'Learn more about the APPTD Employees Union, our mission, and our history.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 mb-6 font-medium transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-red-700 mb-6 border-b-2 border-red-700 pb-2">About Us</h1>
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6 text-gray-700 leading-relaxed">
            <p>Welcome to the official website of the <strong>APPTD Employees Union</strong>. We are dedicated to serving the employees of the Andhra Pradesh Public Transport Department (APPTD).</p>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Our Mission</h2>
            <p>Our mission is to protect the rights and welfare of all employees, ensure fair treatment, and promote a positive working environment within the organization. We strive to be the voice of the workforce and bridge the gap between the administration and the employees.</p>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Our History</h2>
            <p>Established with the goal of unity and progress, the APPTD Employees Union has a long history of advocating for employee benefits, better working conditions, and professional growth. We have been instrumental in numerous successful negotiations and initiatives that have improved the lives of our members.</p>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Contact Us</h2>
            <p>For any queries or assistance, please reach out to our representatives via the <Link href="/contact" className="text-red-700 hover:underline">Contact Page</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
