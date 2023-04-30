import { useContext } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, IconButton, styled } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { AuthContext } from '../../../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { DARK_THEME_COLOR, LIGHT_MODE_THEME, LIGHT_THEME_COLOR } from '../../../../utils/constants';

export const SignOutRoute = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  }
  return (
    <StyledListItemButton onClick={onLogout}>
      <ListItemIcon>
        <IconButton size="small">
          <ExitToApp sx={(theme)=>({color: theme.palette.mode
          === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR})} />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary="Sign Out"  sx={(theme)=>({color: theme.palette.mode
          === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR})}/>
    </StyledListItemButton>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;