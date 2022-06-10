import { styled, Typography } from '@mui/material';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

import logo from '../logo.svg';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import { Module } from '../components/Module';
import { Hero } from '../components/Hero';

export const Home = () => {
  const context = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <Module marginTop='-25px'>
        <Hero/>
      </Module>
      <Typography variant="h4">{`Hello, ${context.user.name} 🎃`}</Typography>
      <LogoWrapper>
        <StyledLogo src={logo} alt="logo" />
      </LogoWrapper>
      <h1>Hello world</h1>
      <p>We could spend days or even months only talking about TypeScript and React,
       guys. There is plenty to explore, learn, and practice. My intention when 
       building this starter application is to cover some basic topics, save us some 
       time on future posts' exercises, and provide you, followers, with a step ahead 
       when starting your own apps. Hopefully, it'll be a mission accomplished 😃
      If I may suggest to you what is next, it would be...practice practice practice! 
      Start React TypeScript applications from scratch, explore the long list of 
      components on the Material-UI web page, and combine them, play with the React router.
       The possibilities are many, and it only depends on you to crush them!</p>
       <Module background='orange'> 
       <p>We could spend days or even months only talking about TypeScript and React,
       guys. There is plenty to explore, learn, and practice. My intention when 
       building this starter application is to cover some basic topics, save us some 
       time on future posts' exercises, and provide you, followers, with a step ahead 
       when starting your own apps. Hopefully, it'll be a mission accomplished 😃
      If I may suggest to you what is next, it would be...practice practice practice! 
      Start React TypeScript applications from scratch, explore the long list of 
      components on the Material-UI web page, and combine them, play with the React router.
       The possibilities are many, and it only depends on you to crush them!</p>

         </Module>
    </>
  );
};

const LogoWrapper = styled('div')`
  text-align: center;
  margin-top: 6rem;
`;

const StyledLogo = styled('img')`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 15s linear;
  }
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;