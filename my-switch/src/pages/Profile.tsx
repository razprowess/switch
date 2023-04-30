import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { IconButton, styled } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useQuery, useMutation } from "@apollo/client";
import PageLayout from "../components/Layout/PageLayout";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import logo from "../assets/logo/avatar-placeholder.jpeg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import ProfileImage from "../components/ProfileImage";
import axios from "axios";
import { Alert } from "@mui/material";
import { GET_PROFILE_DETAIL, GET_MENTOR_FOLLOWERS, GET_USER_FOLLOWING, REGISTER_FOLLOWER_BY_USERNAME, UPDATE_USER_PROFILE } from "../types/graphSchema";
import { toast } from "react-toastify";
import { BLACK_COLOR, LIGHT_MODE_THEME, WHITE_COLOR } from "../utils/constants";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



export function Profile() {
  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const [logoSrc, setLogoSrc] = useState("");

  const { username } = useParams();
  const navigate = useNavigate();

  const [create] = useMutation(REGISTER_FOLLOWER_BY_USERNAME);
  const { data: followingData, error: followingDataError } = useQuery(
    GET_USER_FOLLOWING,
    {
      variables: { username },
    }
  );
  const { data: followerData, error: followerDataError } = useQuery(
    GET_MENTOR_FOLLOWERS,
    {
      variables: { username },
    }
  );
  const { data, loading, refetch, error } = useQuery(GET_PROFILE_DETAIL, {
    variables: { username }, onCompleted(data) {
      setLogoSrc(data.imgurl);
    },
  });

  const [updateProfile, { reset, error: updateError }] = useMutation(
    UPDATE_USER_PROFILE,
    {
      onCompleted() {
        setShowEditProfile(false);
        refetch();
      },
    }
  );

  if (loading) {
    return <PageLayout loading />;
  }

  if (error || followerDataError || followingDataError) {
    return <PageLayout error />;
  }

  const {
    firstname,
    lastname,
    username: usernameFromCall,
    imgurl,
    bio,
    mentor,
    linkedin,
    twitter
  } = data.getProfileInfo;

  const handleFollowButtonClick = () => {
    create({ variables: { username: username } });
    navigate("/profile");
  };

  const handleEditButton = () => {
     setShowEditProfile(true);
  };


  const handleUploadComplete = (response: { message: string; code?: number; })=>{
    const data = response || {
      message: "We couldn't process your request! Try again",
    };

     toast(data.message, { type: data.code === 1 ? "error" : "success" });
  }


  const handleAvatarChange = async (event: any) => {
    const currentFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", currentFile);
    formData.append("upload_preset", "switch4career");
    try {
      const url = "https://api.Cloudinary.com/v1_1/switch4career/image/upload";
      const result = await axios.post(url, formData);
      setLogoSrc(result.data.secure_url);
      handleUploadComplete({message: 'upload sussessful', code: 0})
    } catch (err) {
      handleUploadComplete({message: 'fail to upload image! Try again', code: 1})
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = {
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
      speciality: data.get("speciality"),
      experienceinyears: data.get("experience"),
      info: data.get("info"),
      bio: data.get("bio"),
      imgurl: logoSrc,
      twitter: data.get('twitterurl'),
      linkedin: data.get('linkedinurl')
    };
    updateProfile({ variables: { user: { ...input } } });
  };

  const closeAlert = () => {
    reset();
  };

  return (
    <PageContainer>
    {username && <Box sx={{marginLeft: {sm: '50px'}}}>
      <IconButton aria-label="add an arrow back" onClick={()=>navigate(-1)}>
  <ArrowBackIosNewIcon />
</IconButton>
    </Box>}
      <GridContainer>
        <Grid container justifyContent="space-around">
          <Grid item xs={12} sm={2} >
            {imgurl ? (
              <Avatar
                alt="abdulrazak lawal"
                src={imgurl}
                sx={(theme) => ({
                  width: theme.spacing(25),
                  height: theme.spacing(25),
                  marginBottom: theme.spacing(2),
                  marginLeft: {xs: 'auto'},
                  marginRight: {xs: 'auto'}
                })}
              />
            ) : (
              <Avatar
                src={logo}
                sx={(theme) => ({
                  width: theme.spacing(25),
                  height: theme.spacing(25),
                  marginBottom: theme.spacing(4),
                  marginLeft: {xs: 'auto'},
                  marginRight: {xs: 'auto'}
                })}
              />
            )}
            {username ? (
              <Button
                variant="contained"
                fullWidth
                sx={{ textTransform: "none", marginBottom: "10px" }}
                onClick={handleFollowButtonClick}
              >
                Follow
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                sx={{ textTransform: "none", marginBottom: "10px" }}
                onClick={handleEditButton}
              >
                Edit profile
              </Button>
            )}
            {followerData && (
              <Typography
                variant="body1"
                sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                color="text.secondary"
              >
                <PeopleOutlinedIcon
                  fontSize="small"
                  sx={{ marginRight: "2px", marginBottom: "-3px" }}
                />
                <strong>{followerData.getFollowers.length}</strong> followers
                <Typography
                  variant="body1"
                  component={"span"}
                  sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                  color="text.secondary"
                >
                  {" "}
                  &#xB7;
                  <strong>
                    {"   "}
                    {followingData ? followingData.getFollowings.length : 0}
                  </strong>{" "}
                  following
                </Typography>
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={9}>
            <Card
              elevation={2}
              sx={(theme) => ({
                marginBottom: theme.spacing(4),
                paddingLeft: theme.spacing(4),
                paddingRight: theme.spacing(2),
                bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR,
              })}
              key={"info"}
            >
              <Typography
                sx={{ fontSize: 18, marginTop: "10px" }}
                color="text.secondary"
                gutterBottom
              >
                Welcome,
              </Typography>
              <Typography
                variant="h4"
                sx={(theme) => ({
                  fontWeight: "bold",
                  marginBottom: theme.spacing(2),
                  textTransform: "capitalize",
                })}
                key={"name"}
              >
                {firstname} {lastname}
              </Typography>
              <Typography
                variant="body1"
                sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                key={"info"}
              >
                <strong>About me:</strong> {bio}
              </Typography>

              {mentor && (
                <>
                  {mentor.info && (
                    <Typography
                      variant="body1"
                      sx={(theme) => ({
                        marginBottom: theme.spacing(4),
                        marginRight: theme.spacing(3),
                      })}
                      key={"info"}
                    >
                      {" "}
                      <strong>More Info: </strong> {mentor.info}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                    key={"info"}
                  >
                    <strong>Area of Specialization:</strong> {mentor.speciality}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                    key={"info"}
                  >
                    <strong>Year of Experience:</strong>{" "}
                    {mentor.experienceinyears}
                  </Typography>
                </>
              )}

             { twitter && <Typography
                variant="body1"
                sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                key={"info"}
              >
                <strong>Find me on twitter on:</strong> <a style={{textDecoration: 'none'}} href={twitter} target="_blank" rel="noopener noreferrer">Twitter</a> 
              
              </Typography>}

              { linkedin && <Typography
                variant="body1"
                sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                key={"info"}
              >
                <strong>Find me on linkedin on:</strong> <a style={{textDecoration: 'none'}} href={linkedin} target="_blank" rel="noopener noreferrer">Linkedin</a>  
              </Typography>}
            </Card>
          </Grid>
        </Grid>
      </GridContainer>

      {showEditProfile && (
        <Card
        elevation={2}
          sx={(theme)=>({
            bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR,
            minWidth: 275,
            marginLeft: { xs: "25px", md: "60px" },
            marginRight: { xs: "25px", md: "60px" },
          })}
        >
          <CardContent>
            <Container component="main">
              <Box component={"form"} noValidate onSubmit={handleFormSubmit}>
                <h2>Personal Info</h2>
                <Grid container spacing={2}>
                  <Box
                    display="flex"
                    marginTop="16px"
                    justifyContent="space-between"
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={{ xs: "1rem", sm: "0" }}
                    width="100%"
                  >
                    <ProfileImage
                      src={logoSrc || imgurl}
                      size="120px"
                      type="circle"
                      canChange={true}
                      callback={handleAvatarChange}
                    />
                  </Box>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      defaultValue={firstname}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) => e.target.value}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      defaultValue={lastname}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      defaultValue={usernameFromCall}
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoComplete="user-name"
                    />
                  </Grid>
                  {followerData && followerData.getFollowers.length !== 0 ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          defaultValue={mentor.speciality}
                          required
                          fullWidth
                          id="speciality"
                          label="Area of specialization"
                          name="speciality"
                          autoComplete="specialities"
                          placeholder="e.g Cybersecurity"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          defaultValue={mentor.experienceinyears}
                          required
                          fullWidth
                          name="experience"
                          label="Year of experience"
                          type="number"
                          id="experience"
                          autoComplete="year of experience"
                          placeholder="e.g 5"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          defaultValue={bio}
                          fullWidth
                          name="bio"
                          placeholder="Short bio"
                          multiline
                          maxRows={3}
                          label="Bio"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Additional info"
                          defaultValue={mentor.info}
                          fullWidth
                          name="info"
                          placeholder="Any more details you would like to share about your experience"
                          multiline
                          maxRows={Infinity}
                        />
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="bio"
                        placeholder="Short bio"
                        multiline
                        maxRows={3}
                        label="Bio"
                      />
                    </Grid>
                  )}


                <Grid item xs={12} sm={6}>
                    <TextField
                      defaultValue={twitter}
                      fullWidth
                      id="twitter"
                      label="Twitter Url"
                      name="twitterurl"
                      autoComplete="twitter-url"
                      placeholder="https://twitter.com/your-username"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      defaultValue={linkedin}
                      fullWidth
                      id="linkedin"
                      label="Linkedin Url"
                      name="linkedinurl"
                      autoComplete="linkedin-url"
                      placeholder="https://linkedin.com/in/your-username"
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-end", sm: "center" },
                    alignItems: "center",
                    mb: 2,
                    mt: 3,
                  }}
                >
                  <Button
                    sx={{ mr: 1, borderRadius: "25px", textTransform: "none" }}
                    variant="outlined"
                    onClick={() => setShowEditProfile(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    sx={{ borderRadius: "25px", textTransform: "none" }}
                    type="submit"
                    variant="contained"
                    autoFocus
                  >
                    Save Changes
                  </Button>
                </Box>
                {updateError && (
                  <Alert
                    sx={{ mx: 6 }}
                    severity="error"
                    onClose={closeAlert}
                    variant="filled"
                  >
                    {updateError?.message}
                  </Alert>
                )}
              </Box>
            </Container>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
}

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

const PageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4), 
}));

