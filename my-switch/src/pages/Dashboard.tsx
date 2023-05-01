import { Typography, Box, styled } from '@mui/material';
import BasicCard from '../components/Card';
import AlertDialogue from '../components/AlertDialogue';
import { useQuery } from "@apollo/client";
import { GET_MENTOR_FOLLOWERS } from '../types/graphSchema';
import { GET_USER_FOLLOWING } from '../types/graphSchema';
import PageLayout from '../components/Layout/PageLayout';
import { useState } from 'react';
import Table, { RowData } from '../components/Table';
import { TableIcon } from '../components/Table/TableIcon';


export type Request = {
  firstname: string;
  lastname: string;
  username: string;
  id: string;
  'S/N': number;
}
export const Dashboard = () => {

  const [pendingRequest, setPendingRequest] = useState<Request[] | []>([]);
  const [acceptedRequest, setAcceptedRequested] = useState([]);

  const {data, loading, error, refetch } = useQuery(GET_MENTOR_FOLLOWERS, {
    onCompleted(data) {
      setPendingRequest((data.getFollowers || []).filter((follower: { status: string }) => follower.status === 'pending').map((item: any, index: number) => {
        return {
          'S/N': index + 1,
          firstname: item['account']['firstname'],
          lastname: item['account']['lastname'],
          username: item['account']['username'],
          id: item['menteeid']
        }
      }));

      setAcceptedRequested((data.getFollowers || []).filter((follower: { status: string; })=> follower.status === 'accepted'));
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
    if(rowData.length === 0){
      return [];
    }
   const row = rowData.map((data)=> {
    return {'S/N': data['S/N'], firstname: data.firstname, lastname: data.lastname}
   })    
   const columns = Object.keys(row[0]).map((col)=> {
    return {id: col, label: col}
   })
    return [...columns, { id: '', label: '', renderer: render }]
  }

const render = (row: RowData)=> {
  return <TableIcon row={row} onAccepted={handleRetry}/>
}

  return (
    <PageContainer>
      <AlertDialogue />
      <>
        <Typography variant='h6' sx={{ textTransform: 'none', marginLeft: { xs: '0px', md: '120px' }, mb: 1 }}>Connection Info</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row' }, margin: { xs: "0 10px", sm: "0 auto", md: "0 110px" }, flexWrap: 'wrap' }}>

          <BasicCard cardContent='Number of Followers' number={acceptedRequest ? acceptedRequest.length : 0} />
          <BasicCard cardContent='Number of Followings' number={following ? following.getFollowings.length : 0} />
          <BasicCard cardContent='Number of Messages' number={15} />
         { data && <BasicCard cardContent='Number of Requests' number={pendingRequest.length} />}
        </Box>
      </>
{data &&
      <><>
          {/* <Typography variant='h6' sx={{ textTransform: 'none', marginLeft: { xs: '0px', md: '120px' }, mb: 1, mt: 3 }}>Mentor Info</Typography>
          */}
        </><Table rows={pendingRequest} title={{ label: 'Pending Request Table' }} columns={createColumn(pendingRequest)} />
        </>
}
    </PageContainer>
  );
};


const PageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8), 
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2)
}));