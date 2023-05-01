import { styled, Typography, Button, Slide, Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import './hero.css';
import { DARK_THEME_COLOR, LIGHT_MODE_THEME, LIGHT_THEME_COLOR } from '../../utils/constants';

export const Hero = () => {
  const [checked, setChecked] = React.useState(false);


  useEffect(() => {
    setChecked(true);
  }, [])

  return <GridContainer>
  <Grid container>
  <Grid item xs={12} sm={6} sx={(theme)=>({ display:'flex',  justifyContent: 'center', alignItems: 'center', my: {xs: theme.spacing(8)}})}>
  <Box style={{ textAlign: 'center' }} sx={(theme)=>({px: {xs: theme.spacing(3), sm: theme.spacing(10)}})}>
      <StyledHeroHeading variant='h2'>
        Be a guide to people's success
      </StyledHeroHeading>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit timeout={2000}>
          <Typography variant='body1' fontSize={'1.2em'} mb={5} sx={(theme=> ({color: theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR}))}>Learn from those who have done it before.</Typography>
          </Slide>
      <Button 
      href="/signup" 
      variant='contained' 
      size='large' 
      sx={{ py: 2, px: 5, m: 1, borderRadius: '34px', textTransform: 'none'}}> 
      <StyledButtonText>Join Now</StyledButtonText></Button>
    </Box>
</Grid>
<Grid item xs={12} sm={6}>
<Box style={{
    // background: "linear-gradient(rgb(40,0,72,0.8), rgb(192,72,72,0.8)), url('/hero-image-01.jpeg')",
    background: `url("/hero-image-01.jpeg")`,
    width: '100%',
    backgroundSize: 'cover',
    backgroundColor: '#cccccc',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: '10px'
  }}
  sx={{height: {xs: '300px', sm: '100vh'}}}
  >
    
    </Box>
</Grid>
  </Grid>
</GridContainer>
  

};


const StyledHeroHeading = styled(Typography)(({theme})=>`
  display: {
    xs: none;
    sm: block;
  }
  cursor: default;
  font-weight: bold;
  color: ${theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR };
  margin-bottom: 10px;
`);

const StyledButtonText = styled(Typography)`
font-family: Oxanium, cursive;
`
const GridContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    alignItems: "center",
  },
}));