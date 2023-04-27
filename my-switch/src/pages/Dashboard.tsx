import { Typography, Box } from '@mui/material';
import BasicCard from '../components/Card';
import AlertDialogue from '../components/AlertDialogue';
import { useQuery } from "@apollo/client";
import { GET_MENTOR_FOLLOWERS } from '../types/graphSchema';
import { GET_USER_FOLLOWING } from '../types/graphSchema';
import PageLayout from '../components/Layout/PageLayout';
import { useState } from 'react';
import Table from '../components/Table';

type Request = {
  firstname: string;
  lastname: string;
  id: string;
}
export const Dashboard = () => {

  const [pendingRequest, setPendingRequest] = useState<Request[]|[]>([]);
  // const [column, setColum] = useState([]);
  const { data: follower, loading, error, refetch } = useQuery(GET_MENTOR_FOLLOWERS, {
    onCompleted(data) {
      setPendingRequest((data.getFollowers || []).filter((follower: { status: string }) => follower.status === 'pending').map((item: any)=>{
        return {
firstname: item['account']['firstname'],
lastname: item['account']['firstname'],
id: item['menteeid']
}
      }))
    },
  });


  const handleRetry = () => {
    refetch();
  }

  const { data: following, loading: followingLoading, error: followingDataError } = useQuery(GET_USER_FOLLOWING);


  if (loading || followingLoading) {
    return <PageLayout loading />;
  }

  if (error || followingDataError) {
    return <PageLayout error onRetry={handleRetry} />;
  }

  const createColumn = (rowData: Request[]) => {
   return rowData.map((data, index)=> {
   return {
    id: Object.keys(data)[index],
    label: Object.keys(data)[index],
  }
    }
   )
  }

  return (
    <>
      <AlertDialogue />
      <>
        <Typography variant='h6' sx={{ textTransform: 'none', marginLeft: { xs: '0px', md: '120px' }, mb: 1 }}>Connection Info</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row' }, margin: { xs: "0 10px", sm: "0 auto", md: "0 110px" }, flexWrap: 'wrap' }}>

          <BasicCard cardContent='Number of Followers' number={follower ? follower.getFollowers.length : 0} />
          <BasicCard cardContent='Number of Followings' number={following ? following.getFollowings.length : 0} />
          <BasicCard cardContent='Number of Messages' number={15} />
        </Box>
      </>
      <>
        <Typography variant='h6' sx={{ textTransform: 'none', marginLeft: { xs: '0px', md: '120px' }, mb: 1, mt: 3 }}>Mentor Info</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row' }, margin: { xs: "0 10px", sm: "0 auto", md: "0 110px" }, flexWrap: 'wrap' }}>
          <BasicCard cardContent='Number of Requests' number={pendingRequest.length} />
        </Box>
      </>

<Table rows={pendingRequest}
      title={{ label: 'Testing-Table' }} columns={createColumn(pendingRequest)} />
    </>
  );
};