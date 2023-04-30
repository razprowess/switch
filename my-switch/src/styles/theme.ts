

import { createTheme, responsiveFontSizes, alpha } from '@mui/material';
import { BLACK_COLOR, DARK_MODE_THEME, LIGHT_HOVER, LIGHT_MODE_THEME, LIGHT_THEME_COLOR, WHITE_COLOR } from '../utils/constants';


declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME) => {

  
  const lightTheme = {
    components: {
      MuiButton: {
        styleOverrides: {
          // @ts-ignore
          root: ({ ownerState }) => (
           [
            {
              ...(ownerState.variant === 'contained' &&
                  {
                  backgroundColor: LIGHT_THEME_COLOR,
                  color: WHITE_COLOR,
                  '&:hover':{
                    backgroundColor: LIGHT_HOVER
                  }
                }),
            },
            {
              ...(ownerState.variant === 'text' &&
                  {
                  backgroundColor: 'inherit',
                  color: LIGHT_THEME_COLOR,
                  borderRadius: '30px',
                  '&:hover':{
                    backgroundColor: alpha(LIGHT_HOVER, 0.05),
                    borderRadius: '30px'
                  }
                }),
            }
           ]
          ),
        },
      },
      MuiAppBar:{
        styleOverrides:{
          root:{
            backgroundColor: WHITE_COLOR,
            color: LIGHT_THEME_COLOR
          }
        }
      },

      MuiList:{
        styleOverrides:{
          root:{
            backgroundColor: WHITE_COLOR,
            color: LIGHT_THEME_COLOR
          }
        }
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: WHITE_COLOR
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            color: WHITE_COLOR
          }
        }
      },
      
    },
  }

  const darkTheme = {
    palette: {background: {
      default:  '#343434',
      paper: '#343434'}
    },

    components:{
      MuiList:{
        styleOverrides:{
          root:{
            backgroundColor: '#000000',
            color: WHITE_COLOR
          }
        }
      },
      MuiAppBar:{
        styleOverrides:{
          root:{
            backgroundColor: '#080404',
            color: WHITE_COLOR
          }
        }
      },

      MuiButton: {
        styleOverrides: {
          // @ts-ignore
          root: ({ ownerState }) => (
          [
            {
              ...(ownerState.variant === 'contained' &&
                 {
                  backgroundColor: '#171718',
                  color: '#fff',
                  '&:hover':{
                    backgroundColor: '#585454'
                  }
                }),
            },
            {
              ...(ownerState.variant === 'text' &&
                  {
                  backgroundColor: 'inherit',
                  color: WHITE_COLOR,
                  borderRadius: '30px',
                  '&:hover':{
                    backgroundColor: alpha('#585454', 0.15),
                    borderRadius: '30px'
                  }
                }),
            }
          ]),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: BLACK_COLOR,
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          root:{
            color: 'grey'
          }
        }
      },
  },
}

  const mainTheme = mode === 'light' ?  lightTheme : darkTheme;

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

