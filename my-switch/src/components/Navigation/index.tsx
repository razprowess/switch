import React from 'react';
import { Drawer as MuiDrawer, styled } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Routes } from './Routes';
import { navClosedMixin, navOpenedMixin } from '../../styles/mixins';

interface NavigationProps {
  open: boolean | undefined;
  handleClose: () => void;
}

export type Ref = HTMLDivElement | null;
export const Navigation = React.forwardRef<Ref, NavigationProps>((props, ref) => {
  const { open, handleClose } = props;
  return (
    <Drawer variant="permanent" open={open} onClose={handleClose} ref={ref} sx={{position: {xs: 'fixed', sm: 'relative'}}}>
      <DrawerHeader />
      <Routes />
    </Drawer>
  );
});

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar, useStyles
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  zIndex: 2,
  position: 'relative',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...navOpenedMixin(theme),
    '& .MuiDrawer-paper': navOpenedMixin(theme),
  }),
  ...(!open && {
    ...navClosedMixin(theme),
    '& .MuiDrawer-paper': navClosedMixin(theme),
  }),
}));

const useStyles = makeStyles((theme: any) => ({
  paper: {
    backgroundColor: 'yellow',
  },
}));