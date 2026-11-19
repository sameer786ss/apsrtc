'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Union Affairs', href: '/union-affairs' },
  {
    name: 'PF', href: '#',
    dropdown: [
      { name: 'Employee PF Details', href: 'http://apsrtcpf.in/' },
      { name: 'EPFO Demand Letters Status', href: 'https://unifiedportal-mem.epfindia.gov.in/memberInterfacePohw/' },
      { name: 'EPFO Member Login', href: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/' },
      { name: 'EPFO Pension Status', href: 'https://mis.epfindia.gov.in/PensionPaymentEnquiry/pensionStatus.jsp' },
      { name: 'PF Withdraw Application', href: 'http://apsrtcpf.in/data/EMPLOYEES%20PROVIDENT%20FUND%20ORGANISATION.pdf' },
      { name: 'PF 10-D Application Form', href: 'https://drive.google.com/uc?export=download&id=1QEJZWUa76k8q9mr-kkXheEOphhsNnEHw' },
      { name: 'PF Demand Consent Letter', href: 'https://drive.google.com/uc?export=download&id=1QCyMSrFkKwG0l9Xw_euL8MTXab7pxEm9' },
    ],
  },
  {
    name: 'CCS', href: '#',
    dropdown: [
      { name: 'Employee CCS Details', href: 'https://apsrtc-ccs-ssp.smartcbs.net/' },
      { name: 'CCS App Download', href: 'https://play.google.com/store/apps/details?id=com.ykit.apps.creditsocietymember.apsrtc&pcampaignid=web_share' },
      { name: 'CCS EDL Loan Application', href: 'https://apsrtc-ccs-ssp.smartcbs.net/assets/EDLForm-CCS5E.pdf' },
      { name: 'CCS STL Loan Application', href: 'https://apsrtc-ccs-ssp.smartcbs.net/assets/STLForm-CCS5.pdf' },
      { name: 'CCS Festival Application', href: 'https://apsrtc-ccs-ssp.smartcbs.net/assets/FestivalLoanForm-CCS5F.pdf' },
      { name: 'CCS Membership & Nominee Declaration', href: 'https://drive.google.com/uc?export=download&id=1CVtbSc4qCvvwgq56Jtzc9YLXLaHueqdO' },
      { name: 'CCS FD-RD Claim', href: 'https://drive.google.com/uc?export=download&id=1CVtbSc4qCvvwgq56Jtzc9YLXLaHueqdO' },
      { name: 'CCS Additional Thrift Form', href: 'https://drive.google.com/uc?export=download&id=1p_4hSbnfSulsnUzwPi-iwtkFLDcyrTk6' },
      { name: 'CCS RD Form (CCS 28)', href: 'https://drive.google.com/uc?export=download&id=1HzNa25H0_Ul54ldYDttr8ivDMqC5fXHv' },
      { name: 'CCS RET CMS Claim Form', href: 'https://drive.google.com/uc?export=download&id=1Yz6Qug9nMDkEQtC7MCr4nzwHzbIjWvzi' },
      { name: 'CCS Surety Renewal Form (CCS 8)', href: 'https://drive.google.com/uc?export=download&id=1HGTzoBUEBFZMvap3WvAFNczw3TtpWBO0' },
    ],
  },
  {
    name: 'EHS', href: '#',
    dropdown: [
      { name: 'EHS Card Login', href: 'https://www.ehs.ap.gov.in/EHSAP/loginAction.do?actionFlag=loginPage&theme=navyblue' },
      { name: 'EHS App Download', href: 'https://play.google.com/store/apps/details?id=com.sritindiapvtltd.ehs_app&pcampaignid=web_share' },
      { name: 'EHS Medical Reimbursement', href: 'https://drive.google.com/uc?export=download&id=1-5fLqhomxpKEHFV2kCW02WaEUDM3zbA3' },
      { name: 'EHS Hospitals List', href: 'https://drive.google.com/uc?export=download&id=1R9g7NLDI_i1lATaphVi-pXI-faSryag7' },
      { name: 'EHS Health Card View', href: 'https://www.ehs.ap.gov.in/EHSAP/healthCardAction.do?actionFlag=healthCardView&theme=navyblue' },
    ],
  },
  {
    name: 'Apps', href: '#',
    dropdown: [
      { name: 'Nidhi App', href: 'https://play.google.com/store/apps/details?id=in.apcfss.in.herb.emp&pcampaignid=web_share' },
      { name: 'APFRS App', href: 'https://play.google.com/store/apps/details?id=in.apcfss.apfrs&pcampaignid=web_share' },
      { name: 'Bus Live Track App', href: 'https://play.google.com/store/apps/details?id=com.ionicframework.apsrtclivetrack555011&pcampaignid=web_share' },
    ],
  },
  {
    name: 'Forms', href: '#',
    dropdown: [
      { name: 'Tuition Fee Reimbursement', href: 'https://drive.google.com/uc?export=download&id=1QRDOtGFW3fX-5JQZ4s8S-BKrecSYpE_B' },
      { name: 'Transfer Application', href: 'https://drive.google.com/uc?export=download&id=1Vb1ywvb20edIBzZ1-bI6qCewHp0smRn5' },
      { name: 'Transfer (Region to Region)', href: 'https://drive.google.com/uc?export=download&id=1fTSYBtU-aqqDTXnbcbpAwoDGxgFKdHvA' },
      { name: 'Deputation Circular', href: 'https://drive.google.com/uc?export=download&id=1KZUJC4nSqkKqxG2ubBK3oZ-eHDVvSw7k' },
      { name: 'Leave Application (>3 Days)', href: 'https://drive.google.com/uc?export=download&id=1gKfNuw8ik15yKiWWkKEVUeOLjfRHyVgL' },
      { name: 'EOL Leave Application', href: 'https://drive.google.com/uc?export=download&id=1gLja27nJB5aOJf2Pub0_SCG4Wts7fbAH' },
      { name: 'Commute Leave Application', href: 'https://drive.google.com/uc?export=download&id=1gHcb21dETQl0jfZMougw_c3WMeIzqxSM' },
      { name: 'Family Bus Pass', href: 'https://drive.google.com/uc?export=download&id=1g9yU_YkHG8uQJ4UI6R6ojijnrW5AB-C6' },
      { name: 'Passport Identity Cert.', href: 'https://drive.google.com/uc?export=download&id=1gNt20_94OVLCl30BhpHknT8ClYCuk7qd' },
      { name: 'Govt Sick Application', href: 'https://drive.google.com/uc?export=download&id=14CQ0FuT2Lkh0nv5ayWNV2whegzOWQykb' },
    ],
  },
  { name: 'Circulars', href: '/category/circulars' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Track which dropdown is open (mobile: click-toggle; desktop: hover via CSS)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu + dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => { setMobileOpen(false); setActiveDropdown(null); };

  const toggleDropdown = (name: string) =>
    setActiveDropdown(prev => prev === name ? null : name);

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between lg:w-[80%]">
        <Link href="/" className="flex items-center gap-4" onClick={closeAll}>
          <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
            <Image src="/logo.jpg" alt="APPTD Logo" fill className="object-contain" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-red-700">APPTD Employees Union</h1>
            <p className="text-sm text-gray-600">Official Blog &amp; Information Portal</p>
          </div>
        </Link>
        <button
          className="md:hidden p-2 rounded-md text-red-700 hover:bg-red-50 focus:outline-none transition-colors"
          onClick={() => { setMobileOpen(o => !o); setActiveDropdown(null); }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav
        ref={navRef}
        className={`bg-red-700 text-white ${mobileOpen ? 'block' : 'hidden'} md:block absolute md:static top-full left-0 right-0 z-50 shadow-lg md:shadow-none`}
      >
        <div className="container mx-auto px-4 lg:w-[80%]">
          <ul className="flex flex-col md:flex-row md:items-center md:gap-1 text-sm font-medium">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative border-b border-white/20 md:border-none last:border-none group"
              >
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="w-full md:w-auto flex items-center justify-between md:justify-start gap-1 px-4 py-3 md:py-2 hover:bg-red-800 transition-colors focus:outline-none"
                      aria-expanded={activeDropdown === item.name}
                    >
                      {item.name}
                      <ChevronDown
                        size={14}
                        className={`transform transition-transform md:group-hover:rotate-180 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div className={`md:absolute md:left-0 md:top-full md:w-64 bg-[#009999] md:shadow-xl md:border md:border-white/20 z-50 md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100 md:transition-all md:duration-150 ${activeDropdown === item.name ? 'block' : 'hidden md:block'}`}>
                      <ul className="flex flex-col py-1">
                        {item.dropdown.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              target={sub.href.startsWith('http') ? '_blank' : '_self'}
                              rel={sub.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="block px-6 md:px-4 py-2 text-white hover:bg-[#007777] transition-colors text-sm"
                              onClick={closeAll}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 md:py-2 hover:bg-red-800 transition-colors"
                    onClick={closeAll}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
