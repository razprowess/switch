import { FC, useState, useContext, useEffect, useRef } from 'react';
import { styled, Box } from '@mui/material';

import { Navigation } from '../Navigation';
import { Header } from '../Header';
import { Footer } from '../Footer';

import { FOOTER_HEIGHT, LIGHT_MODE_THEME } from '../../utils/constants';
import { AuthContext } from '../../contexts/authContext';


export const Layout: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [hasClickOutide, setHasclickOutside] = useState(false);

  const toggleNavigation = () => setOpen((status) => !status);

  const closeNavigation = () => {
      setOpen(false);
      setHasclickOutside((status)=> !status);
  };

const { user } =  useContext(AuthContext);

const ref = useRef<HTMLDivElement | null>(null);
const headerRef = useRef<HTMLDivElement | null>(null);

useEffect(()=>{
  document.addEventListener('mousedown', handleClickOut);

  return ()=>{
    document.removeEventListener('mousedown', handleClickOut);
  }
},[]);

const handleClickOut = (event:any)=>{
  if(ref.current && headerRef.current && !headerRef.current.contains(event.target) && !ref.current.contains(event.target)){
    closeNavigation();
  }
}

return (
    <LayoutWrapper>
      <ContentWrapper>
        <Box component="header">
          <Header toggleNavigation={toggleNavigation} ref={headerRef} onClickOutside={hasClickOutide}/>
        </Box>
        {user && <Navigation open={open} handleClose={toggleNavigation} ref={ref}/>} 
         <Box component="main" sx={(theme)=>({ flexGrow: 1, p: 3, bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? '#f5f5f5': '#353534' })}> 
          <DrawerHeader />
           {children} 
        </Box> 
      </ContentWrapper>
      <Box component="footer">
        <Footer />
      </Box>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled('div')`
  min-height: 100vh;
`;

const ContentWrapper = styled('div')`
  display: flex;
  min-height: calc(100vh - ${FOOTER_HEIGHT}px);
`;

const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));