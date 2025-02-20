
import { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppContext, ThemeModeContext } from './contexts';
import { AppClient } from './clients';
import { routes } from './config';
import "react-toastify/dist/ReactToastify.css";
import { Route as AppRoute } from './types';
import { getAppTheme } from './styles/theme';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from './utils/constants';
import {ApolloProvider} from '@apollo/client';
import client from './apolloClient';
import {AuthProvider} from './contexts/authContext'
import { AddRoute } from './services/addRoute';
import NotFound from './components/Layout/NotFound';
import { ToastContainer } from "react-toastify";


function App() {
  const [mode, setMode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(LIGHT_MODE_THEME);
  const appClient = new AppClient();

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME));
      },
    }),
    []
  );

  const theme = useMemo(() => getAppTheme(mode), [mode]);


  return (
    <AuthProvider>
    <ApolloProvider client={client}>
    <AppContext.Provider value={appClient}>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                {routes.map((route: AppRoute) => 
                  route.subRoutes ? route.subRoutes.map((item: AppRoute) => AddRoute(item)) : AddRoute(route)
                )}
               <Route key='unknown' path='*' element={<NotFound/>} />
              </Routes>
              <ToastContainer />
            </Layout>
          </Router>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </AppContext.Provider>
    </ApolloProvider>
    </AuthProvider>
  );
}

export default App;