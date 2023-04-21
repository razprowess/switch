   
import {
    Home as HomeIcon,
    BarChartOutlined as DashboardIcon,
    CodeOutlined as CodeIcon,
    GitHub as GitHubIcon,
    Public as PublicIcon,
    PublicOff as PrivateIcon,
    AccountBoxRounded as UserIcon,
    SettingsOutlined as SettingsIcon,
    ListAlt as ListIcon,
    CreditCard as BillingIcon,
    Person as ProfileIcon,
    PersonOutline as MentorIcon
  } from '@mui/icons-material';
  


  import { Home } from '../pages/Home';
  import { Signin } from '../pages/Signin';
  import { Route } from '../types/Route';
  import { Dashboard } from '../pages/Dashboard';
  import {Mentor} from '../pages/Mentor';
  import {Profile} from '../pages/Profile';
  import { Signup } from '../pages/Signup';
  
  const routes: Array<Route> = [
    {
      key: 'router-home',
      title: 'Home',
      description: 'Home',
      component: Home,
      path: '/',
      isEnabled: true,
      icon: HomeIcon,
    },
    {
      key: 'router-dashboard',
      description:'Dashboard',
      title: 'Dashboard',
      path: '/dashboard',
      component: Dashboard,
      isEnabled: true,
      icon: DashboardIcon,
      isAuthenticated: true,
  },
  {
    key: 'router-profile',
    title: 'Profile',
    description: 'user profile',
    component: Profile,
    path: '/profile',
    icon: ProfileIcon,
    isEnabled: true,
    isAuthenticated: true
  },
  {
    key: 'router-signin',
    title: 'Signin',
    description: 'sign in',
    component: Signin,
    path: '/login',
    icon: ProfileIcon,
    isEnabled: true,
    isAuthenticated: false,
    isSkip: true
  },
  {
    key: 'router-signup',
    title: 'Signup',
    description: 'sign up',
    component: Signup,
    path: '/signup',
    icon: ProfileIcon,
    isEnabled: true,
    isAuthenticated: false,
    isSkip: true
  },
    {
      key: 'router-mentor',
      title: 'Become Mentor',
      description: 'mentorship signup',
      component: Mentor,
      path: '/mentor',
      icon: MentorIcon,
      isEnabled: true,
      isAuthenticated: true
    },
    
    {
      key: 'router-user-profile',
      title: 'profile',
      description: 'user profile',
      component: Profile,
      path: '/:username',
      isEnabled: false,
      isAuthenticated: false,
      isSkip: true,
    },
    {
      key: 'router-gh',
      title: 'GitHub',
      description: 'GitHub',
      isEnabled: true,
      icon: GitHubIcon,
      subRoutes: [
        {
          key: 'router-gh-public',
          title: 'Public Repos',
          description: 'Public Repos',
          path: '/gh/public',
          isEnabled: true,
          icon: PublicIcon,
        },
        {
          key: 'router-gh-private',
          title: 'Private Repos',
          description: 'Private Repos',
          path: '/gh/private',
          isEnabled: false,
          icon: PrivateIcon,
        },
      ],
    },
    {
      key: 'router-code',
      title: 'Code Editor',
      description: 'Code Editor',
      path: '/code-editor',
      isEnabled: true,
      icon: CodeIcon,
      appendDivider: true,
    },
    {
      key: 'router-my-account',
      title: 'My Account',
      description: 'My Account',
      path: '/account',
      isEnabled: true,
      icon: UserIcon,
      subRoutes: [
        {
          key: 'router-settings',
          title: 'Settings',
          description: 'Account Settings',
          path: '/account/settings',
          isEnabled: true,
          icon: SettingsIcon,
        },
        {
          key: 'router-preferences',
          title: 'Preferences',
          description: 'Account Preferences',
          path: '/account/preferences',
          isEnabled: true,
          icon: ListIcon,
        },
        {
          key: 'router-billing',
          title: 'Billing',
          description: 'Account Billing',
          path: '/account/billing',
          isEnabled: true,
          icon: BillingIcon,
        },
      ],
    },
  ];
  
  export default routes;