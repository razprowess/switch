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
    alignItems: 'center'
  }}>
    <div style={{ textAlign: 'center' }}>
      <StyledHeroHeading variant='h2'>
        Be a guide to people's success.
      </StyledHeroHeading>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit timeout={2000}>
          <Typography paragraph className='hero-description'>Learn from those who have done it before to avoid the mistake they went through
        Learn from those who have done it before to avoid the mistake they went through
        Learn from those who have done it before to avoid the mistake they went through</Typography>
          </Slide>
      <Button href="#text-buttons" variant='contained' size='large' sx={{ py: 2, px: '2rem', m: 1, borderRadius: 7, textTransform: 'none' }}>Learn More</Button>
    </div>
  </section>

};


const StyledHeroHeading = styled(Typography)`
  display: {
    xs: none;
    sm: block;
  }
  cursor: default;
  margin-left: 40px;
  font-weight: bold;
  color: #6795de;
  margin-bottom: 10px;
`;

