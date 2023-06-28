import { useContext } from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { AuthContext } from '../../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { JwtPayload } from "jwt-decode";
import { Settings, SignOut, SignUp, Profile } from '../../Actions';
interface DefaultMenuProps {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
  user?: JwtPayload | null
}

export const DefaultMenu = ({ isMenuOpen, handleMenuClose, anchorEl, user }: DefaultMenuProps) => {

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const onLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  }

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  }

  const handleSignup = () => {
    handleMenuClose();
    navigate('/signup')
  }

  const handleSignin = () => {
    handleMenuClose();
    navigate('/login');
  }

  return (<Menu anchorEl={anchorEl} id="primary-search-account-menu" keepMounted open={isMenuOpen} onClose={handleMenuClose}>
    {user ?
      <>
        <MenuItem onClick={handleProfile}>
          <Profile disableTooltip />
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Settings disableTooltip />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogout}>
          <SignOut disableTooltip />
          Sign Out
        </MenuItem>
      </>
      :
      <>
      <MenuItem onClick={handleSignup}>
        <SignUp disableTooltip />
        Sign Up
      </MenuItem>
            <MenuItem onClick={handleSignin}>
            <SignUp disableTooltip />
            Log In
          </MenuItem>
          </>
    }
  </Menu>)
};