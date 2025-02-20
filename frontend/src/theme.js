import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2', 
    },
    secondary: {
      main: '#FF6B6B', 
    },
    background: {
      default: '#F5F7FA', 
      paper: '#FFFFFF', 
    },
    text: {
      primary: '#333333', 
    }
  },
  typography: {
    fontFamily: "Helvetica",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
