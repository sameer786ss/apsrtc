'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'te';

type LanguageContextType = {
  language: Language;
  t: (key: string, teVal?: string) => string;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Rich bilingual dictionary for automatic translation
const translationsTe: Record<string, string> = {
  // Navigation Groups
  'Home': 'హోమ్',
  'About Us': 'మా గురించి',
  'News/Events': 'వార్తలు / ఈవెంట్స్',
  'Fare & Timings': 'ఛార్జీలు & వేళలు',
  'Logistics': 'లాజిస్టిక్స్',
  'Bus Pass': 'బస్సు పాస్',
  'Contact Us': 'సంప్రదించండి',

  // Sidebar Group Labels
  'Reservations': 'రిజర్వేషన్లు',
  'Chartered Services': 'చార్టర్డ్ సేవలు',
  'Pilgrim Services': 'యాత్రికుల సేవలు',
  'Tourist Services': 'పర్యాటక సేవలు',
  'Passenger Schemes': 'ప్రయాణీకుల పథకాలు',
  'Coaches': 'బస్సు రకాలు / కోచ్‌లు',
  'FAQs': 'తరచుగా అడిగే ప్రశ్నలు',
  'Tenders': 'టెండర్లు',
  'Recruitments': 'ఉద్యోగ నియామకాలు',
  'Student Project Works': 'విద్యార్థి ప్రాజెక్ట్ పనులు',
  'Prohibited Items': 'నిషేధించబడిన వస్తువులు',

  // Sidebar link translations (common links)
  'ATB Agent Login': 'ఏజెంట్ లాగిన్',
  'How to Book': 'बुकिंग ఎలా చేయాలి', // Corrected spelling below
  'How to Book (Telugu)': 'బుకింగ్ ఎలా చేయాలి',
  'Seat-Layout': 'సీట్ లేఅవుట్',
  'Reservation Points': 'రిజర్వేషన్ కేంద్రాలు',
  'How to Prepone': 'ముందుగా మార్చుకోవడం',
  'How to Postpone': 'వాయిదా వేసుకోవడం',
  'How to Cancel': 'రద్దు చేయడం ఎలా',
  'How to Charter a Bus?': 'బస్సు చార్టర్ చేయడం ఎలా?',
  'How to Get Refund?': 'రీఫండ్ పొందడం ఎలా?',
  'Famous Places': 'ప్రసిద్ధ ప్రదేశాలు',
  'In Districts of A.P.': 'ఆంధ్రప్రదేశ్ జిల్లాలలో',
  'Coverage': 'కవరేజ్ పరిధి',
  'Marketing Schemes': 'మార్కెటింగ్ పథకాలు',
  'Types Of Coaches': 'కోచ్ రకాలు',
  'Coach-wise Facilities': 'కోచ్ సదుపాయాలు',
  'On PWD Bus Passes': 'PWD బస్సు పాస్‌లు',
  'On Reservations': 'రిజర్వేషన్లపై ప్రశ్నలు',
  'On Passenger Amenities': 'ప్రయాణీకుల సదుపాయాలు',
  'On Concessional Schemes': 'రాయితీ పథకాలు',
  'On Concessional Passes': 'రాయితీ పాస్‌లు',

  // Mirrored subpage title translations
  'Vision': 'దార్శనికత (విజన్)',
  'Profile': 'సంస్థ ప్రొఫైల్',
  'Key People': 'కీలక అధికారులు / వ్యక్తులు',
  'Infrastructure': 'మౌలిక సదుపాయాలు',
  'Awards': 'అవార్డులు & పురస్కారాలు',
  'IT Initiatives': 'ఐటీ కార్యక్రమాలు',
  'Future Plans': 'భవిష్యత్తు ప్రణాళికలు',
  'The R.T.C. Act, 1950': 'ఆర్.టి.సి. చట్టం, 1950',
  'RTI ACT 2005': 'సమాచార హక్కు చట్టం 2005',
  'APSRTC Referral Hospitals': 'రెఫరల్ ఆసుపత్రులు',
  'APSRTC CCS Information': 'CCS సమాచారం',
  'APSRTC PF Information': 'పిఎఫ్ సమాచారం',
  'Central Complaint Cell': 'కేంద్ర ఫిర్యాదుల విభాగం',
  'For enquiries, grievances and passenger support.': 'విచారణలు, ఫిర్యాదులు మరియు ప్రయాణీకుల సహాయం కొరకు.',
  'APSRTC LIVE TRACK QR': 'లైవ్ ట్రాక్ క్యూఆర్',
  'Passenger app and live tracking gateway': 'లైవ్ ట్రాకింగ్ మొబైల్ యాప్ గేట్‌వే',

  // Homepage translation keys
  'Official public service gateway': 'అధికారిక ప్రజా సేవా వేదిక',
  'APSRTC services, one clean stop.': 'ఏపీఎస్ఆర్టీసీ సేవలు, ఒకే ఒక సులభమైన వేదిక.',
  'Choose reservations, live tracking, logistics, bus passes, tenders, coaches, tourist services, grievances and more from the same portal.': 'రిజర్వేషన్లు, లైవ్ ట్రాకింగ్, లాజిస్టిక్స్, బస్సు పాస్‌లు, టెండర్లు, కోచ్‌లు, పర్యాటక సేవలు మరియు సమస్యల పరిష్కారాన్ని ఒకే చోట పొందండి.',
  'Book Ticket': 'టికెట్ బుక్ చేయండి',
  'Track Bus': 'బస్సును ట్రాక్ చేయండి',
  'IMPORTANT ANNOUNCEMENTS': 'ముఖ్యమైన ప్రకటనలు',
  'WhatsApp Ticket Booking': 'వాట్సాప్ టికెట్ బుకింగ్',
  'Save 95523 00009 and choose APSRTC Services.': '95523 00009 నంబరును సేవ్ చేసి ఏపీఎస్ఆర్టీసీ సేవలను ఎంచుకోండి.',
  'Passenger Gateway': 'ప్రయాణీకుల గేట్‌వే',
  'PWD & Support': 'దివ్యాంగుల & ప్రయాణీకుల సహాయం',
  'Official APSRTC passenger support links for PWD bus passes, eligibility, grievances, live tracking and mobile apps.': 'దివ్యాంగుల బస్సు పాస్‌లు, అర్హత వివరాలు, ఫిర్యాదుల పరిష్కారం, లైవ్ ట్రాకింగ్ మరియు మొబైల్ యాప్‌ల సమాచారం.',
  'View Eligibility': 'అర్హత వివరాలు',
  'Achievements & Awards': 'విజయాలు & అవార్డులు',
  'Notifications': 'తాజా నోటిఫికేషన్లు',
  'Official Gallery & Coaches': 'అధికారిక గ్యాలరీ & కోచ్‌లు',
  'APSRTC Live Track QR': 'ఏపీఎస్ఆర్టీసీ లైవ్ ట్రాక్ క్యూఆర్',
  'Scan, open the live tracking app, or jump to apsrtclivetrack.com for current service movement.': 'క్యూఆర్ కోడ్‌ను స్కాన్ చేయండి లేదా లైవ్ ట్రాకింగ్ యాప్ ఓపెన్ చేసి బస్సుల కదలికలను తెలుసుకోండి.',
  'Open Tracking': 'ట్రాకింగ్ ఓపెన్ చేయండి',
  'Passenger App': 'ప్రయాణీకుల యాప్',
  'Mobile app shortcuts from the original portal are grouped here for faster Android and iOS access.': 'యాండ్రాయిడ్ మరియు ఐఓఎస్ యాప్‌ల త్వరిత డౌన్‌లోడ్ కొరకు ఇక్కడ యాప్ లింక్‌లు అందించబడ్డాయి.',
  'Android App': 'ఆండ్రాయిడ్ యాప్',
  'iOS App': 'ఐఓఎస్ యాప్',
  'Portal': 'పోర్టల్ హోమ్',
  'Student Projects': 'విద్యార్థి ప్రాజెక్ట్ పనులు',
  'PROHIBITED ITEMS': 'నిషేధించబడిన వస్తువులు',
};

// Handled Telugu spelling correction for 'How to Book'
translationsTe['How to Book'] = 'బుకింగ్ ఎలా చేయాలి';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Read after mount (not in the useState initializer) to avoid an SSR hydration mismatch.
  useEffect(() => {
    const saved = localStorage.getItem('apsrtc_lang') as Language;
    if (saved === 'en' || saved === 'te') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('apsrtc_lang', lang);
    } catch (e) {
      console.warn('Failed to save language choice:', e);
    }
  };

  // Helper to translate. If language is 'te', check dictionary first, then teVal, else return key.
  const t = (key: string, teVal?: string) => {
    if (language === 'te') {
      if (translationsTe[key] !== undefined) {
        return translationsTe[key];
      }
      if (teVal !== undefined) {
        return teVal;
      }
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
