import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import myimage from '../assets/images/abdulrazak.jpg';


export const Profile = () => {
    return (
        <>
            <Grid container spacing={2} justifyContent='space-around'>
                <Grid item xs={12} md={2}>
                    <Card sx={{ minWidth: 275}}>
                        <CardContent sx={{paddingLeft: 4}}>
                            <ImageAvatar />
                        </CardContent>
                    </Card>



                </Grid>
                <Grid item xs={12} md={9}>
                    <OutlinedCard />
                </Grid>
            </Grid>
        </>
    )
}


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                Welcome,
            </Typography>
            <Typography variant="h5" component="div">
                Lawal Abdulrazak Adeiza
            </Typography>
            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography> */}
            <hr />
            <Typography variant="body2">
                I'm a self-taught full-stack engineer based in Abuja, Nigeria.
                I am a team player looking to join an extraordinary team of people building the next cool thing.
                I am a team player looking to join an extraordinary team of people building the next cool thing.
                I am a team player looking to join an extraordinary team of people building the next cool thing.
            </Typography>
            <hr />
            <Typography variant="h6" component="div">
                Area of Specialization: <Typography variant="body1" component="span"> Industrial Pharmacy </Typography>
            </Typography>
            <Typography variant="h6" component="div">
                Year Of Experience: <Typography variant="body1" component="span"> 10 </Typography>
            </Typography>
        </CardContent>
        {/* <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions> */}
    </React.Fragment>
);

export function OutlinedCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}


export function ImageAvatar() {
    return (
        <>
            <Avatar alt="abdulrazak lawal" src={myimage} sx={{ width: 200, height: 200}} />
        </>
    )
}
