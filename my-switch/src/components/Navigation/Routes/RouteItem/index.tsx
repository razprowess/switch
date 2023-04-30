import React, { ComponentType } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon, IconButton, lighten, ListItemButton, ListItemIcon, ListItemText, styled, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { Route } from '../../../../types';
import { DARK_THEME_COLOR, LIGHT_MODE_THEME, LIGHT_THEME_COLOR } from '../../../../utils/constants';

interface RouteItemProps {
  route: Route;
  nested?: boolean;
  hasChildren?: boolean;
  handleMenuClick?: (route: Route) => void;
}

export const RouteItem = ({
  route,
  nested = false,
  hasChildren = false,
  handleMenuClick = () => {},
}: RouteItemProps) => {
  const location = useLocation();

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!route.isEnabled || hasChildren) e.preventDefault();
  };

  const isSelected =
    location.pathname === route.path || (hasChildren && route.subRoutes?.some((e) => location.pathname === e.path));
  const item = (
    <StyledListItemButton
      isEnabled={route.isEnabled}
      sx={{ pl: nested ? 3 : 1 }}
      onClick={() => handleMenuClick(route)}
    >
      <ListItemIcon>
        <StyledIconButton size="small" isSelected={location.pathname === route.path}>
          {route.icon && <StyledIcon component={route.icon} isSelected={isSelected || false} sx={(theme)=>({color: theme.palette.mode
          === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR})}/>}
        </StyledIconButton>
      </ListItemIcon>
      <ListItemText primary={route.title} />
      {hasChildren && (route.expanded ? <ExpandLess /> : <ExpandMore />)}
    </StyledListItemButton>
  );

  return (
    <StyledNavLink to={`${route.path}`} key={route.key} onClick={handleNavigate}>
      {route.description ? (
        <Tooltip title={`${route.description}${!route.isEnabled ? ' (Not Allowed)' : ''}`} placement="right">
          {item}
        </Tooltip>
      ) : (
        item
      )}
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const StyledListItemButton = styled(ListItemButton)<{ isEnabled: boolean }>(({ theme, isEnabled }) =>
  !isEnabled ? { '*': { cursor: 'not-allowed', color: theme.palette.text.secondary } } : {}
);

const StyledIconButton = styled(IconButton)<{ isSelected: boolean }>(({ isSelected, theme }) => ({
  boxShadow: isSelected && theme.palette.mode === LIGHT_MODE_THEME ? `0 0 0 2px ${lighten(LIGHT_THEME_COLOR, 0.6)}` : isSelected && theme.palette.mode !== LIGHT_MODE_THEME ? `0 0 0 2px ${lighten(DARK_THEME_COLOR, 0.6)}` : 'default',
  transition: 'box-shadow 0.1s',
}));

const StyledIcon = styled(Icon)<{ isSelected: boolean; component: ComponentType<{}> }>`
  ${({ isSelected, theme }) => isSelected &&  `color: ${theme.palette.primary.main};`}
`;