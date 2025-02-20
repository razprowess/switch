import React, { useContext, useState } from 'react';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import { Hamburger } from './Hamburger';
import { Search } from './Search';
import { AppTitle } from './AppTitle';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Messages, More, Notifications, UserAccount, Message } from '../Actions';
import { DefaultMenu, MobileMenu } from './Menu';
// import logo from '../../assets/logo/switch.png';
import logo from '../../assets/logo/Logos.png';
import { AuthContext } from '../../contexts/authContext';
import { styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useIsMobile from '../../hooks/useIsMobile';
import { HEADER_HEIGHT } from '../../utils/constants';
import { GET_PROFILE_DETAIL } from '../../types/graphSchema';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleNavigation: () => void;
  onClickOutside: boolean;
}
export type Ref = HTMLDivElement | null;

export const Header = React.forwardRef<Ref, HeaderProps>((props, ref) => {
  const { toggleNavigation, onClickOutside } = props;
  const [isIconClick, setIsIconClick] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [logoSrc, setLogoSrc] = useState("");

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { data } = useQuery(GET_PROFILE_DETAIL, {
    onCompleted(data) {
      setLogoSrc(data.getProfileInfo.imgurl);
    }
  });


  const isMobile = useIsMobile();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const handleIconClick = () => {
    setIsIconClick(true);
  }

  const handleMessageIconClick = () => {
    //display the message interface
  }

  const handleIconClose = () => {
    if (isIconClick) {
      setIsIconClick(false);
    }
  }
  const capitalizedFirstLetter = (str: string) => {
    return str[0].toUpperCase();
  }

  const Navbar = user ?
    (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, py: 1 }}>
        <Toolbar disableGutters variant="dense" sx={{ height: HEADER_HEIGHT, paddingLeft: { sm: '52px' }, paddingRight: { sm: '52px' } }}>
          {isIconClick && isMobile ? null : <>
            {isMobile && !isHomePage && <Box sx={{ mr: 2.5 }} ref={ref}>
              <Hamburger toggleNavigation={toggleNavigation} onClickOutside={onClickOutside} />
            </Box>}
            {isHomePage ? <Box sx={{ display: 'flex', width: '140px', height: '50px', marginLeft: '15px' }}><img src={logo} alt='nav logo' /></Box>
              : <AppTitle variant="h5" />
            }          </>}

          {!isHomePage && <Search isIconClick={isIconClick} handleIconclose={handleIconClose} />}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            <ThemeSwitcher />
            {!isHomePage && <>
              <Messages total={10} />
              <Notifications total={20} />
            </>
            }
            <IconButton onClick={handleProfileMenuOpen} sx={{ mx: 2 }}>
              {logoSrc ? <Avatar alt="Remy Sharp" src={logoSrc} /> : <Avatar alt={capitalizedFirstLetter(data?.getProfileInfo?.firstname || 'avatar')} src="/static/images/avatar/2.jpg" />}
            </IconButton>
          </Box>
          {isIconClick ? null : <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {!isHomePage && <><SearchIconWrapper onClick={handleIconClick}>
              <SearchIcon />
            </SearchIconWrapper><MessageIconWrapper onClick={handleMessageIconClick}>
                <Message total={10} />
              </MessageIconWrapper></>}
            <More onClick={handleMobileMenuOpen} />
          </Box>}
        </Toolbar>
      </AppBar>

    ) :
    (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, py: 1 }}>
        <Toolbar disableGutters variant="dense" sx={{ height: HEADER_HEIGHT, paddingLeft: { sm: '52px' }, paddingRight: { sm: '52px' } }}>
          <Box sx={{ display: 'flex', width: '140px', height: '50px', marginLeft: '15px' }}><img src={logo} alt='nav logo' /></Box>
          <AppTitle variant="h5" />
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

  return (
    <>
      {Navbar}
      <MobileMenu
        isMenuOpen={Boolean(mobileMoreAnchorEl)}
        handleMenuOpen={handleMobileMenuOpen}
        handleMenuClose={handleMobileMenuClose}
        anchorEl={mobileMoreAnchorEl}
        user={user}
      />
      <DefaultMenu isMenuOpen={Boolean(anchorEl)} handleMenuClose={handleMenuClose} anchorEl={anchorEl} user={user} />
    </>
  );
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  paddingRight: theme.spacing(2),
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  },
}));


const MessageIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  },
}));