import { styled, Typography, Button, Slide } from '@mui/material';
import React, { useEffect } from 'react';
import './hero.css';

export const Hero = () => {
  const [checked, setChecked] = React.useState(false);


  useEffect(() => {
    setChecked(true);
  }, [])

  return <section style={{
    background: "linear-gradient(rgb(40,0,72,0.8), rgb(192,72,72,0.8)), url('/hero-image-01.jpeg')",
    width: '100%', height: '100vh',
    backgroundSize: 'cover',
    backgroundColor: '#cccccc',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  }}>
    <div style={{ textAlign: 'center' }}>
      <StyledHeroHeading variant='h2'>
        Be a guide to people's success
      </StyledHeroHeading>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit timeout={2000}>
          <Typography variant='h5' className='hero-description' mb={5}>Learn from those who have done it before</Typography>
          </Slide>
      <Button 
      href="/signup" 
      variant='contained' 
      size='large' 
      sx={{ py: 2, px: '2rem', m: 1, borderRadius: 0, textTransform: 'none'}}> 
      <StyledButtonText>Join Now</StyledButtonText></Button>
    </div>
  </section>

};


const StyledHeroHeading = styled(Typography)`
  display: {
    xs: none;
    sm: block;
  }
  cursor: default;
  font-weight: bold;
  color: #6795de;
  margin-bottom: 10px;
`;

const StyledButtonText = styled(Typography)`
font-family: Oxanium, cursive;
font-size: 1.5em;
`
