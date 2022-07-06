

import { createTheme, responsiveFontSizes } from '@mui/material';

import { DARK_MODE_THEME, LIGHT_MODE_THEME } from '../utils/constants';
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME) => {

  
  const lightTheme = {
  }

  const darkTheme = {
    components:{
      MuiAppBar:{
        styleOverrides:{
          root:{
            backgroundColor: '#ecb613',
            color: '#000000'
          }
        }
      },
      MuiButton: {
        variants: [
          {
            props: { variant: 'dashed' },
            style: {
              textTransform: 'none',
              borderRadius: '30px',
              paddingTop: '15px',
              paddingBottom: '15px',
            },
          },
          {
            props: { variant: 'dashed', color: 'secondary' },
            style: {
              borderRadius: '10px',
              paddingTop: '15px',
              paddingBottom: '15px', 
            },
          },
        ],
      },
    }
  }

  const mainTheme = mode === 'light' ?  lightTheme : darkTheme

  let theme = createTheme({
    ...mainTheme,
    palette: {
      mode,
      ...(mainTheme as any).palette || {},
    },
  });

theme = responsiveFontSizes(theme);
  
  return theme;
};

