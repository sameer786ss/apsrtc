'use client';

import React from 'react';
import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { Mail, MapPin, PhoneCall, Share2 } from 'lucide-react';
import { footerLinks, isOutboundLink, navHref, officialImages, officialBase, toLocalOfficialHref } from '@/data/apsrtc';

export default function Footer() {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #fffbf2 0%, #fdf0d8 45%, #fadfae 85%, #f7d49b 100%)', color: '#111827', mt: 'auto', borderTop: '1.5px solid rgba(245, 183, 63, 0.45)' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 950, mb: 1, color: '#111827' }}>APSRTC</Typography>
            <Typography variant="body2" sx={{ color: '#475569', maxWidth: 560, fontWeight: 700 }}>
              RTC HOUSE, 1st Floor NTR administration Block, Pandit Nehru Bus Station in Vijayawada-520013.
              The bus station is owned by Andhra Pradesh State Road Transport Corporation.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack spacing={1.2}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <PhoneCall size={18} color="#bf360c" />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#111827' }}>Call Center: 149</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <PhoneCall size={18} color="#bf360c" />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#111827' }}>Logistics: 0866-2570005</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Mail size={18} color="#bf360c" />
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#111827' }}>logistics@apsrtc.ap.gov.in</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              {footerLinks.map((link) => (
                <Button
                  key={link.label}
                  component="a"
                  href={navHref(link)}
                  target={isOutboundLink(link) ? '_blank' : undefined}
                  rel={isOutboundLink(link) ? 'noopener noreferrer' : undefined}
                  color="inherit"
                  size="small"
                  sx={{ 
                    border: '1px solid rgba(17, 24, 39, 0.18)', 
                    fontWeight: 800,
                    fontSize: 12,
                    '&:hover': { bgcolor: 'rgba(191, 54, 12, 0.05)', color: '#bf360c', borderColor: '#bf360c' } 
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button component="a" href={toLocalOfficialHref(`${officialBase}/Corporate_Office.php`)} color="inherit" size="small" sx={{ border: '1px solid rgba(17, 24, 39, 0.18)', fontWeight: 800, fontSize: 12, '&:hover': { bgcolor: 'rgba(191, 54, 12, 0.05)', color: '#bf360c', borderColor: '#bf360c' } }}>Contact Us</Button>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ mt: 2.5, alignItems: 'center' }}>
              <MapPin size={18} color="#bf360c" />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 800 }}>Vijayawada, Andhra Pradesh</Typography>
              <Button component="a" href="https://www.facebook.com/apsrtc" target="_blank" rel="noopener noreferrer" color="inherit" size="small" sx={{ minWidth: 0, p: 0.25 }}>
                <Box component="img" src={officialImages.facebook} alt="APSRTC on Facebook" sx={{ width: 24, height: 24, objectFit: 'contain' }} />
              </Button>
              <Button component="a" href="https://twitter.com/apsrtc" target="_blank" rel="noopener noreferrer" color="inherit" size="small" sx={{ minWidth: 0, p: 0.25 }}>
                <Box component="img" src={officialImages.twitter} alt="APSRTC on Twitter" sx={{ width: 24, height: 24, objectFit: 'contain' }} />
              </Button>
              <Share2 size={18} color="#bf360c" />
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, borderColor: 'rgba(17, 24, 39, 0.12)' }} />
        <Typography variant="body2" suppressHydrationWarning sx={{ color: '#475569', textAlign: 'center', fontWeight: 700 }}>
          Copyright &copy; 2012-{new Date().getFullYear()} APSRTC, All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
