
import { Box, styled } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ILoginFormValues } from "../types/auth";
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


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Provide a valid email address")
        .required("Email address is required"),
    password: Yup.string()
        .min(4, "Password should be more than 4 characters")
        .required("Password is required"),
});


export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const context = useContext(AuthContext);
    const initialValues: ILoginFormValues = {};

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


    const handleSubmit = async (values: ILoginFormValues) => {
        const input = values;
        return await loginUser({ variables: { user: { ...input } } });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleCheckChange = (e: any) => {
        setChecked(e.target.checked);
    }

    return (
        <Grid container sx={{ height: '100%' }}>
            <Grid container item xs={12} sm={8} direction={'column'} justifyContent={'center'} alignItems={'center'} mt={{ sm: -5 }}>

                <Grid item>
                    <Avatar sx={(theme) => ({ bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR, margin: '0 auto' })}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h4" fontWeight={500} my={1} textAlign={'center'}>
                        Welcome Back!
                    </Typography>
                    <Typography variant='subtitle2' fontWeight={400} mb={3}>
                        Don't have an account yet? <Link href="/signup" variant="body2" sx={()=>({ textDecoration: 'none', '&:hover': {borderBottom: '2px solid'} })} fontWeight={600}> Sign Up Now</Link>
                    </Typography>
                </Grid>

                <Formik initialValues={initialValues} onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleSubmit(values);
                    setSubmitting(false);
                }}
                    validationSchema={validationSchema}>
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        errors,
                        touched,
                        isSubmitting,
                    }) =>
                    (<Form style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextFieldContainer>
                            <TextField
                                InputProps={{
                                    style: {
                                        borderRadius: 10,
                                    },
                                }}
                                sx={{ width: { xs: '340px', sm: '415px' } }}
                                error={!!(errors.email && touched.email)}
                                helperText={errors.email}
                                onBlur={handleBlur}
                                required
                                id="email"
                                name="email"
                                label="Email address"
                                autoComplete="email"
                                value={values.email || ""}
                                onChange={handleChange}
                            />
                        </TextFieldContainer>
                        <TextFieldContainer>
                            <FormControl sx={{ width: { xs: '340px', sm: '415px' } }} variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    sx={{ borderRadius: '10px' }}
                                    onChange={handleChange}
                                    value={values.password || ""}
                                    error={!!(errors.password && touched.password)}
                                    onBlur={handleBlur}
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
                        </TextFieldContainer>

                        <Box sx={{ display: 'flex', mt: 1, width: { xs: '330px', sm: '415px' } }} justifyContent={'center'} alignItems={'center'} >
                            <FormControlLabel
                                control={<Checkbox color="primary" name='checked' onChange={handleCheckChange} value={checked} checked={checked} />}
                                label="Remember Me"
                                sx={{ flex: 1, pl: 1 }}
                            />
                            <Typography sx={{ pr: 2 }}> <Link href='#' sx={{ textDecoration: 'none' }} fontWeight={600}>Forget Password?</Link> </Typography>
                        </Box>


                        <Grid container justifyContent={'center'} alignItems={'center'}>
                            <Button type='submit' variant='contained' size='large' disabled={isSubmitting} sx={{ mt: 3, mb: 2, borderRadius: '34px', textTransform: 'none', px: 5, py: 1.5 }}>
                                {isSubmitting ? "Please wait..." : "Login"}
                            </Button>
                        </Grid>
                    </Form>)}
                </Formik>
            </Grid>

            <Grid item sx={(theme) => ({ display: { xs: 'none', sm: 'flex' }, background: theme.palette.mode === LIGHT_MODE_THEME ? `url(${logo})` : `url(${nightLogo})`, backgroundColor: '#cccccc', backgroundRepeat: 'repeat', overflow: 'hidden' })} sm={4}>
            </Grid>
        </Grid>
    )

}

export const TextFieldContainer = styled('div')<{ direction?: "row" | "column" }>(({direction})=>(`
margin-top: 24px;
box-sizing: border-box;
justify-content: space-between;
display: flex;
flex-direction: ${direction} ? ${direction} : row
`));