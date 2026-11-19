export type ApsrtcLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ApsrtcGroup = {
  label: string;
  href?: string;
  links: ApsrtcLink[];
};

export const officialBase = 'https://www.apsrtc.ap.gov.in';
export const localOfficialPrefix = '/apsrtc';

export function isOfficialApsrtcHref(href: string) {
  return href.startsWith(officialBase) || href.startsWith('https://apsrtc.ap.gov.in') || href.startsWith('/') || (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:'));
}

export function toLocalOfficialHref(href: string) {
  if (!href || href === '#' || href.startsWith('tel:') || href.startsWith('mailto:')) return href || '/';
  if (href.startsWith(localOfficialPrefix)) return href;

  let url: URL;
  try {
    url = href.startsWith('http')
      ? new URL(href)
      : new URL(href, officialBase);
  } catch {
    return href;
  }

  if (url.hostname !== 'www.apsrtc.ap.gov.in' && url.hostname !== 'apsrtc.ap.gov.in') {
    return href;
  }

  if (url.pathname === '/' || url.pathname === '/index.php') {
    return '/';
  }
  return `${localOfficialPrefix}${url.pathname}${url.search}${url.hash}`;
}

export function navHref(link: ApsrtcLink) {
  return isOfficialApsrtcHref(link.href) ? toLocalOfficialHref(link.href) : link.href;
}

export function isOutboundHref(href: string) {
  return /^https?:\/\//.test(href) && !isOfficialApsrtcHref(href);
}

export function isOutboundLink(link: ApsrtcLink) {
  return isOutboundHref(link.href);
}

export const officialImages = {
  logo: `${localOfficialPrefix}/220px-APSRTC_Logo.png`,
  chiefMinister: `${localOfficialPrefix}/images/CM_CBN_new.jpg`,
  transportMinister: `${localOfficialPrefix}/images/Mandipalli_Ramprasad_Reddy_new.jpg`,
  liveTrackQr: `${localOfficialPrefix}/images/APSRTC%20LIVE%20TRACK%20QR.png`,
  passengerAppQr: `${localOfficialPrefix}/images/APSRTC%20PASSENGER%20APP%20QR.png`,
  zeroPoverty: `${localOfficialPrefix}/images/Zeropovertyp4.jpg`,
  divyangOne: `${localOfficialPrefix}/images/Divyang_FreeBus1.jpeg`,
  divyangTwo: `${localOfficialPrefix}/images/Divyang_FreeBus2.jpeg`,
  easyTicket: `${localOfficialPrefix}/images/Easy%20Ticket.jpg`,
  doorDelivery: `${localOfficialPrefix}/images/Door%20delivery%20locations.JPG`,
  rtcHouse: `${localOfficialPrefix}/images/RtcHouse.jpg`,
  amaravathi: `${localOfficialPrefix}/images/Amaravathi.jpg`,
  albion: `${localOfficialPrefix}/images/Albion%201932.jpg`,
  callCenter: `${localOfficialPrefix}/images/Abhibus%20call%20center149.jpeg`,
  logistics: `${localOfficialPrefix}/Logistics%20&%20Courier%20Servicesnew.jpg`,
  androidApp: `${localOfficialPrefix}/Android%20Mobile%20App.JPG`,
  iosApp: `${localOfficialPrefix}/Ios%20Mobile%20App.JPG`,
  facebook: `${localOfficialPrefix}/images/facebook.JPG`,
  twitter: `${localOfficialPrefix}/images/Twitter.JPG`,
  parcelService: `${localOfficialPrefix}/images/Parcel%20Service%202.jpeg`,
};

export const mainNavigation: ApsrtcGroup[] = [
  {
    label: 'Home',
    href: `${officialBase}/index.php`,
    links: [{ label: 'Home', href: `${officialBase}/index.php` }],
  },
  {
    label: 'About Us',
    href: `${officialBase}/about.php`,
    links: [
      { label: 'Vision', href: `${officialBase}/vision.php` },
      { label: 'Profile', href: `${officialBase}/profile.php` },
      { label: 'Key People', href: `${officialBase}/key_people.php` },
      { label: 'Infrastructure', href: `${officialBase}/infrastructure.php` },
      { label: 'Awards', href: `${officialBase}/awards.php` },
      { label: 'IT Initiatives', href: `${officialBase}/it_initiatives.php` },
      { label: 'Future Plans', href: `${officialBase}/Future_Plans.php` },
    ],
  },
  {
    label: 'News/Events',
    links: [
      { label: "All MD's Photo Gallery", href: `${officialBase}/photo_gallery.php` },
      { label: 'Achievements', href: `${officialBase}/PDFDOCS/Achievements.pdf`, external: true },
    ],
  },
  {
    label: 'Fare & Timings',
    links: [
      { label: 'Reservation Services Time Table', href: 'http://www.apsrtconline.in/', external: true },
      { label: 'All services Time Table & Tracking', href: 'https://apsrtclivetrack.com/#/', external: true },
    ],
  },
  {
    label: 'Logistics',
    links: [
      { label: 'Online Cargo & Parcel Booking', href: 'https://cargo.apsrtconline.in/', external: true },
      { label: 'ATB Agent Portal Login', href: 'https://agents.apsrtconline.in/apsrtc-oprs/login/show.do', external: true },
      { label: 'About APSRTC Logistics', href: `${officialBase}/Logistics/AboutAPSRTCLogistics.pdf`, external: true },
      { label: 'Parcel tariff', href: `${officialBase}/Logistics/Parceltariff.pdf`, external: true },
      { label: 'Courier tariff', href: `${officialBase}/Logistics/Couriertariff.pdf`, external: true },
      { label: 'Perishable-vegetable tariff', href: `${officialBase}/Logistics/Perishablevegetabletariff.pdf`, external: true },
      { label: 'Leasing of dickey space', href: `${officialBase}/Logistics/Leasingofdickeyspace.pdf`, external: true },
      { label: 'DGT rates for bulk cargo', href: `${officialBase}/Logistics/DGTratesforbulkcargo.pdf`, external: true },
      { label: 'Door delivery charges', href: `${officialBase}/Logistics/Doordeliverycharges.pdf`, external: true },
      { label: 'Insurance for logistics', href: `${officialBase}/Logistics/Insuranceforlogistics.pdf`, external: true },
      { label: 'Agent enrollment procedure', href: `${officialBase}/Logistics/APBAgentinfoforweb.pdf`, external: true },
      { label: 'Booking counters in AP', href: `${officialBase}/Logistics/Booking%20counters%20in_AP.pdf`, external: true },
      { label: 'Booking counters in I.S', href: `${officialBase}/Logistics/BookingcountersinIS.pdf`, external: true },
      { label: 'Contacts', href: `${officialBase}/Logistics/ATMs(C)230426.pdf`, external: true },
    ],
  },
  {
    label: 'Bus Pass',
    links: [
      { label: 'Apply/Renew Bus Pass Online', href: 'https://buspassonline.apsrtconline.in/', external: true },
      { label: 'Eligibility Criteria', href: `${officialBase}/Tenders/BUS%20PASSES%20ELIGIBILITY%20CRITERIA%20OCT24.pdf`, external: true },
      { label: 'Journalist Bus Pass Application', href: `${officialBase}/PDFDOCS/JournalistBusPassApplication.pdf`, external: true },
    ],
  },
  {
    label: 'Contact Us',
    links: [
      { label: 'Bus Stations Enquiry', href: `${officialBase}/Bus_Stations.php` },
      { label: 'Grievances', href: `${officialBase}/Grievances.php` },
      { label: 'Apsrtc PNBS Enquiry', href: `${officialBase}/APSRTC_PNBS_Enquiry.php` },
      { label: 'PF-SBT-SRBS', href: `${officialBase}/Pf_Sbt_Srbs.php` },
      { label: 'Depots', href: `${officialBase}/Depots.php` },
      { label: 'District Public Transport Officers', href: `${officialBase}/District_Public_Transport_Officers.php` },
      { label: 'Zones', href: `${officialBase}/Zones.php` },
      { label: 'Corporate Office', href: `${officialBase}/Corporate_Office.php` },
    ],
  },
];

export const sideNavigation: ApsrtcGroup[] = [
  {
    label: 'Reservations',
    links: [
      { label: 'ATB Agent Login', href: 'https://agents.apsrtconline.in/apsrtc-oprs/login/show.do', external: true },
      { label: 'How to Book', href: `${officialBase}/how_to_book.php` },
      { label: 'Seat-Layout', href: `${officialBase}/seat_layout.php` },
      { label: 'Reservation Points', href: `${officialBase}/Reservation_Points.php` },
      { label: 'How to Prepone', href: `${officialBase}/How_to_Prepone.php` },
      { label: 'How to Postpone', href: `${officialBase}/How_to_Postpone.php` },
      { label: 'How to Cancel', href: `${officialBase}/How_to_Cancel.php` },
    ],
  },
  {
    label: 'Chartered Services',
    links: [
      { label: 'How to Charter a Bus?', href: `${officialBase}/How_to_Charter_a_Bus.php` },
      { label: 'How to Get Refund?', href: `${officialBase}/How_to_Get_Refund.php` },
    ],
  },
  {
    label: 'Pilgrim Services',
    links: [
      { label: 'Famous Places', href: `${officialBase}/famous_places.php` },
      { label: 'In Districts of A.P.', href: `${officialBase}/In_Districts_of_A.P.php` },
    ],
  },
  {
    label: 'Tourist Services',
    links: [{ label: 'In Districts of A.P.', href: `${officialBase}/T_In_Districts_of_A.P.php` }],
  },
  {
    label: 'Passenger Schemes',
    links: [
      { label: 'Coverage', href: `${officialBase}/coverage.php` },
      { label: 'Marketing Schemes', href: `${officialBase}/marketing_schemes.php` },
    ],
  },
  {
    label: 'Coaches',
    links: [
      { label: 'Types Of Coaches', href: `${officialBase}/Types_Of_Coaches.php` },
      { label: 'Coach-wise Facilities', href: `${officialBase}/Coach_wise_Facilities.php` },
    ],
  },
  {
    label: 'FAQs',
    links: [
      { label: 'On PWD Bus Passes', href: `${officialBase}/On_PwdBusPasses.php` },
      { label: 'On Reservations', href: `${officialBase}/On_Reservations.php` },
      { label: 'On Passenger Amenities', href: `${officialBase}/On_Passenger_Amenities.php` },
      { label: 'On Concessional Schemes', href: `${officialBase}/On_Concessional_Schemes.php` },
      { label: 'On Concessional Passes', href: `${officialBase}/On_Concessional_Passes.php` },
    ],
  },
  {
    label: 'Tenders',
    links: [
      { label: 'ELECTRIC BUSES', href: `${officialBase}/Electric_Buses.php` },
      { label: 'Advertisements', href: `${officialBase}/T_Advertisements.php` },
      { label: 'Auctions & Disposals', href: `${officialBase}/Auctions_and_Disposals.php` },
      { label: 'Civil Contract Works', href: `${officialBase}/Civil_contract_Works.php` },
      { label: 'OS 15', href: `${officialBase}/OS%20_15.php` },
      { label: 'BOT TENDER', href: `${officialBase}/BOT_TENDER_Works.php` },
      { label: 'Chassis & Bodies', href: `${officialBase}/Chassis_and_Bodies.php` },
      { label: 'Hire Buses', href: `${officialBase}/Hire_Buses.php` },
      { label: 'Other Contract Works', href: `${officialBase}/Other_Contract_Works.php` },
      { label: 'Out Sourcing Works', href: `${officialBase}/Out_Sourcing_Works.php` },
      { label: 'Procurement & Supplies', href: `${officialBase}/Procurement_and_Supplies.php` },
      { label: 'Stalls & Shops for Rent', href: `${officialBase}/Stalls_and_Shops_for_Rent.php` },
    ],
  },
  {
    label: 'Recruitments',
    links: [{ label: 'Recruitments', href: `${officialBase}/Recruitments.php` }],
  },
  {
    label: 'Student Project Works',
    links: [{ label: 'Student Projects', href: `${officialBase}/Students_Project_Works.php` }],
  },
  {
    label: 'Prohibited Items',
    links: [{ label: 'PROHIBITED ITEMS', href: `${officialBase}/Prohibited_Items.php` }],
  },
];

export const statutoryLinks: ApsrtcLink[] = [
  { label: 'The R.T.C. Act, 1950', href: `${officialBase}/RTCACT1950.pdf`, external: true },
  { label: 'RTI ACT 2005', href: `${officialBase}/Information_on_APSRTC.php` },
  { label: 'APSRTC Referral Hospitals', href: `${officialBase}/Referral_Hospital.php` },
  { label: 'APSRTC CCS Information', href: 'https://apsrtc-ccs-ssp.smartcbs.net/', external: true },
  { label: 'APSRTC PF Information', href: 'http://www.apsrtcpf.in/', external: true },
];

export const portalLinks: (ApsrtcLink & { subtitle: string; color: string })[] = [
  { label: 'Online Reservation', subtitle: 'Book APSRTC services', href: 'https://apsrtconline.in/', external: true, color: '#d8393f' },
  { label: 'Live Bus Tracking', subtitle: 'All services timetable and tracking', href: 'https://apsrtclivetrack.com/#/', external: true, color: '#317a49' },
  { label: 'Cargo & Logistics', subtitle: 'Online parcel bookings', href: 'https://cargo.apsrtconline.in/', external: true, color: '#c78012' },
  { label: 'Bus Pass Online', subtitle: 'Passenger pass service', href: 'https://buspassonline.apsrtconline.in/', external: true, color: '#285a98' },
  { label: 'CCS Information', subtitle: 'APSRTC CCS service portal', href: 'https://apsrtc-ccs-ssp.smartcbs.net/', external: true, color: '#6c3ca4' },
  { label: 'PF Information', subtitle: 'APSRTC PF information', href: 'http://www.apsrtcpf.in/', external: true, color: '#00838f' },
];

export const announcementLinks: ApsrtcLink[] = [
  { label: 'Swarnandhra Population Management Policy Program Portal', href: 'https://swarnandhra.ap.gov.in/PMP', external: true },
  { label: 'Door to Door Parcel Service bookings', href: 'http://apsrtclogistics.in/', external: true },
  { label: 'Online Reservation of services', href: 'https://apsrtconline.in/', external: true },
  { label: 'Zero Poverty P4 portal', href: 'https://zeropovertyp4.ap.gov.in/', external: true },
];

export const awardItems = [
  { label: 'Public Sector Enterprises Technology and Innovation Awards-2026', image: `${localOfficialPrefix}/images/PSE%20AWARD%202026.jpg`, href: `${officialBase}/awards.php` },
  { label: 'e Governance PSU Awards in New Delhi', image: `${localOfficialPrefix}/images/e%20Governance%20PSU%20Award.jpeg`, href: `${officialBase}/awards.php` },
  { label: 'Skoch Awards 2025 for UTS Project, APSRTC', image: `${localOfficialPrefix}/images/SKOCH%20AWARD%202025.jpg`, href: `${officialBase}/awards.php` },
  { label: 'ASRTU National Excellence Awards 2023-2024 for APSRTC', image: `${localOfficialPrefix}/images/asrtu-fuel-effiency-awards.gif`, href: `${officialBase}/awards.php` },
  { label: 'Skoch Awards 2024 for UTS Project, APSRTC', image: `${localOfficialPrefix}/Skoch%20Awards%202024.JPG`, href: `${officialBase}/awards.php` },
  { label: 'Governance Now 9th PSU award for APSRTC', image: `${localOfficialPrefix}/PSUAWARD2024.jpg`, href: `${officialBase}/awards.php` },
  { label: "Pravas 4.0 RedBus People's Choice-2024 Award", image: `${localOfficialPrefix}/Prawaas.jpg`, href: `${officialBase}/awards.php` },
  { label: 'Technology Sabha 2023 & 2024 award for APSRTC', image: `${localOfficialPrefix}/images/2024%20award.jpg`, href: `${officialBase}/awards.php` },
];

export const notificationLinks: ApsrtcLink[] = [
  { label: 'NOTIFICATION ON FIRM REGISTRATION FEE ENHANCEMENT', href: `${officialBase}/images/NOTIFICATION%20ON%20FIRM%20REGISTRATION%20FEE%20ENHANCEMENT.pdf`, external: true },
  { label: 'E-Office Manual', href: `${officialBase}/Eoffice%20Manual%207X%20V1.pdf`, external: true },
  { label: 'APSRTC Official mail IDs have been renamed.', href: `${officialBase}/Corporate_Office.php` },
  { label: 'For further details refer to CONTACT US TAB to know new official mail IDs.', href: `${officialBase}/Corporate_Office.php` },
];

export const appLinks: ApsrtcLink[] = [
  { label: 'Android Mobile App for Live Tracking for Buses', href: 'https://play.google.com/store/apps/details?id=com.ionicframework.apsrtclivetrack555011&hl=en', external: true },
  { label: 'iOS Mobile App for Live Tracking of Buses', href: 'https://apps.apple.com/in/app/apsrtc-live-track/id1355667500', external: true },
  { label: 'APSRTC Live Track', href: 'https://apsrtclivetrack.com/#/', external: true },
];

export const footerLinks: ApsrtcLink[] = [
  { label: 'Site Map', href: `${officialBase}/Site_Map.php` },
  { label: 'About This Site', href: `${officialBase}/About_This_Site.php`, external: true },
  { label: 'Terms of Use', href: `${officialBase}/Term_of_use.php` },
];
