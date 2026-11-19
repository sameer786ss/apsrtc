'use client';

import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Bell,
  Bus,
  Clock3,
  FileText,
  MapPinned,
  MessageCircle,
  PackageCheck,
  QrCode,
  Route,
  Smartphone,
  Ticket,
  Users,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import {
  announcementLinks,
  appLinks,
  awardItems,
  isOutboundLink,
  mainNavigation,
  navHref,
  notificationLinks,
  officialImages,
  portalLinks,
  sideNavigation,
} from '@/data/apsrtc';
import { useLanguage } from '@/context/LanguageContext';

const portalIcons = [Ticket, Route, PackageCheck, Users, FileText, Bus];
const quickServices = [
  ...mainNavigation.find((group) => group.label === 'Fare & Timings')!.links,
  ...mainNavigation.find((group) => group.label === 'Logistics')!.links,
  ...mainNavigation.find((group) => group.label === 'Bus Pass')!.links,
  ...mainNavigation.find((group) => group.label === 'Contact Us')!.links,
];

const supportTiles = [
  sideNavigation.find((group) => group.label === 'FAQs')!.links[0],
  mainNavigation.find((group) => group.label === 'Bus Pass')!.links[0],
  mainNavigation.find((group) => group.label === 'Contact Us')!.links[1],
  appLinks[2],
  appLinks[0],
  appLinks[1],
];

