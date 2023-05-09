import * as React from 'react';
import { Helmet } from 'react-helmet';
import { APP_TITLE, LIGHT_MODE_THEME, PAGE_TITLE_SIGNUP, } from '../utils/constants';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../types/graphSchema';
import { toast } from 'react-toastify';
import { ISignUpFormValues } from '../types/auth';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import logo from '../assets/logo/dynamic-wave.jpeg';
import nightLogo from '../assets/logo/dynamic-wave-night.jpeg';


const professions = [
    {
        value: 'PHARMACY',
        label: 'Pharmacy',
    },
    {
        value: 'OTHERS',
        label: 'Others',
    },
];


const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    username: Yup.string().required("User name is required"),
    email: Yup.string()
        .email("Provide a valid email address")
        .required("Email address is required"),
    password: Yup.string()
        .min(7, "Password should be more than 6 characters")
        .required("Password is required"),
    repeatpassword: Yup.string()
        .oneOf([Yup.ref("password"),], "Passwords must match")
        .required("Confirm password"),
});

export function Signup() {
    const [profession, setProfession] = React.useState('PHARMACY');
    const context = React.useContext(AuthContext);
    let navigate = useNavigate();
    const initialValues: ISignUpFormValues = { profession: 'PHARMACY' };

    // const [createUser,{data, error, reset}] = useMutation(CREATE_USER);
    // if(data){
    //     context?.login(data);
    //     navigate('/');
    // }

    // if(error){
    //     console.log(error.message);
    // }

    const [createUser] = useMutation(CREATE_USER, {
        update(proxy, { data: { registerUser: user } }) {
            context.login(user.token);
            toast('account created successful', { type: 'success' });
            navigate('/dashboard');
        },
        onError({ graphQLErrors }) {
            toast(graphQLErrors[0]?.message || 'Something went wrong, please try again!', { type: 'error' });
        }
    }
    )

    const handleSubmit = async (values: ISignUpFormValues) => {
        const input = values;
        delete input.repeatpassword;
        await createUser({ variables: { userInput: { ...input } } });
    }


    return (
        <>
            <Helmet>
                <title>
                    {PAGE_TITLE_SIGNUP} | {APP_TITLE}
                </title>
            </Helmet>
            <Grid container sx={{ height: '100%' }}>
                <Grid container item xs={12} sm={10} direction={'column'} justifyContent={'center'} alignItems={'center'} mt={{ sm: -5 }}>

                    <Grid item>
                        <Typography variant="h4" fontWeight={500} my={1} textAlign={'center'}>
                            Sign up to Switch
                        </Typography>
                        <Typography variant='subtitle2' fontWeight={400} mb={5} textAlign={'center'}>
                            Already have an account? <Link href="/login" variant="body2" sx={() => ({ textDecoration: 'none', '&:hover': { borderBottom: '2px solid' } })} fontWeight={600}> Sign In</Link>
                        </Typography>
                    </Grid>

                    <Formik initialValues={initialValues} enableReinitialize onSubmit={async (values, { setSubmitting }) => {
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
                        (<Form style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', paddingLeft: '15px', paddingRight: '15px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        InputProps={{ style: { borderRadius: 10 } }}
                                        autoComplete="given-name"
                                        name="firstname"
                                        required
                                        value={values.firstname || ""}
                                        error={!!(errors.firstname && touched.firstname)}
                                        helperText={errors.firstname}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        InputProps={{ style: { borderRadius: 10 } }}
                                        required
                                        value={values.lastname || ""}
                                        error={!!(errors.lastname && touched.lastname)}
                                        helperText={errors.lastname}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastname"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        InputProps={{ style: { borderRadius: 10 } }}
                                        required
                                        value={values.username || ""}
                                        error={!!(errors.username && touched.username)}
                                        helperText={errors.username}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="username"
                                        autoComplete="user-name"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        InputProps={{ style: { borderRadius: 10 } }}
                                        required
                                        value={values.email || ""}
                                        error={!!(errors.email && touched.email)}
                                        helperText={errors.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>

                                    <TextField
                                        InputProps={{ style: { borderRadius: 10 } }}
                                        required
                                        value={values.password || ""}
                                        error={!!(errors.password && touched.password)}
                                        helperText={errors.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        InputProps={{ style: { borderRadius: 10 } }}
                                        required
                                        value={values.repeatpassword || ""}
                                        error={!!(errors.repeatpassword && touched.repeatpassword)}
                                        helperText={errors.repeatpassword}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        name="repeatpassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="repeat-password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{ style: { borderRadius: 10 } }}
                                        name="profession"
                                        fullWidth
                                        id="outlined-select-profession"
                                        select
                                        label="Select Profession"
                                        value={values.profession || profession}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    // helperText="Please select your profession"
                                    >
                                        {professions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent={'center'} alignItems={'center'}>
                                <Button type='submit' variant='contained' size='large' disabled={isSubmitting} sx={{ mt: 4, mb: 2, borderRadius: '34px', textTransform: 'none', px: 5, py: 1.5 }}>
                                    {isSubmitting ? "Please wait..." : "Sign Up"}
                                </Button>
                            </Grid>
                        </Form>)}
                    </Formik>
                </Grid>

                <Grid sm={2} item sx={(theme) => ({ display: { xs: 'none', sm: 'flex' }, background: theme.palette.mode === LIGHT_MODE_THEME ? `url(${logo})` : `url(${nightLogo})`, backgroundColor: '#cccccc', backgroundRepeat: 'repeat', overflow: 'hidden' })} >
                </Grid>
            </Grid>
        </>
    );
}
