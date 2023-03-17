import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import mento from '../assets/images/mentorship.jpeg';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const CREATE_MENTOR = gql`
mutation CreateMentor($mentor: MentorInput){
    registerMentor(user: $mentor){
    speciality
}
}
`

export const Mentor = () => {
    const [ checked, setChecked ] = React.useState(false);
    const navigate = useNavigate();

    const [create, {data, error, reset}] = useMutation(CREATE_MENTOR);

    if(data){
        navigate('/profile');
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const input = {
            speciality: data.get('speciality'),
             experienceinyears: data.get('experience'),
            info: data.get('info'),
            verifyrequest: data.get('checked'),

        }
        console.log(input);
        create({variables: {mentor: {...input}}});

    }

    const closeAlert = () => {
         reset();
    }

    const handleChange = (e: any) => {
        setChecked(e.target.checked);
    }

    return (
        <>
            <Card sx={{ minWidth: 275, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
                <CardMedia
                    component='img'
                    alt='mentoring image'
                    image={mento}
                    height='200' />
                <CardContent>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Few More Details Needed...
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="speciality"
                                            label="Area of specialization"
                                            name="speciality"
                                            autoComplete="specialities"
                                            variant='filled'
                                            placeholder='e.g Cybersecurity'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            variant='filled'
                                            name="experience"
                                            label="Year of experience"
                                            type="number"
                                            id="experience"
                                            autoComplete="year of experience"
                                            placeholder='e.g 5'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name='info'
                                            placeholder="Any more details you would like to share about your experience"
                                            multiline
                                            maxRows={Infinity}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox color="primary" name='checked' onChange={handleChange} value={checked} checked={checked} disabled/>}
                                            label="I want to be verified. (Feature Not Yet Available)"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Become A Mentor
                                </Button>
                            </Box>
                            {error && <Alert sx={{ mx: 6 }} severity="error" onClose={closeAlert} variant="filled">{error?.message}</Alert>
                            }
                        </Box>
                    </Container>
                </CardContent>
            </Card>
        </>
    )
}
