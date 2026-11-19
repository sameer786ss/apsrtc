'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d8393f',
      dark: '#b22c31',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#49a263',
      dark: '#317a49',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f5b73f',
      dark: '#d99a1e',
    },
    background: {
      default: '#f4f0e8',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2522',
      secondary: '#5f6a62',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 850,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h4: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h5: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 800,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 12px 32px rgba(42, 34, 24, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
