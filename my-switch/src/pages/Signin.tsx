
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Alert } from '@mui/material';
import { LOGIN_USER } from '../types/graphSchema';
    
export const Signin = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);

// const [loginUser, {data, error, reset}] = useMutation(LOGIN_USER);
// if(error){
//     console.log(error.message);
//     }
    
// if(data){
//      console.log(data);
//          context.login(data.token);
//         navigate('/dashboard', {replace: true }); 
//     }


    const [loginUser, {error, reset}] = useMutation(LOGIN_USER, {update(proxy, { data: {loginUser: user }}){
        context.login(user.token);
        navigate("/dashboard");
    },
    onError({graphQLErrors}){
        console.log(graphQLErrors[0].message);
    }} 
    );


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const input = {
            email: data.get('email'),
            password: data.get('password')
        }
        loginUser({variables: {user: {...input}}})
    }

    const closeAlert = ()=>{
        reset();
    }

    return <>
        <Card sx={{ minWidth: 275, maxWidth: 600, marginLeft: "auto", marginRight: "auto", mt: 10 }}>
            <CardContent>
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'warning.light' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <CssBaseline />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="password"
                                    name="password"
                                    label="password"
                                    type="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 3, mb: 2 }}>
                            Log in
                        </Button>
                    </Box>
                </Box>
                {error && <Alert sx={{mx: 6}} severity='error' onClose={closeAlert} variant="filled"> {error.message}</Alert>}
            </CardContent>

        </Card>

    </>
}
