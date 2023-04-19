import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import myimage from "../assets/images/abdulrazak.jpg";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { gql, useQuery, useMutation } from "@apollo/client";
import PageLayout from "../components/Layout/PageLayout";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import logo from "../assets/logo/avatar-placeholder.jpeg";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import ProfileImage from "../components/ProfileImage";


export function Profile() {
  //a placeholder variable for image
  const [hasImg, setHasImg] = useState(false);
  const [showEditProfile, setShowEditProfile] = React.useState(false);
  const [logoSrc, setLogoSrc] = useState("");

  const { username } = useParams();
  const navigate = useNavigate();

  const GET_PROFILE_DETAIL = gql`
    query GetProfileDetail($username: String) {
      getProfileInfo(username: $username) {
        firstname
        lastname
        mentor {
          info
          speciality
          experienceinyears
        }
      }
    }
  `;

  const GET_MENTOR_FOLLOWERS = gql`
    query GetMentorFollowers($username: String) {
      getFollowers(username: $username) {
        status
      }
    }
  `;

  const GET_USER_FOLLOWING = gql`
    query GetFollwingData($username: String) {
      getFollowings(username: $username) {
        status
      }
    }
  `;

  const REGISTER_FOLLOWER_BY_USERNAME = gql`
mutation RegisterFollower($username: String){
createFollowerByUsername(username: $username){
  status
  mentor_id
}
}
`
  const [create] = useMutation(REGISTER_FOLLOWER_BY_USERNAME);
  const { data: followingData, error: followingDataError } =
    useQuery(GET_USER_FOLLOWING, {
      variables: { username },
    });
  const { data: followerData, error: followerDataError } =
    useQuery(GET_MENTOR_FOLLOWERS, {
      variables: { username },
    });
  const { data, loading, error } = useQuery(GET_PROFILE_DETAIL, {
    variables: { username },
  });

  if (loading) {
    return <PageLayout loading />;
  }

  if (error || followerDataError || followingDataError) {
    return <PageLayout error />;
  }

  const { firstname, lastname, mentor } = data.getProfileInfo;

  const handleFollowButtonClick = () => {
    create({ variables: { username: username } });
    navigate('/profile');
  }

  const handleEditButton = () => {
    //toggle state variable to display the edit profile form below
    setShowEditProfile(true);
  }

  const handleAvatarChange = (event: any) => {
    const folder = "profile/";
    const currentFile = event.target.files[0];
    const url = URL.createObjectURL(currentFile);
  };

  return (
    <>
      <GridContainer >
        <Grid container justifyContent="space-around">
          <Grid item xs={12} sm={2}>
            {hasImg ? (
              <Avatar
                alt="abdulrazak lawal"
                src={myimage}
                sx={(theme) => ({
                  width: theme.spacing(25),
                  height: theme.spacing(25),
                  marginBottom: theme.spacing(2),
                })}
              />
            ) : (
              <Avatar
                src={logo}
                sx={(theme) => ({
                  width: theme.spacing(25),
                  height: theme.spacing(25),
                  marginBottom: theme.spacing(4),
                  marginLeft: { xs: "25px" },
                })}
              />
            )}
            {username ? <Button
              variant="contained"
              fullWidth
              sx={{ textTransform: "none", marginBottom: "10px" }}
              onClick={handleFollowButtonClick}
            >
              Follow
            </Button> : <Button
              variant="contained"
              fullWidth
              sx={{ textTransform: "none", marginBottom: "10px" }}
              onClick={handleEditButton}
            >
              Edit profile
            </Button>}
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
              elevation={3}
              sx={(theme) => ({
                marginBottom: theme.spacing(4),
                paddingLeft: theme.spacing(4),
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
              {mentor && (
                <>
                  {" "}
                  <Typography
                    variant="body1"
                    sx={(theme) => ({
                      marginBottom: theme.spacing(4),
                      marginRight: theme.spacing(3),
                    })}
                    key={"bio"}
                  >
                    {" "}
                    {mentor.info}
                  </Typography>
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
                    <strong>Year of Experience:</strong> {mentor.experienceinyears}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={(theme) => ({ marginBottom: theme.spacing(4) })}
                    key={"info"}
                  >
                    <strong>Address:</strong> 123 Main St, Anytown USA
                  </Typography>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </GridContainer>

      {showEditProfile &&
        <Card sx={{ minWidth: 275, marginLeft: {xs: '25px', md: '60px'}, marginRight: {xs: '25px', md: '60px'} }}>
          <CardContent>
            <Container component="main">
              <Box component={'form'} noValidate>
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
                      src={logoSrc}
                      size="120px"
                      type="circle"
                      canChange={true}
                      callback={handleAvatarChange}
                    />
                  </Box>

                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
                    <TextField
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
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoComplete="user-name"
                    />
                  </Grid>

                </Grid>
              </Box>
            </Container>
          </CardContent>
        </Card>
      }

    </>
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
