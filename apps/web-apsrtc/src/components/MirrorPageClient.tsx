'use client';

import React from 'react';
import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';

type MirrorPage = {
  title: string;
  sourceUrl: string;
  path: string;
  html: string;
};

type Props = {
  page: MirrorPage;
  cleanedHtml: string;
};

export default function MirrorPageClient({ page, cleanedHtml }: Props) {
  const { t, language } = useLanguage();

  // Intelligently translate high-frequency dynamic tables/lists content on the fly
  const getTranslatedHtml = () => {
    if (language === 'te') {
      let html = cleanedHtml;
      // High-frequency terms translation on mirrored tables
      html = html
        .replace(/S\.No/gi, 'క్రమ సంఖ్య')
        .replace(/Serial No/gi, 'క్రమ సంఖ్య')
        .replace(/Name of the/gi, 'పేరు')
        .replace(/Designation/gi, 'హోదా / ఉద్యోగ బాధ్యత')
        .replace(/Contact Number/gi, 'ఫోన్ నంబర్')
        .replace(/Email/gi, 'ఈమెయిల్')
        .replace(/Office/gi, 'కార్యాలయం')
        .replace(/Address/gi, 'చిరునామా')
        .replace(/Status/gi, 'స్థితి')
        .replace(/Date/gi, 'తేదీ')
        .replace(/Download/gi, 'డౌన్‌లోడ్')
        .replace(/View/gi, 'చూడండి')
        .replace(/Click Here/gi, 'ఇక్కడ క్లిక్ చేయండి')
        .replace(/Description/gi, 'వివరణ')
        .replace(/Subject/gi, 'అంశం / విషయం')
        .replace(/Tender No/gi, 'టెండర్ నంబర్')
        .replace(/Particulars/gi, 'వివరాలు')
        .replace(/Qualification/gi, 'అర్హత')
        .replace(/Eligibility/gi, 'అర్హత')
        .replace(/Guidelines/gi, 'మార్గదర్శకాలు')
        .replace(/Circular/gi, 'సర్క్యులర్')
        .replace(/Note/gi, 'గమనిక')
        .replace(/Important/gi, 'ముఖ్యమైనది');
      return html;
    }
    return cleanedHtml;
  };

  return (
    <div suppressHydrationWarning style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header />
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Grid container spacing={3} columns={24}>
          <Grid size={{ xs: 24, md: 6, lg: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Sidebar />
          </Grid>
          <Grid size={{ xs: 24, md: 18, lg: 19 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                border: '1px solid rgba(245, 183, 63, 0.45)',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(245, 183, 63, 0.12)',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #fffdf5 0%, #fceacb 100%)'
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3 }}>
                <Box>
                  <Typography variant="h4" component="h1" sx={{ color: '#bf360c', fontWeight: 900 }}>
                    {t(page.title)}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button 
                    href="/" 
                    variant="outlined" 
                    startIcon={<ArrowLeft />}
                    sx={{
                      borderRadius: '8px',
                      color: '#bf360c',
                      borderColor: '#bf360c',
                      fontWeight: 800,
                      '&:hover': { borderColor: '#e65100', bgcolor: 'rgba(191,54,12,0.03)' }
                    }}
                  >
                    {t("Portal")}
                  </Button>
                </Stack>
              </Stack>
              <Box
                className="apsrtc-mirror-content"
                dangerouslySetInnerHTML={{ __html: getTranslatedHtml() }}
                sx={{
                  width: '100%',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  color: '#1e293b',
                  fontSize: 15,
                  lineHeight: 1.75,
                  '& h1, & h2, & h3': {
                    color: '#bf360c',
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  },
                  '& h1': { display: 'none' },
                  '& h2': { fontSize: { xs: 20, md: 25 }, margin: '22px 0 10px', fontWeight: 900 },
                  '& h3': { fontSize: { xs: 17, md: 21 }, margin: '18px 0 8px', fontWeight: 800 },
                  '& p': { margin: '0 0 12px' },
                  '& ul, & ol': { paddingLeft: { xs: 2.5, md: 4 }, margin: '0 0 14px' },
                  '& li': { marginBottom: 0.75 },
                  '& a': { color: '#bf360c', fontWeight: 850, textDecoration: 'underline', '&:hover': { color: '#e65100' } },
                  '& img': {
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto',
                    margin: '20px auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  },
                  '& marquee': {
                    display: 'block',
                    bgcolor: 'rgba(191, 54, 12, 0.04)',
                    borderLeft: '4px solid #bf360c',
                    color: '#1e293b',
                    p: 1.5,
                    borderRadius: '0 8px 8px 0',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    my: 2.5,
                  },
                  '& .apsrtc-center': {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    my: 2,
                  },
                   '& .apsrtc-layout-table': {
                     width: '100%',
                     borderCollapse: 'collapse',
                     border: 'none !important',
                     my: 2,
                     '& td': {
                       border: 'none !important',
                       padding: '12px',
                       verticalAlign: 'top',
                     }
                   },
                   '& .apsrtc-layout-cell': {
                     border: 'none !important',
                     padding: '12px',
                     verticalAlign: 'top',
                   },
                   '& .apsrtc-align-center': {
                     textAlign: 'center',
                     justifyContent: 'center',
                     '& img': {
                       margin: '20px auto',
                     }
                   },
                   '& .apsrtc-align-right': {
                     textAlign: 'right',
                   },
                   '& .apsrtc-align-justify': {
                     textAlign: 'justify',
                   },
                   '& .apsrtc-valign-top': {
                     verticalAlign: 'top !important',
                   },
                   '& .apsrtc-valign-middle': {
                     verticalAlign: 'middle !important',
                   },
                   '& .apsrtc-valign-bottom': {
                     verticalAlign: 'bottom !important',
                   },
                  '& .apsrtc-data-table': {
                    width: '100%',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                    my: 3,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    '& th': {
                      bgcolor: '#bf360c',
                      color: 'white',
                      fontWeight: 900,
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '14px 16px',
                      borderBottom: '2px solid rgba(0,0,0,0.1)',
                    },
                    '& td': {
                      padding: '12px 16px',
                      fontSize: '14.5px',
                      borderBottom: '1px solid rgba(0,0,0,0.05)',
                      bgcolor: '#ffffff',
                    },
                    '& tr:last-of-type td': {
                      borderBottom: 'none',
                    },
                    '& tr:nth-of-type(even) td': {
                      bgcolor: '#f8fafc',
                    },
                    '& tr:hover td': {
                      bgcolor: 'rgba(191, 54, 12, 0.03)',
                    }
                  },
                  '& hr': {
                    border: 0,
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    margin: '20px 0',
                  },
                  '& .red': { color: '#bf360c', fontWeight: 800 },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