const galleryItems = [
  { name: 'RTC House', image: officialImages.rtcHouse, href: officialImages.rtcHouse, type: 'Official APSRTC corporate image' },
  { name: 'Albion 1932', image: officialImages.albion, href: officialImages.albion, type: 'Historical APSRTC fleet image' },
  { name: 'Amaravathi', image: officialImages.amaravathi, href: officialImages.amaravathi, type: 'Official Amaravathi service image' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 22 } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

export default function Home() {
  const { t } = useLanguage();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Grid container spacing={3} columns={24}>
          {/* Sidebar Area */}
          <Grid size={{ xs: 24, md: 6, lg: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Sidebar />
          </Grid>

          {/* Main Body content Area */}
          <Grid size={{ xs: 24, md: 18, lg: 19 }}>
            <Stack spacing={3}>
              {/* Hero Banner Grid (outlined in blue in mockup) */}
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <Paper
                  elevation={0}
                  sx={{
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    bgcolor: 'white',
                  }}
                >
                  <Grid container columns={10}>
                    {/* Left: APSRTC public service gateway */}
                    <Grid size={{ xs: 10, lg: 6 }}>
                      <Box
                        sx={{
                          minHeight: { xs: 400, md: 450 },
                          p: { xs: 3, sm: 4, md: 5 },
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          overflow: 'hidden',
                          background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: {
                              xs: `linear-gradient(180deg, rgba(238,242,255,0.98) 0%, rgba(238,242,255,0.95) 60%, rgba(238,242,255,0.85) 100%), url(${officialImages.amaravathi})`,
                              md: `linear-gradient(90deg, rgba(238,242,255,0.98) 0%, rgba(238,242,255,0.94) 44%, rgba(255,255,255,0.5) 66%, rgba(255,255,255,0.1) 100%), url(${officialImages.amaravathi})`
                            },
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: { xs: '130% auto', md: '75% auto' },
                            backgroundPosition: { xs: 'center bottom 20px', md: 'right bottom 20px' },
                            opacity: 0.95,
                          }}
                        />
                        <Box sx={{ position: 'relative', maxWidth: 600 }}>
                          <Chip 
                            label={t("Official public service gateway")} 
                            sx={{ 
                              fontWeight: 900, 
                              mb: 2.5, 
                              bgcolor: '#bf360c', 
                              color: '#ffffff',
                              boxShadow: '0 2px 6px rgba(191,54,12,0.15)'
                            }} 
                          />
                          <Typography 
                            variant="h2" 
                            component="h1" 
                            sx={{ 
                              fontSize: { xs: 30, sm: 40, md: 48 }, 
                              lineHeight: 1.1, 
                              color: '#0f172a', 
                              fontWeight: 900,
                              letterSpacing: '-0.5px',
                              maxWidth: 560 
                            }}
                          >
                            {t("APSRTC services, one clean stop.")}
                          </Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              mt: 2, 
                              color: '#475569', 
                              maxWidth: 500, 
                              fontWeight: 700, 
                              lineHeight: 1.5,
                              textShadow: '0 1px 0 rgba(255,255,255,0.85)' 
                            }}
                          >
                            {t("Choose reservations, live tracking, logistics, bus passes, tenders, coaches, tourist services, grievances and more from the same portal.")}
                          </Typography>
                        </Box>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ position: 'relative', mt: { xs: 4, md: 3 } }}>
                          <Button 
                            variant="contained" 
                            size="large" 
                            href={portalLinks[0].href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            endIcon={<ArrowUpRight />}
                            sx={{ 
                              bgcolor: '#bf360c', 
                              '&:hover': { bgcolor: '#e65100' },
                              px: 4,
                              py: 1.4,
                              borderRadius: '10px',
                              fontWeight: 800,
                              boxShadow: '0 4px 12px rgba(191,54,12,0.2)'
                            }}
                          >
                            {t("Book Ticket")}
                          </Button>
                          <Button 
                            variant="outlined" 
                            size="large" 
                            href={portalLinks[1].href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            startIcon={<MapPinned />} 
                            sx={{ 
                              bgcolor: 'white',
                              color: '#bf360c',
                              borderColor: '#bf360c',
                              '&:hover': { borderColor: '#e65100', bgcolor: 'rgba(191,54,12,0.03)' },
                              px: 4,
                              py: 1.4,
                              borderRadius: '10px',
                              fontWeight: 800
                            }}
                          >
                            {t("Track Bus")}
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>

                    {/* Right: Important Announcements (Outlined in mockup) */}
                    <Grid size={{ xs: 10, lg: 4 }}>
                      <Box 
                        sx={{ 
                          height: '100%', 
                          background: 'linear-gradient(135deg, #fffbf2 0%, #fff3e0 100%)', 
                          color: '#111827', 
                          p: { xs: 3, md: 4.5 },
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: { xs: 'auto', lg: '100%' },
                          border: '1.5px solid rgba(191, 54, 12, 0.25)',
                          borderRadius: '16px',
                          boxShadow: '0 4px 15px rgba(191, 54, 12, 0.06)'
                        }}
                      >
                        <Stack spacing={1.8}>
                          <Typography variant="overline" sx={{ fontWeight: 950, letterSpacing: '1px', opacity: 0.95, fontSize: 11, color: '#334155' }}>
                            {t("IMPORTANT ANNOUNCEMENTS")}
                          </Typography>
                          <Stack spacing={1.25}>
                            {announcementLinks.map((item, index) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: 18 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.12 + index * 0.07 }}
                              >
                                <Paper
                                  component="a"
                                  href={navHref(item)}
                                  target={isOutboundLink(item) ? '_blank' : undefined}
                                  rel={isOutboundLink(item) ? 'noopener noreferrer' : undefined}
                                  elevation={0}
                                  sx={{ 
                                    display: 'block', 
                                    p: 1.5, 
                                    borderRadius: '12px',
                                    bgcolor: '#ffffff', 
                                    color: '#1e293b', 
                                    border: '1px solid rgba(191, 54, 12, 0.15)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      transform: 'translateX(4px)',
                                      bgcolor: '#fffbfb',
                                      borderColor: '#e65100'
                                    }
                                  }}
                                >
                                  <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                                      <Bell size={18} color="#334155" style={{ flexShrink: 0 }} />
                                      <Typography variant="body2" sx={{ fontWeight: 800, fontSize: 13, lineHeight: 1.35, color: '#1e293b' }}>{t(item.label)}</Typography>
                                    </Stack>
                                    <ChevronRight size={16} color="#64748b" style={{ flexShrink: 0 }} />
                                  </Stack>
                                </Paper>
                              </motion.div>
                            ))}
                          </Stack>
                        </Stack>

                        <Box sx={{ mt: 3.5 }}>
                          <Divider sx={{ borderColor: 'rgba(191, 54, 12, 0.15)', mb: 2 }} />
                          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                            <Box 
                              sx={{ 
                                width: 44, 
                                height: 44, 
                                borderRadius: '50%', 
                                bgcolor: '#22c55e', 
                                color: 'white', 
                                display: 'grid', 
                                placeItems: 'center',
                                boxShadow: '0 2px 8px rgba(34,197,94,0.3)'
                              }}
                            >
                              <MessageCircle size={22} fill="white" />
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 950, fontSize: 14.5, color: '#111827' }}>{t("WhatsApp Ticket Booking")}</Typography>
                              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700 }}>{t("Save 95523 00009 and choose APSRTC Services.")}</Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>

              {/* 6 Portal Links Grid */}
              <Grid container spacing={2.5}>
                {portalLinks.map((item, index) => {
                  const Icon = portalIcons[index] || ArrowUpRight;
                  return (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.label}>
                      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: index * 0.05 }} whileHover={{ y: -7 }}>
                        <Card 
                          sx={{ 
                            height: '100%', 
                            background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)',
                            border: '1px solid rgba(245, 183, 63, 0.45)',
                            borderRadius: '16px',
                            boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)',
                          }}
                        >
                          <CardActionArea 
                            href={navHref(item)} 
                            target={isOutboundLink(item) ? '_blank' : undefined} 
                            rel={isOutboundLink(item) ? 'noopener noreferrer' : undefined} 
                            sx={{ height: '100%', p: 2.5 }}
                          >
                            <Stack spacing={2}>
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: '12px',
                                  bgcolor: '#bf360c',
                                  color: 'white',
                                  display: 'grid',
                                  placeItems: 'center',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}
                              >
                                <Icon size={22} />
                              </Box>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 950, color: '#111827', fontSize: 16 }}>{t(item.label)}</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.25, color: '#475569' }}>{t(item.subtitle)}</Typography>
                              </Box>
                            </Stack>
                          </CardActionArea>
                        </Card>
                      </motion.div>
                    </Grid>
                  );
                })}
              </Grid>

              {/* Passenger Gateway & Support Tiles */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 7 }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      border: '1px solid rgba(245, 183, 63, 0.45)', 
                      borderRadius: '16px',
                      boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)',
                      height: '100%',
                      background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)'
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(17, 24, 39, 0.08)', display: 'grid', placeItems: 'center' }}>
                        <Bus color="#111827" size={20} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>{t("Passenger Gateway")}</Typography>
                    </Stack>
                    <Grid container spacing={1.5} component={motion.div} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                      {quickServices.map((service) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={service.label}>
                          <motion.div variants={fadeUp}>
                            <Button
                              component="a"
                              href={navHref(service)}
                              target={isOutboundLink(service) ? '_blank' : undefined}
                              rel={isOutboundLink(service) ? 'noopener noreferrer' : undefined}
                              fullWidth
                              variant="outlined"
                              endIcon={<ArrowUpRight size={17} />}
                              sx={{ 
                                justifyContent: 'space-between', 
                                minHeight: 48, 
                                bgcolor: '#ffffff', 
                                color: '#111827', 
                                borderColor: 'rgba(17, 24, 39, 0.15)',
                                borderRadius: '10px',
                                fontWeight: 800,
                                px: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: 'rgba(191, 54, 12, 0.05)',
                                  borderColor: '#bf360c',
                                  color: '#bf360c'
                                }
                              }}
                            >
                              {t(service.label)}
                            </Button>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, lg: 5 }}>
                  <Paper 
                    id="bus-pass" 
                    elevation={0} 
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #fffbf2 0%, #fff3e0 100%)', 
                      color: '#111827', 
                      border: '1.5px solid rgba(191, 54, 12, 0.25)', 
                      borderRadius: '16px',
                      boxShadow: '0 4px 15px rgba(191, 54, 12, 0.06)',
                      overflow: 'hidden', 
                      position: 'relative' 
                    }}
                  >
                    <Stack spacing={2.5} sx={{ position: 'relative' }}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(17, 24, 39, 0.08)', display: 'grid', placeItems: 'center' }}>
                          <FileText color="#111827" size={20} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>{t("PWD & Support")}</Typography>
                      </Stack>
                      <Typography variant="body1" sx={{ color: '#334155', fontWeight: 700, fontSize: 14.5, lineHeight: 1.5 }}>
                        {t("Official APSRTC passenger support links for PWD bus passes, eligibility, grievances, live tracking and mobile apps.")}
                      </Typography>
                      <Grid container spacing={1.2}>
                        {supportTiles.map((link) => (
                          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={link.label}>
                            <Paper
                              component="a"
                              href={navHref(link)}
                              target={isOutboundLink(link) ? '_blank' : undefined}
                              rel={isOutboundLink(link) ? 'noopener noreferrer' : undefined}
                              elevation={0}
                              sx={{ 
                                display: 'grid', 
                                placeItems: 'center',
                                p: 1.3, 
                                borderRadius: '10px',
                                textAlign: 'center', 
                                bgcolor: '#ffffff', 
                                color: '#111827', 
                                border: '1px solid rgba(17, 24, 39, 0.15)', 
                                height: '100%',
                                transition: 'all 0.15s ease',
                                '&:hover': {
                                  bgcolor: 'rgba(230, 81, 0, 0.05)',
                                  borderColor: '#bf360c',
                                  color: '#bf360c'
                                }
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 900, lineHeight: 1.25 }}>{t(link.label)}</Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                      <Button 
                        component="a" 
                        href={navHref(mainNavigation.find((group) => group.label === 'Bus Pass')!.links[1])} 
                        variant="contained" 
                        sx={{ 
                          alignSelf: 'flex-start',
                          bgcolor: '#e65100',
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontWeight: 800,
                          px: 3,
                          '&:hover': { bgcolor: '#bf360c' }
                        }} 
                        endIcon={<ArrowUpRight />}
                      >
                        {t("View Eligibility")}
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              {/* Achievements & Notifications */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      border: '1px solid rgba(245, 183, 63, 0.45)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)',
                      background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)'
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(17, 24, 39, 0.08)', display: 'grid', placeItems: 'center' }}>
                        <Award color="#111827" size={20} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>{t("Achievements & Awards")}</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      {awardItems.map((award, index) => (
                        <Grid size={{xs: 12, sm: 6, md: 4}} key={award.label}>
                          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}>
                            <CardActionArea component="a" href={navHref({ label: award.label, href: award.href })} sx={{ height: '100%', borderRadius: '12px' }}>
                              <Paper
                                elevation={0}
                                sx={{
                                  overflow: 'hidden',
                                  minHeight: 210,
                                  bgcolor: '#ffffff',
                                  border: '1px solid rgba(245, 183, 63, 0.45)',
                                  borderRadius: '12px',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    boxShadow: '0 4px 15px rgba(245,183,63,0.1)',
                                    borderColor: '#bf360c'
                                  }
                                }}
                              >
                                <Box component="img" src={award.image} alt={award.label} sx={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                                <Typography variant="body2" sx={{ fontWeight: 900, p: 1.5, color: '#1e293b', fontSize: 13, lineHeight: 1.4 }}>{t(award.label)}</Typography>
                              </Paper>
                            </CardActionArea>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)', 
                      border: '1px solid rgba(245, 183, 63, 0.45)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)'
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(17, 24, 39, 0.08)', display: 'grid', placeItems: 'center' }}>
                        <Bell color="#111827" size={20} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>{t("Notifications")}</Typography>
                    </Stack>
                    <Stack spacing={1.25}>
                      {notificationLinks.map((notice) => (
                        <Paper
                          key={notice.label}
                          component="a"
                          href={navHref(notice)}
                          target={isOutboundLink(notice) ? '_blank' : undefined}
                          rel={isOutboundLink(notice) ? 'noopener noreferrer' : undefined}
                          elevation={0}
                          sx={{ 
                            display: 'block', 
                            p: 1.5, 
                            borderRadius: '12px',
                            bgcolor: '#ffffff',
                            border: '1px solid rgba(245, 183, 63, 0.45)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'rgba(191, 54, 12, 0.05)',
                              borderColor: '#bf360c',
                              transform: 'translateX(4px)'
                            }
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#334155', fontSize: 13, lineHeight: 1.35 }}>{t(notice.label)}</Typography>
                        </Paper>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              {/* Gallery & Coaches */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 3, md: 4 }, 
                  border: '1px solid rgba(245, 183, 63, 0.45)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)',
                  background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)'
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', mb: 3 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(17, 24, 39, 0.08)', display: 'grid', placeItems: 'center' }}>
                      <Clock3 color="#111827" size={20} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>{t("Official Gallery & Coaches")}</Typography>
                  </Stack>
                  <Button 
                    component="a" 
                    href={navHref(sideNavigation.find((group) => group.label === 'Coaches')!.links[1])} 
                    variant="outlined" 
                    endIcon={<ArrowUpRight />}
                    sx={{ 
                      borderRadius: '8px', 
                      color: '#111827', 
                      borderColor: '#111827',
                      fontWeight: 800,
                      '&:hover': { borderColor: '#e65100', color: '#e65100', bgcolor: 'rgba(191, 54, 12, 0.03)' }
                    }}
                  >
                    {t("Coach-wise Facilities")}
                  </Button>
                </Stack>
                <Grid container spacing={2.5}>
                  {galleryItems.map((coach) => (
                    <Grid size={{ xs: 12, md: 4 }} key={coach.name}>
                      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                        <Card sx={{ height: '100%', overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(245, 183, 63, 0.45)', bgcolor: '#ffffff' }}>
                          <CardActionArea component="a" href={coach.href} sx={{ height: '100%' }}>
                            <CardMedia component="img" image={coach.image} alt={coach.name} sx={{ height: 168, objectFit: 'cover', bgcolor: '#e9e2d5' }} />
                            <CardContent sx={{ p: 2 }}>
                              <Typography variant="h6" sx={{ fontWeight: 950, color: '#0f172a', fontSize: 16 }}>{t(coach.name)}</Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700, mt: 0.25 }}>{t(coach.type)}</Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Bottom Support App Tiles */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)', 
                      border: '1px solid rgba(245, 183, 63, 0.45)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)'
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(17, 24, 39, 0.08)', display: 'grid', placeItems: 'center' }}>
                        <QrCode color="#111827" size={20} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>{t("APSRTC Live Track QR")}</Typography>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ alignItems: 'center' }}>
                      <Box component="a" href={appLinks[2].href} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', p: 0.5, border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', bgcolor: '#fff', width: 120, height: 120, flexShrink: 0 }}>
                        <Box component="img" src={officialImages.liveTrackQr} alt="APSRTC LIVE TRACK QR" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#334155', fontSize: 14.5, lineHeight: 1.45 }}>{t("Scan, open the live tracking app, or jump to apsrtclivetrack.com for current service movement.")}</Typography>
                        <Button 
                          href={appLinks[2].href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          sx={{ 
                            mt: 1.5, 
                            borderRadius: '8px', 
                            bgcolor: '#bf360c', 
                            fontWeight: 800,
                            '&:hover': { bgcolor: '#e65100' }
                          }} 
                          variant="contained" 
                          color="primary" 
                          endIcon={<ArrowUpRight />}
                        >
                          {t("Open Tracking")}
                        </Button>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)', 
                      border: '1px solid rgba(245, 183, 63, 0.45)',
                      borderRadius: '16px',
                      boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)'
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(17, 24, 39, 0.08)', display: 'grid', placeItems: 'center' }}>
                        <Smartphone color="#111827" size={20} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827' }}>{t("Passenger App")}</Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ fontWeight: 800, mb: 2, color: '#334155', fontSize: 14.5, lineHeight: 1.45 }}>
                      {t("Mobile app shortcuts from the original portal are grouped here for faster Android and iOS access.")}
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}>
                      <Box component="a" href={appLinks[0].href} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', p: 0.5, border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', bgcolor: '#fff', width: 100, height: 100, flexShrink: 0, alignSelf: { xs: 'center', sm: 'auto' } }}>
                        <Box component="img" src={officialImages.passengerAppQr} alt="APSRTC PASSENGER APP QR" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                        <Button 
                          component="a" 
                          href={appLinks[0].href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          variant="outlined"
                          sx={{ 
                            borderRadius: '8px', 
                            color: '#111827', 
                            borderColor: '#111827',
                            fontWeight: 800,
                            '&:hover': { borderColor: '#e65100', color: '#e65100', bgcolor: 'rgba(191, 54, 12, 0.03)' }
                          }}
                        >
                          {t("Android App")}
                        </Button>
                        <Button 
                          component="a" 
                          href={appLinks[1].href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          variant="outlined"
                          sx={{ 
                            borderRadius: '8px', 
                            color: '#111827', 
                            borderColor: '#111827',
                            fontWeight: 800,
                            '&:hover': { borderColor: '#e65100', color: '#e65100', bgcolor: 'rgba(191, 54, 12, 0.03)' }
                          }}
                        >
                          {t("iOS App")}
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
