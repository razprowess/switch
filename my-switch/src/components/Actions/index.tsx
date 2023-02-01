import React from 'react';
import {
  MoreVert as MoreIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Fingerprint as FingerprintIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Login as SignupIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';

import { ActionItem } from './ActionItem';

interface ActionProps {
  total?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disableTooltip?: boolean;
}

export const Messages = ({ total, onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem
    title="My Messages"
    icon={MailIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
  />
);

export const More = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem title="More" icon={MoreIcon} onClick={onClick} disableTooltip={disableTooltip} />
);

export const Notifications = ({ total, onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem
    title="Notifications"
    icon={NotificationsIcon}
    onClick={onClick}
    badgeContent={total}
    disableTooltip={disableTooltip}
  />
);

export const UserAccount = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem title="My Account" icon={FingerprintIcon} onClick={onClick} disableTooltip={disableTooltip} />
);

export const SignOut = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem title="Sign Out" icon={LogoutIcon} onClick={onClick} disableTooltip={disableTooltip} />
);

export const SignUp = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem title="Sign Up" icon={SignupIcon} onClick={onClick} disableTooltip={disableTooltip} />
);

export const Settings = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem title="Settings" icon={SettingsIcon} onClick={onClick} disableTooltip={disableTooltip} />
);

export const Profile = ({ onClick, disableTooltip = false }: ActionProps) => (
  <ActionItem title="Profile" icon={ProfileIcon} onClick={onClick} disableTooltip={disableTooltip} />
);