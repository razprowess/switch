import React, { useState } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';

import { Hamburger } from './Hamburger';
import { Search } from './Search';
import { AppTitle } from './AppTitle';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Messages, More, Notifications, UserAccount } from '../Actions';
import { DefaultMenu, MobileMenu } from './Menu';
 import logo from '../../assets/logo/switch.png';
interface HeaderProps {
  toggleNavigation: () => void;
}

export const Header = ({ toggleNavigation }: HeaderProps) => {
  const [isLogin, setIsLogin] =  useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const Navbar = isLogin ?
  ( 
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , py: 1}}>
<Toolbar disableGutters variant="dense">
  <Box sx={{mr: 2.5}}>
  <Hamburger toggleNavigation={toggleNavigation}/>
  </Box>
  <AppTitle variant="h5"/>
  <Search />
  <Box sx={{ flexGrow: 1 }} />
  <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
    <ThemeSwitcher />
    <Messages total={10} />
    <Notifications total={20} />
    <UserAccount onClick={handleProfileMenuOpen} />
  </Box>
  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
    <More onClick={handleMobileMenuOpen} />
  </Box>
</Toolbar>
</AppBar>
    
) :
(   
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , py: 1}}>
  <Toolbar disableGutters variant="dense">
    <Box sx={{ display: 'flex', width: '140px', height: '50px', marginLeft: '15px'}}><img src={logo} alt='nav logo' /></Box>
    <AppTitle variant="h5"/>
    <Box sx={{ flexGrow: 1 }} />
    <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
      <ThemeSwitcher />
      <UserAccount onClick={handleProfileMenuOpen} />
    </Box>
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <More onClick={handleMobileMenuOpen} />
    </Box>
  </Toolbar>
</AppBar>
)

  // , bgcolor: <"#ecb613">
  return (
    <>
      {Navbar}
      <MobileMenu
        isMenuOpen={Boolean(mobileMoreAnchorEl)}
        handleMenuOpen={handleMobileMenuOpen}
        handleMenuClose={handleMobileMenuClose}
        anchorEl={mobileMoreAnchorEl}
      />
      <DefaultMenu isMenuOpen={Boolean(anchorEl)} handleMenuClose={handleMenuClose} anchorEl={anchorEl} />
    </>
  );
};