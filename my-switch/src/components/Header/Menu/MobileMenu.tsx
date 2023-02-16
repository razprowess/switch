import React, { useContext } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { Messages, Notifications, SignOut, Settings, SignUp } from '../../Actions';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ThemeModeContext } from '../../../contexts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';
import { JwtPayload } from "jwt-decode";

interface MobileMenuProps {
  isMenuOpen: boolean;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
  user?: JwtPayload | null
}

export const MobileMenu = ({ isMenuOpen, handleMenuOpen, handleMenuClose, anchorEl, user }: MobileMenuProps) => {
  const { toggleThemeMode } = useContext(ThemeModeContext);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const onLogout = () => {
    handleMenuClose()
    logout();
    navigate('/');
  }

  const handleSignup = () => {
    handleMenuClose();
    navigate('/signup')
  }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ textAlign: 'center' }}>
        {user ?
          <>
            <MenuItem onClick={toggleThemeMode}>
              <ThemeSwitcher disableTooltip />
              Toggle Theme
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Messages total={15} disableTooltip />
              Messages
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Notifications total={20} disableTooltip />
              Notifications
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings disableTooltip />
              Settings
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <SignOut disableTooltip onClick={() => alert('Signing out...')} />
              Sign Out
            </MenuItem>
          </>
          :
          <MenuItem onClick={handleSignup}>
            <SignUp disableTooltip />
            Sign Up
          </MenuItem>
        }
      </Box>
    </Menu>
  );
};