   
import {
    Home as HomeIcon,
    BarChartOutlined as DashboardIcon,
    AccountBoxRounded as UserIcon,
    SettingsOutlined as SettingsIcon,
    ListAlt as ListIcon,
    CreditCard as BillingIcon,
    Person as ProfileIcon,
    PersonOutline as MentorIcon,
    NotificationsNone as NotificationsNoneIcon
  } from '@mui/icons-material';
  // import {  Notifications } from '../components/Actions/index'


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
      isSkip: true
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
    key: 'router-notification',
    title: 'Notification',
    description: 'Notification',
    component: Home,
    path: '/notification',
    isEnabled: true,
    icon: NotificationsNoneIcon,
    isAuthenticated: true,
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