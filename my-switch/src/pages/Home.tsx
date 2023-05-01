import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { APP_TITLE, BLACK_COLOR, DARK_THEME_COLOR, LIGHT_MODE_THEME, LIGHT_THEME_COLOR, PAGE_TITLE_HOME, WHITE_COLOR } from '../utils/constants';
import { Module } from '../components/Module';
import { Hero } from '../components/Hero';
import AlertDialogue from '../components/AlertDialogue';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const Home = () => {

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <Module marginTop='-25px'>
        <Hero />
        <AlertDialogue />
      </Module>
      <PageContent />
    </>
  );
};

// const LogoWrapper = styled('div')`
//   text-align: center;
//   margin-top: 6rem;
// `;

const PageContent = () => {

  return (
    <Box sx={(theme) => ({ flexGrow: 1, bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR, marginTop: '-100px' })}>
      <Grid container justifyContent='center' spacing={8}>
        <Grid item xs={12} md={3.5}>
          <Typography variant='h5' mb={2} sx={(theme) => ({ color: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR })}> Descriptive</Typography>
          <Typography variant='body1' sx={(theme) => ({ color: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR })}>
            React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
            <span><br /></span><span><br /></span>
            Declarative views make your code more predictable and easier to debug
          </Typography>

        </Grid>
        <Grid item xs={12} md={3.5}>
          <Typography variant='h5' mb={2} sx={(theme) => ({ color: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR })}> Descriptive</Typography>
          <Typography variant='body1' sx={(theme) => ({ color: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR })}>
            Build encapsulated components that manage their own state, then compose them to make complex UIs.
            <span><br /></span><span><br /></span>

            Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
          </Typography>

        </Grid>
        <Grid item xs={12} md={3.5}>
          <Typography variant='h5' mb={2} sx={(theme) => ({ color: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR })}> Descriptive</Typography>
          <Typography variant='body1' sx={(theme) => ({ color: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR })}>
            We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.
            <span><br /></span><span><br /></span>
            React can also render on the server using Node and power mobile apps using...
          </Typography>

        </Grid>
      </Grid>
    </Box>
  )

}
