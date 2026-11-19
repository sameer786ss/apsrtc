'use client';

import React from 'react';
import {
  Box,
  Chip,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { ChevronRight, Siren, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { appLinks, isOutboundLink, navHref, officialImages, sideNavigation, statutoryLinks } from '@/data/apsrtc';
import { useLanguage } from '@/context/LanguageContext';

// Premium category color mappings from the user mockup
const sectionThemes: Record<string, { bg: string; text: string; activeBg: string }> = {
  'Reservations': { bg: '#f5f3ff', text: '#5f33e1', activeBg: '#e0e7ff' },
  'Chartered Services': { bg: '#fff7ed', text: '#ea580c', activeBg: '#ffedd5' },
  'Pilgrim Services': { bg: '#ecfdf5', text: '#059669', activeBg: '#d1fae5' },
  'Tourist Services': { bg: '#fdf2f8', text: '#db2777', activeBg: '#fce7f3' },
  'Passenger Schemes': { bg: '#f0f9ff', text: '#0284c7', activeBg: '#e0f2fe' },
  'Coaches': { bg: '#f5f3ff', text: '#6d28d9', activeBg: '#ede9fe' },
  'FAQs': { bg: '#f9fafb', text: '#4b5563', activeBg: '#f3f4f6' },
  'Tenders': { bg: '#e0e7ff', text: '#312e81', activeBg: '#c7d2fe' },
  'Recruitments': { bg: '#eff6ff', text: '#1d4ed8', activeBg: '#dbeafe' },
  'Student Project Works': { bg: '#f0fdfa', text: '#0f766e', activeBg: '#ccfbf1' },
  'Prohibited Items': { bg: '#fef2f2', text: '#b91c1c', activeBg: '#fee2e2' },
};

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <Stack 
      spacing={2.5} 
      sx={{ 
        position: { md: 'sticky' }, 
        top: { md: 168 },
        pb: 2
      }}
    >
      {/* Central Complaint Cell - Premium cool-blue theme matching the mockup */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)', 
          border: '1px solid rgba(245, 183, 63, 0.45)',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)'
        }}
      >
        <Stack spacing={1.2}>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
            <Siren size={18} color="#111827" />
            <Typography variant="subtitle2" sx={{ fontWeight: 950, color: '#111827', letterSpacing: '0.2px' }}>{t("Central Complaint Cell")}</Typography>
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 950, color: '#111827', lineHeight: 1 }}>149</Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>{t("For enquiries, grievances and passenger support.")}</Typography>
          <Chip size="small" label="WhatsApp: 7993355619" sx={{ alignSelf: 'flex-start', fontWeight: 850, bgcolor: '#ffffff', color: '#111827', border: '1px solid rgba(17, 24, 39, 0.15)' }} />
        </Stack>
      </Paper>

      {/* Live Track QR Card - Premium clean design matching the mockup */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)', 
          border: '1px solid rgba(245, 183, 63, 0.45)',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)'
        }}
      >
        <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Box component="a" href={appLinks[2].href} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', p: 0.5, border: '1px solid rgba(245, 183, 63, 0.45)', borderRadius: '12px', bgcolor: '#fff' }}>
            <Box component="img" src={officialImages.liveTrackQr} alt="APSRTC LIVE TRACK QR" sx={{ width: 140, height: 140, objectFit: 'contain' }} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 950, color: '#111827' }}>{t("APSRTC LIVE TRACK QR")}</Typography>
          <Divider flexItem sx={{ borderColor: 'rgba(245, 183, 63, 0.45)' }} />
          <Smartphone size={36} color="#111827" />
          <Box component="a" href={appLinks[0].href} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', p: 0.5, border: '1px solid rgba(245, 183, 63, 0.45)', borderRadius: '12px', bgcolor: '#fff' }}>
            <Box component="img" src={officialImages.passengerAppQr} alt="APSRTC PASSENGER APP QR" sx={{ width: 140, height: 140, objectFit: 'contain' }} />
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569' }}>{t("Passenger app and live tracking gateway")}</Typography>
        </Stack>
      </Paper>

      <Box sx={{ height: 4 }} />
    </Stack>
  );
}
