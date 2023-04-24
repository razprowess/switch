import { Typography, Box } from '@mui/material';
import BasicCard from '../components/Card';
import { Module } from '../components/Module';
import CustomizedTable from '../components/CustomizedTable';
import AlertDialogue from '../components/AlertDialogue';
import { useQuery } from "@apollo/client";
import { GET_MENTOR_FOLLOWERS } from '../types/graphSchema';
import { GET_USER_FOLLOWING } from '../types/graphSchema';
import PageLayout from '../components/Layout/PageLayout';
import { useState } from 'react';

export const Dashboard = () => {

const [pendingRequest, setPendingRequest] = useState([]); 
const {data: follower, loading, error, refetch} = useQuery(GET_MENTOR_FOLLOWERS, {onCompleted(data) {
  setPendingRequest(data.getFollowers.filter((follower: {status: string})=> follower.status === 'pending'))
},});


const handleRetry = ()=>{
  refetch();
  }
  
const {data: following,loading: followingLoading, error: followingDataError} = useQuery(GET_USER_FOLLOWING);

if (loading || followingLoading) {
  return <PageLayout loading />;
}

if (error || followingDataError) {
  return <PageLayout error onRetry={handleRetry}/>;
}

  return (
    <>
    <AlertDialogue/>
      <>
      <Typography variant='h6' sx={{textTransform: 'none', marginLeft: {xs: '0px', md: '120px'}, mb: 1}}>Connection Info</Typography>
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', md: 'row'}, margin: {xs: "0 10px",sm: "0 auto", md: "0 110px"}, flexWrap: 'wrap'}}>
      
        <BasicCard cardContent='Number of Followers' number={follower ? follower.getFollowers.length: 0}/>
      <BasicCard cardContent='Number of Followings' number={following ? following.getFollowings.length : 0}/>
      <BasicCard cardContent='Number of Messages' number={15}/>
        </Box>
        </>
  <>
  <Typography variant='h6' sx={{textTransform: 'none', marginLeft: {xs: '0px', md: '120px'}, mb: 1, mt: 3}}>Mentor Info</Typography>
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', md: 'row'}, margin: {xs: "0 10px",sm: "0 auto", md: "0 110px"}, flexWrap: 'wrap'}}>
      <BasicCard cardContent='Number of Requests' number={pendingRequest.length}/>
        </Box>
        </>  

      <Module>
          <CustomizedTable/>
      </Module>
    </>
  );
};