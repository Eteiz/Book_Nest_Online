import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Web application palette
// https://coolors.co/f3f9ff-93c9ff-2c96ff-000911-492900
const primaryMain = '#F3F9FF';
const primaryDark = '#000911';
const primaryLight = '#636363';
const secondaryMain = '#2C96FF';
const secondaryLight = '#93C9FF';
const tertiaryMain = '#492900';

export const webTheme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      dark: primaryDark,
      light: primaryLight,
    },
    secondary: {
      main: secondaryMain,
      light: secondaryLight,
    },
    tertiary: {
      main: tertiaryMain,
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: secondaryMain,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: secondaryMain,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: secondaryMain,
          },
        },
      },
    },
    // <Typography>
    MuiTypography: {
      styleOverrides: {
        // All instances
        root: {
          fontFamily: 'Segoe UI',
        },
        h2: {
          fontSize: 40,
          color: secondaryMain,
          fontWeight: 700,
        },
        h3: {
          fontSize: 25,
          color: secondaryMain,
          fontWeight: 700,
        },
        h4: {
          fontSize: 20,
          color: secondaryMain,
          fontWeight: 600,
        },
        h5: {
          fontSize: 16,
          color: secondaryMain,
          fontWeight: 500,
        },
        subtitle2: {
          color: primaryLight,
        },
        body2: {
          color: primaryLight,
        },
      },
    },
    // <Link>
    MuiLink: {
      styleOverrides: {
        // All instances
        root: {
          color: secondaryMain,
          fontFamily: 'Segoe UI',
          fontWeight: 600,
        },
      },
    },
    // <Checkbox>
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: secondaryMain,
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={webTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
);

export default webTheme;
