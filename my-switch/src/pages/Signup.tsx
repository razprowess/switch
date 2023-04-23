import * as React from 'react';
import { Helmet } from 'react-helmet';
import { APP_TITLE, PAGE_TITLE_SIGNUP } from '../utils/constants';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../types/graphSchema';
import {toast} from 'react-toastify';


const professions = [
    {
        value: 'PHARMACY',
        label: 'Pharmacy',
    },
    {
        value: 'DOCTOR',
        label: 'Doctor',
    },
];

export function Signup() {
    const [currency, setCurrency] = React.useState('PHARMACY');
    const context = React.useContext(AuthContext);
    let navigate = useNavigate();

    // const [createUser,{data, error, reset}] = useMutation(CREATE_USER);
    // if(data){
    //     context?.login(data);
    //     navigate('/');
    // }

    // if(error){
    //     console.log(error.message);
    // }

    const [createUser, {reset}] = useMutation(CREATE_USER, {
        update(proxy, { data: { registerUser: user } }) {
            context.login(user.token);
            toast('account created successful', {type: 'success'});
            navigate('/dashboard');
        },
        onError({ graphQLErrors }) {
            toast(graphQLErrors[0].message, {type: 'error'});
        }
    }
  )


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const input = {
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
            username: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
            profession: data.get('select'),
        }

        createUser({ variables: { userInput: { ...input } } });
    };



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    const closeAlert = () => {
        reset();
    }

    return (
        <>
            <Helmet>
                <title>
                    {PAGE_TITLE_SIGNUP} | {APP_TITLE}
                </title>
            </Helmet>
            <Card sx={{ minWidth: 275, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
                <CardContent>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'warning.light' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="userName"
                                            label="User Name"
                                            name="userName"
                                            autoComplete="user-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="select"
                                            fullWidth
                                            id="outlined-select-profession"
                                            select
                                            label="Select"
                                            value={currency}
                                            onChange={handleChange}
                                            helperText="Please select your profession"
                                        >
                                            {professions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                           
                        </Box>
                    </Container>
                </CardContent>
            </Card>
        </>
    );
}
