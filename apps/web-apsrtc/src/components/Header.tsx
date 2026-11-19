'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ChevronDown,
  ChevronRight,
  Menu as MenuIcon,
  X,
  Home,
} from 'lucide-react';
import { isOutboundLink, mainNavigation, navHref, officialImages, sideNavigation, type ApsrtcGroup, type ApsrtcLink } from '@/data/apsrtc';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
// Premium category color mappings for mobile menu
const sectionThemes: Record<string, { bg: string; text: string; activeBg: string }> = {
  // Navigation Groups
  'Home': { bg: '#fffbf2', text: '#bf360c', activeBg: '#fdf0d8' },
  'About Us': { bg: '#f5f3ff', text: '#5f33e1', activeBg: '#e0e7ff' },
  'News/Events': { bg: '#fff7ed', text: '#ea580c', activeBg: '#ffedd5' },
  'Fare & Timings': { bg: '#ecfdf5', text: '#059669', activeBg: '#d1fae5' },
  'Logistics': { bg: '#fdf2f8', text: '#db2777', activeBg: '#fce7f3' },
  'Bus Pass': { bg: '#f0f9ff', text: '#0284c7', activeBg: '#e0f2fe' },
  'Contact Us': { bg: '#eff6ff', text: '#1d4ed8', activeBg: '#dbeafe' },

  // Sidebar Group Labels
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

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const { language, t, setLanguage } = useLanguage();

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const desktopNavigation = [
    ...mainNavigation.slice(0, mainNavigation.length - 1),
    ...sideNavigation,
    mainNavigation[mainNavigation.length - 1]
  ];

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMobileToggle = (label: string) => {
    setExpandedMobileMenu(expandedMobileMenu === label ? null : label);
  };

  const renderMobileGroup = (group: ApsrtcGroup) => {
    const isFlat = group.links.length === 1;
    const isOpen = expandedMobileMenu === group.label;
    const sectionTheme = sectionThemes[group.label] || { bg: '#f9fafb', text: '#4b5563', activeBg: '#f3f4f6' };

    if (isFlat) {
      return (
        <Box key={group.label} sx={{ px: 1.5, my: 0.8 }}>
          <ListItemButton
            component="a"
            href={navHref(group.links[0])}
            target={isOutboundLink(group.links[0]) ? '_blank' : undefined}
            rel={isOutboundLink(group.links[0]) ? 'noopener noreferrer' : undefined}
            onClick={() => setMobileOpen(false)}
            sx={{ 
              bgcolor: sectionTheme.bg, 
              color: sectionTheme.text,
              borderRadius: '10px',
              py: 1.1,
              px: 1.8,
              '&:hover': { bgcolor: sectionTheme.activeBg }
            }}
          >
            <ListItemText primary={<Typography sx={{ fontWeight: 900, fontSize: 14.5 }}>{t(group.label)}</Typography>} />
            <ChevronRight size={16} />
          </ListItemButton>
        </Box>
      );
    }

    return (
      <Box key={group.label} sx={{ px: 1.5, my: 0.8 }}>
        <ListItemButton
          onClick={() => handleMobileToggle(group.label)}
          sx={{ 
            bgcolor: sectionTheme.bg, 
            color: sectionTheme.text,
            borderRadius: '10px',
            py: 1.1,
            px: 1.8,
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            '&:hover': { bgcolor: sectionTheme.activeBg }
          }}
        >
          <ListItemText primary={<Typography sx={{ fontWeight: 900, fontSize: 14.5 }}>{t(group.label)}</Typography>} />
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ChevronRight size={16} />
          </motion.div>
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ py: 0.5 }}>
            {group.links.map((link: ApsrtcLink) => (
              <ListItemButton
                key={link.label}
                component="a"
                href={navHref(link)}
                target={isOutboundLink(link) ? '_blank' : undefined}
                rel={isOutboundLink(link) ? 'noopener noreferrer' : undefined}
                onClick={() => setMobileOpen(false)}
                sx={{ 
                  py: 0.8, 
                  pl: 3.8, 
                  color: '#4b5563',
                  borderRadius: '8px',
                  my: 0.15,
                  '&:hover': { bgcolor: 'rgba(191, 54, 12, 0.05)', color: '#bf360c' }
                }}
              >
                <ListItemText primary={<Typography sx={{ fontSize: 13, fontWeight: 750 }}>{t(link.label)}</Typography>} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </Box>
    );
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleMenuClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(null);
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'transparent', color: 'inherit' }}>
      <Box sx={{ background: 'linear-gradient(135deg, #fffbf2 0%, #fdf0d8 45%, #fadfae 85%, #f7d49b 100%)', color: '#111827', borderBottom: '1.5px solid rgba(245, 183, 63, 0.4)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 86, md: 114 }, py: { xs: 1.25, md: 1.5 } }}>
            <Box
              component="a"
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                flexGrow: 1,
                minWidth: 0,
                '&:hover': {
                  opacity: 0.95
                }
              }}
            >
              <Stack 
                direction="row" 
                spacing={{ xs: 1.5, md: 2.5 }} 
                sx={{ 
                  alignItems: 'center', 
                  flexGrow: 1, 
                  minWidth: 0,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Box
                  sx={{
                    height: { xs: 54, md: 90 },
                    width: { xs: 54, md: 90 },
                    borderRadius: '50%',
                    bgcolor: '#ffffff',
                    border: { xs: '2px solid rgba(245, 183, 63, 0.45)', md: '3px solid rgba(245, 183, 63, 0.45)' },
                    overflow: 'hidden',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                  }}
                >
                  <Box
                    component="img"
                    src={officialImages.logo}
                    alt="APSRTC Logo"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transform: 'scale(1.25)',
                    }}
                  />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  {/* Desktop Titles */}
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography
                      component="div"
                      sx={{ 
                        fontSize: 32, 
                        fontWeight: 900, 
                        lineHeight: 1.1, 
                        color: '#111827',
                        mb: 0.75 
                      }}
                    >
                      ఆంధ్ర ప్రదేశ్ రాష్ట్ర రోడ్డు రవాణా సంస్థ
                    </Typography>
                    <Typography
                      component="div"
                      sx={{ 
                        fontFamily: 'serif', 
                        fontWeight: 900, 
                        fontSize: 28,
                        lineHeight: 1.1, 
                        color: '#111827',
                      }}
                    >
                      Andhra Pradesh State Road Transport Corporation
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.95, color: '#334155', fontWeight: 600 }}>
                      {t("Public transport, reservations, live tracking, logistics, passes, tenders and citizen services.", "ప్రజా రవాణా, రిజర్వేషన్లు, ప్రత్యక్ష ట్రాకింగ్, లాజిస్టిక్స్, బస్సు పాస్‌లు, టెండర్లు మరియు పౌర సేవలు.")}
                    </Typography>
                  </Box>

                  {/* Mobile Titles (Right next to Logo with zero gap) */}
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Typography
                      component="div"
                      sx={{ 
                        fontSize: 17.5, 
                        fontWeight: 900, 
                        lineHeight: 1.1, 
                        color: '#111827',
                        mb: 0.5 
                      }}
                    >
                      ఆంధ్ర ప్రదేశ్ రాష్ట్ర రోడ్డు రవాణా సంస్థ
                    </Typography>
                    <Typography
                      component="div"
                      sx={{ 
                        fontFamily: 'serif', 
                        fontWeight: 900, 
                        fontSize: 15,
                        lineHeight: 1.1, 
                        color: '#111827',
                      }}
                    >
                      Andhra Pradesh State Road Transport Corporation
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
            {/* Desktop Language Selector Pill (visible on all desktop/laptop screen widths) */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                alignItems: 'center', 
                border: '1.5px solid rgba(17, 24, 39, 0.25)', 
                borderRadius: '20px', 
                overflow: 'hidden', 
                bgcolor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: 'none',
                p: 0.25,
                mr: { md: 2, lg: 3 }
              }}
            >
              <Button
                onClick={() => setLanguage('en')}
                sx={{
                  minWidth: 44,
                  height: 28,
                  borderRadius: '16px',
                  fontSize: 11,
                  fontWeight: 900,
                  color: language === 'en' ? '#ffffff' : '#111827',
                  bgcolor: language === 'en' ? '#bf360c' : 'transparent',
                  py: 0,
                  px: 1.5,
                  '&:hover': {
                    bgcolor: language === 'en' ? '#bf360c' : 'rgba(191,54,12,0.08)'
                  }
                }}
              >
                EN
              </Button>
              <Button
                onClick={() => setLanguage('te')}
                sx={{
                  minWidth: 48,
                  height: 28,
                  borderRadius: '16px',
                  fontSize: 11.5,
                  fontWeight: 900,
                  color: language === 'te' ? '#ffffff' : '#111827',
                  bgcolor: language === 'te' ? '#bf360c' : 'transparent',
                  py: 0,
                  px: 1.5,
                  '&:hover': {
                    bgcolor: language === 'te' ? '#bf360c' : 'rgba(191,54,12,0.08)'
                  }
                }}
              >
                తెలుగు
              </Button>
            </Box>

            <Stack direction="row" spacing={2.5} sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
              {/* CM Card */}
              <Stack 
                spacing={0.5} 
                sx={{ 
                  alignItems: 'center', 
                  bgcolor: 'rgba(255, 255, 255, 0.45)', 
                  border: '1.5px solid rgba(245, 183, 63, 0.45)', 
                  borderRadius: '12px', 
                  py: 1.25,
                  px: 1.5,
                  minWidth: 135,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Box
                  sx={{
                    height: 76,
                    width: 60,
                    borderRadius: '6px',
                    border: '1.5px solid rgba(245, 183, 63, 0.6)',
                    overflow: 'hidden',
                    bgcolor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={officialImages.chiefMinister}
                    alt="Sri Nara Chandrababu Naidu Garu"
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </Box>
                <Typography sx={{ fontSize: 9.5, fontWeight: 900, color: '#111827', lineHeight: 1.15, textAlign: 'center' }}>
                  {t("Sri Nara Chandrababu Naidu Garu", "శ్రీ నారా చంద్రబాబు నాయుడు గారు")}
                </Typography>
                <Typography sx={{ fontSize: 8.5, fontWeight: 700, color: '#bf360c', lineHeight: 1.15, textAlign: 'center' }}>
                  {t("Hon'ble Chief Minister,", "గౌరవ ముఖ్యమంత్రి,")}
                </Typography>
                <Typography sx={{ fontSize: 8, fontWeight: 700, color: '#334155', lineHeight: 1.15, textAlign: 'center', opacity: 0.95 }}>
                  {t("of Andhra Pradesh", "ఆంధ్రప్రదేశ్ ప్రభుత్వం")}
                </Typography>
              </Stack>

              {/* TM Card */}
              <Stack 
                spacing={0.5} 
                sx={{ 
                  alignItems: 'center', 
                  bgcolor: 'rgba(255, 255, 255, 0.45)', 
                  border: '1.5px solid rgba(245, 183, 63, 0.45)', 
                  borderRadius: '12px', 
                  py: 1.25,
                  px: 1.5,
                  minWidth: 135,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Box
                  sx={{
                    height: 76,
                    width: 60,
                    borderRadius: '6px',
                    border: '1.5px solid rgba(245, 183, 63, 0.6)',
                    overflow: 'hidden',
                    bgcolor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={officialImages.transportMinister}
                    alt="Sri Mandipalli Ramprasad Reddy"
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </Box>
                <Typography sx={{ fontSize: 9.5, fontWeight: 900, color: '#111827', lineHeight: 1.15, textAlign: 'center' }}>
                  {language === 'en' ? (
                    <>
                      Sri. Mandipalli Ramprasad Reddy
                    </>
                  ) : (
                    <>
                      శ్రీ మండిపల్లి రాంప్రసాద్ రెడ్డి
                    </>
                  )}
                </Typography>
                <Typography sx={{ fontSize: 8.5, fontWeight: 700, color: '#bf360c', lineHeight: 1.15, textAlign: 'center' }}>
                  {t("Transport Minister", "రవాణా శాఖ మంత్రి")}
                </Typography>
                <Typography sx={{ fontSize: 8, fontWeight: 700, color: '#334155', lineHeight: 1.15, textAlign: 'center', opacity: 0.95 }}>
                  {t("Government of Andhra Pradesh", "ఆంధ్రప్రదేశ్ ప్రభుత్వం")}
                </Typography>
              </Stack>
            </Stack>
          </Toolbar>
        </Container>

        {/* Compact dignitary profiles sub-bar for Mobile & Tablet screens */}
        <Box 
          sx={{ 
            display: { xs: 'flex', lg: 'none' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1.5,
            pt: 0.5,
            px: 2,
            borderTop: '1px solid rgba(191, 54, 12, 0.12)'
          }}
        >
          {/* Hamburger (breadcrumb) menu icon inside mobile down bar */}
          <IconButton
            color="inherit"
            aria-label="open navigation"
            onClick={() => setMobileOpen(true)}
            sx={{ 
              border: '1px solid rgba(191, 54, 12, 0.35)', 
              color: '#bf360c', 
              flexShrink: 0,
              p: 0.5,
              mr: 1
            }}
          >
            <MenuIcon size={20} />
          </IconButton>

          {/* Centered Dignitaries profiles */}
          <Stack 
            direction="row" 
            spacing={{ xs: 1.5, sm: 4 }} 
            sx={{ 
              alignItems: 'center', 
              flexGrow: 1, 
              justifyContent: 'center',
              mr: 4 /* Compensates MenuIcon width to perfectly center CM and TM stack */
            }}
          >
            {/* CM Card Mobile */}
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  height: 42,
                  width: 32,
                  borderRadius: '4px',
                  border: '1px solid rgba(245, 183, 63, 0.5)',
                  overflow: 'hidden',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Box
                  component="img"
                  src={officialImages.chiefMinister}
                  alt="Sri Nara Chandrababu Naidu Garu"
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 9.5, fontWeight: 900, color: '#111827', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                  {t("Sri N. Chandrababu Naidu", "శ్రీ నారా చంద్రబాబు నాయుడు")}
                </Typography>
                <Typography sx={{ fontSize: 8, fontWeight: 700, color: '#bf360c', lineHeight: 1.1, opacity: 0.9 }}>
                  {t("Hon'ble Chief Minister, AP", "గౌరవ ముఖ్యమంత్రి, ఆం.ప్ర.")}
                </Typography>
              </Box>
            </Stack>

            {/* TM Card Mobile */}
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  height: 42,
                  width: 32,
                  borderRadius: '4px',
                  border: '1px solid rgba(245, 183, 63, 0.5)',
                  overflow: 'hidden',
                  bgcolor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Box
                  component="img"
                  src={officialImages.transportMinister}
                  alt="Sri Mandipalli Ramprasad Reddy"
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 9.5, fontWeight: 900, color: '#111827', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                  {language === 'en' ? (
                    <>
                      Sri. M. Ramprasad Reddy
                    </>
                  ) : (
                    <>
                      శ్రీ మండిపల్లి రాంప్రసాద్ రెడ్డి
                    </>
                  )}
                </Typography>
                <Typography sx={{ fontSize: 8, fontWeight: 700, color: '#bf360c', lineHeight: 1.1, opacity: 0.9 }}>
                  {t("Transport Minister, AP", "రవాణా శాఖ మంత్రి, ఆం.ప్ర.")}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Ticker & Helpline Shimmer Strip */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #fdd835 0%, #fbc02d 100%)',
          color: '#111827',
          borderBottom: '1.5px solid rgba(245, 183, 63, 0.35)',
          py: 0.75,
          px: { xs: 2, md: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden',
          minHeight: 32,
          gap: 2
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0, flexGrow: 1, overflow: 'hidden' }}>
          {/* Latest Badge */}
          <Box
            sx={{
              bgcolor: '#111827',
              color: '#ffd375',
              px: 1,
              py: 0.25,
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 950,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              flexShrink: 0,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              animation: 'blink 1.5s infinite ease-in-out',
              '@keyframes blink': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.65 }
              }
            }}
          >
            {t("Latest", "తాజా")}
          </Box>

          {/* Scrolling Ticker (flowing marquee with shimmering text) */}
          <Box
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              position: 'relative'
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                animation: 'marquee 30s linear infinite',
                '@keyframes marquee': {
                  '0%': { transform: 'translate3d(0, 0, 0)' },
                  '100%': { transform: 'translate3d(-50%, 0, 0)' }
                },
                '&:hover': {
                  animationPlayState: 'paused'
                }
              }}
            >
              <Typography
                component="span"
                sx={{
                  display: 'inline-block',
                  fontSize: { xs: 11, md: 12 },
                  fontWeight: 800,
                  letterSpacing: '0.2px',
                  backgroundImage: 'linear-gradient(120deg, #111827 30%, #ff6d00 50%, #111827 70%)',
                  backgroundSize: '200% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s infinite linear',
                  '@keyframes shimmer': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                  },
                  pr: 8
                }}
              >
                {t(
                  "Zero Poverty P4 Portal is Live  •  Online Student Bus Pass renewals and eligibility criteria updated  •  Toll-Free Information System enabled for cargo & logistics.",
                  "పేదరిక నిర్మూలన పి4 పోర్టల్ ప్రత్యక్షంగా ఉంది  •  ఆన్‌లైన్ విద్యార్థి బస్సు పాస్ పునరుద్ధరణలు మరియు అర్హత ప్రమాణాలు నవీకరించబడ్డాయి  •  లాజిస్టిక్స్ కోసం టోల్-ఫ్రీ సమాచార వ్యవస్థ ప్రారంభించబడింది."
                )}
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: 'inline-block',
                  fontSize: { xs: 11, md: 12 },
                  fontWeight: 800,
                  letterSpacing: '0.2px',
                  backgroundImage: 'linear-gradient(120deg, #111827 30%, #ff6d00 50%, #111827 70%)',
                  backgroundSize: '200% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s infinite linear',
                  pr: 8
                }}
              >
                {t(
                  "Zero Poverty P4 Portal is Live  •  Online Student Bus Pass renewals and eligibility criteria updated  •  Toll-Free Information System enabled for cargo & logistics.",
                  "పేదరిక నిర్మూలన పి4 పోర్టల్ ప్రత్యక్షంగా ఉంది  •  ఆన్‌లైన్ విద్యార్థి బస్సు పాస్ పునరుద్ధరణలు మరియు అర్హత ప్రమాణాలు నవీకరించబడ్డాయి  •  లాజిస్టిక్స్ కోసం టోల్-ఫ్రీ సమాచార వ్యవస్థ ప్రారంభించబడింది."
                )}
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* Helpline (shimmering text) */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexShrink: 0 }}>
          <Typography
            sx={{
              fontSize: { xs: 11, md: 12 },
              fontWeight: 900,
              color: '#111827',
              whiteSpace: 'nowrap'
            }}
          >
            {t("24/7 Helpline: 149 / 0866-2574411", "24/7 హెల్ప్‌లైన్: 149 / 0866-2574411")}
          </Typography>
        </Stack>
      </Box>

      <Box 
        sx={{ 
          background: 'linear-gradient(90deg, #e65100 0%, #bf360c 100%)', 
          color: '#fffef0', 
          borderBottom: '1.5px solid rgba(245, 183, 63, 0.4)',
          position: 'relative',
        }}
        className="nav-button-container"
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            variant="dense" 
            sx={{ 
              minHeight: 44, 
              display: { xs: 'none', md: 'flex' }, 
              flexWrap: 'wrap', 
              py: 0.75, 
              gap: 0.5,
              justifyContent: 'center'
            }}
          >
            {desktopNavigation.map((item) => {
              const isFlat = item.links.length === 1;
              const alignRight = ['Tenders', 'Citizen Info', 'Contact Us'].includes(item.label);
              return (
                <Box 
                  key={item.label} 
                  onMouseEnter={() => !isFlat && handleMouseEnter(item.label)}
                  onMouseLeave={() => !isFlat && handleMouseLeave()}
                  sx={{ 
                    position: 'relative',
                    mx: 0.15
                  }}
                >
                  {isFlat ? (
                    <Button
                      color="inherit"
                      component="a"
                      href={navHref(item.links[0])}
                      startIcon={item.label === 'Home' ? <Home size={15} /> : undefined}
                      sx={{ 
                        px: { md: 1, lg: 1.6 }, 
                        py: 0.75,
                        minHeight: 38, 
                        borderRadius: '6px', 
                        textShadow: 'none', 
                        fontWeight: 800,
                        fontSize: { md: 11.5, lg: 13 },
                        bgcolor: item.label === 'Home' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                      onMouseEnter={handleMenuClose}
                    >
                      {t(item.label)}
                    </Button>
                  ) : (
                    <>
                      <Button
                        color="inherit"
                        endIcon={
                          <motion.div
                            animate={{ rotate: activeMenu === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <ChevronDown size={14} />
                          </motion.div>
                        }
                        sx={{ 
                          px: { md: 1, lg: 1.6 }, 
                          py: 0.75,
                          minHeight: 38, 
                          borderRadius: '6px', 
                          textShadow: 'none', 
                          fontWeight: 800,
                          fontSize: { md: 11.5, lg: 13 },
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                          }
                        }}
                      >
                        {t(item.label)}
                      </Button>
                      <AnimatePresence>
                        {activeMenu === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: alignRight ? 'auto' : 0,
                              right: alignRight ? 0 : 'auto',
                              minWidth: 245,
                              zIndex: 1100,
                              paddingTop: 4,
                            }}
                          >
                            <Box
                              sx={{
                                background: 'linear-gradient(180deg, #fffcf7 0%, #fff3e0 100%)',
                                color: '#bf360c',
                                py: 0.5,
                                border: '1.5px solid rgba(245, 183, 63, 0.65)', 
                                borderRadius: 1.5,
                                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
                                overflow: 'hidden',
                              }}
                            >
                              {item.links.map((link) => (
                                <Box
                                  key={link.label}
                                  component="a"
                                  href={navHref(link)}
                                  target={isOutboundLink(link) ? '_blank' : undefined}
                                  rel={isOutboundLink(link) ? 'noopener noreferrer' : undefined}
                                  onClick={handleMenuClose}
                                  sx={{
                                    display: 'block',
                                    fontSize: 14,
                                    fontWeight: 800,
                                    color: '#111827',
                                    px: 2.5,
                                    py: 1.2,
                                    textDecoration: 'none',
                                    borderBottom: '1px solid rgba(245, 183, 63, 0.25)',
                                    transition: 'all 0.15s ease',
                                    '&:last-of-type': { borderBottom: 'none' },
                                    '&:hover': {
                                      bgcolor: '#e65100',
                                      color: '#ffffff',
                                      pl: 3.2,
                                    }
                                  }}
                                >
                                  {t(link.label)}
                                </Box>
                              ))}
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </Box>
              );
            })}
          </Toolbar>
        </Container>
      </Box>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: 'min(88vw, 340px)', bgcolor: '#f8fafc' } }}
      >
        <Stack sx={{ background: 'linear-gradient(90deg, #e65100 0%, #bf360c 100%)', color: 'white', p: 2, borderBottom: '2px solid rgba(245, 183, 63, 0.4)', gap: 1.5 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '0.2px' }}>APSRTC Menu</Typography>
            <IconButton color="inherit" aria-label="close navigation" onClick={() => setMobileOpen(false)} sx={{ border: '1px solid rgba(255,255,255,0.25)' }}>
              <X size={18} />
            </IconButton>
          </Stack>
          
          {/* Mobile Language Switcher Pill inside Drawer Header */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              border: '1.5px solid rgba(255, 255, 255, 0.25)', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              p: 0.35,
              width: '100%'
            }}
          >
            <Button
              onClick={() => setLanguage('en')}
              sx={{
                flex: 1,
                height: 32,
                borderRadius: '20px',
                fontSize: 12,
                fontWeight: 900,
                color: language === 'en' ? '#bf360c' : '#ffffff',
                bgcolor: language === 'en' ? '#fffef0' : 'transparent',
                py: 0,
                px: 2,
                '&:hover': {
                  bgcolor: language === 'en' ? '#fffef0' : 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              English
            </Button>
            <Button
              onClick={() => setLanguage('te')}
              sx={{
                flex: 1,
                height: 32,
                borderRadius: '20px',
                fontSize: 12.5,
                fontWeight: 900,
                color: language === 'te' ? '#bf360c' : '#ffffff',
                bgcolor: language === 'te' ? '#fffef0' : 'transparent',
                py: 0,
                px: 2,
                '&:hover': {
                  bgcolor: language === 'te' ? '#fffef0' : 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              తెలుగు
            </Button>
          </Box>
        </Stack>
        <List disablePadding sx={{ py: 1 }}>
          <Box sx={{ px: 2.5, py: 1, mt: 0.5 }}>
            <Typography variant="overline" sx={{ fontWeight: 950, color: '#bf360c', fontSize: 10.5, letterSpacing: '0.5px' }}>
              {t("Main Navigation", "ప్రధాన నావిగేషన్")}
            </Typography>
          </Box>
          {mainNavigation.map(renderMobileGroup)}

          <Box sx={{ my: 1, px: 2 }}>
            <Divider />
          </Box>

          <Box sx={{ px: 2.5, py: 1 }}>
            <Typography variant="overline" sx={{ fontWeight: 950, color: '#bf360c', fontSize: 10.5, letterSpacing: '0.5px' }}>
              {t("Services & Portals", "సేవలు & పోర్టల్స్")}
            </Typography>
          </Box>
          {sideNavigation.map(renderMobileGroup)}
        </List>
      </Drawer>
    </AppBar>
  );
}
