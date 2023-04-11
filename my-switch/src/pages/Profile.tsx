import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import myimage from '../assets/images/abdulrazak.jpg';
import { styled } from '@mui/material';

export function Profile() {
//a placeholder variable for image 
const [hasImg, setHasImg] = React.useState(false);
  return (
    <>
    <GridContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          {hasImg ? <Avatar alt="abdulrazak lawal" src={myimage} sx={(theme) => ({ width: theme.spacing(25), height: theme.spacing(25), marginBottom: theme.spacing(2)})}/> :
          <Avatar sx={(theme) => ({ width: theme.spacing(25), height: theme.spacing(25), marginBottom: theme.spacing(4)})}>JD</Avatar>}
        </Grid>
        <Grid item xs={12} sm={9}>
          <Card elevation={3} sx={(theme) => ({ marginBottom: theme.spacing(4), paddingLeft: theme.spacing(4)})} key={'info'}>
          <Typography sx={{ fontSize: 18, marginTop: '10px' }} color="text.secondary" gutterBottom >
                Welcome,
            </Typography>
            <Typography variant="h4" sx={(theme) => ({ fontWeight: 'bold', marginBottom: theme.spacing(2)})} key={'name'}>
              John Doe
            </Typography>
            <Typography variant="body1" sx={(theme) => ({ marginBottom: theme.spacing(4)})} key={'bio'}>
            I'm a self-taught full-stack engineer based in Abuja, Nigeria.
                I am a team player looking to join an extraordinary team of people building the next cool thing.
                I am a team player looking to join an extraordinary team of people building the next cool thing.
                I am a team player looking to join an extraordinary team of people building the next cool thing.
            </Typography>
            <Typography variant="body1"  sx={(theme) => ({ marginBottom: theme.spacing(4)})} key={'info'}>
              <strong>Area of Specialization:</strong> Clinical Pharmacy
            </Typography>
            <Typography variant="body1" sx={(theme) => ({ marginBottom: theme.spacing(4)})} key={'info'}>
              <strong>Year of Experience:</strong> 5
            </Typography>
            <Typography variant="body1" sx={(theme) => ({ marginBottom: theme.spacing(4)})} key={'info'}>
              <strong>Address:</strong> 123 Main St, Anytown USA
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </GridContainer>
    </>
  );
}

const GridContainer = styled(Box)(({theme})=>({
  flexGrow: 1,
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
}))
