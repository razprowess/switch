

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LOGIN_USER } from '../types/graphSchema';
import { toast } from 'react-toastify';
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Link, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../assets/logo/dynamic-wave.jpeg';
import nightLogo from '../assets/logo/dynamic-wave-night.jpeg';
import { DARK_THEME_COLOR, LIGHT_MODE_THEME, LIGHT_THEME_COLOR } from '../utils/constants';

export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
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


    const [loginUser, { reset }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: user } }) {
            context.login(user.token);
            toast('login successful', { type: 'success' });
            navigate("/dashboard");
        },
        onError({ graphQLErrors }) {
            toast(graphQLErrors[0].message, { type: 'error' });
        }
    }
    );


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const input = {
            email: data.get('email'),
            password: data.get('password')
        }
        loginUser({ variables: { user: { ...input } } })
    }

    const closeAlert = () => {
        reset();
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange = (e: any) => {
        setChecked(e.target.checked);
    }

    return <>
        {/* <Card sx={{ minWidth: 275, maxWidth: 600, marginLeft: "auto", marginRight: "auto", mt: 10 }}>
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
                        <Grid container justifyContent="center" sx={{ mb: 2 }}>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </CardContent>

        </Card> */}


        <Grid container sx={{height: '100%'}}>
            <Grid component="form" noValidate onSubmit={handleSubmit} container item xs={12} sm={8} spacing={2} direction={'column'} justifyContent={'center'} alignItems={'center'}>

                <Grid item>
                <Avatar sx={(theme)=>({ bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR , margin: '0 auto'})}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h4" fontWeight={500} my={1} textAlign={'center'}>
                        Welcome Back!
                    </Typography>
                    <Typography variant='subtitle2' fontWeight={400} mb={4}>
                        Don't have an account yet? <Link href="/signup" variant="body2" sx={{ textDecoration: 'none' }} fontWeight={600}> Sign Up Now</Link>
                    </Typography>
                </Grid>

                <Grid item >
                    <TextField
                        InputProps={{
                            style: {
                                borderRadius: 10, 
                            },
                        }}
                        sx={{ width: {xs: '300px', sm: '415px'}  }}
                        required
                        id="email"
                        name="email"
                        label="Email address"
                        autoComplete="email"
                    />
                </Grid>

                <Grid item>
                    <FormControl sx={{ m: 1, width: {xs: '300px', sm: '415px'} }} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            sx={{ borderRadius: '10px' }}
                            required
                            name="password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>

                <Grid item container sx={{width: 'min-content'}} justifyContent={'center'} alignItems={'center'}>
                    <FormControlLabel
                        control={<Checkbox color="primary" name='checked' onChange={handleChange} value={checked} checked={checked} />}
                        label="Remember Me"
                        sx={{flex: 1, width: {xs: '280px', sm: '380px'}}}
                    />
                    <Typography> <Link href='#' sx={{ textDecoration: 'none'}} fontWeight={600}>Forget Password?</Link> </Typography>
                </Grid>

                <Button type='submit' variant='contained' size='large' sx={{ mt: 3, mb: 2, borderRadius: '34px', textTransform: 'none', px: 5, py: 1.5 }}>
                    Log in
                </Button>
            </Grid>

            <Grid item sx={(theme)=>({ display: { xs: 'none', sm: 'flex' }, background: theme.palette.mode === LIGHT_MODE_THEME ?  `url(${logo})`: `url(${nightLogo})` , backgroundColor: '#cccccc', backgroundRepeat: 'repeat', overflow: 'hidden'})} sm={4}>
            </Grid>
        </Grid>
    </>
}
