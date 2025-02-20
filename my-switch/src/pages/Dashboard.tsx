import { Typography, Box, styled, Grid } from '@mui/material';
import BasicCard from '../components/Card';
import AlertDialogue from '../components/AlertDialogue';
import { useQuery } from "@apollo/client";
import { GET_MENTOR_FOLLOWERS } from '../types/graphSchema';
import { GET_USER_FOLLOWING } from '../types/graphSchema';
import PageLayout from '../components/Layout/PageLayout';
import { useState } from 'react';
import Table, { RowData } from '../components/Table';
import { TableIcon } from '../components/Table/TableIcon';
import { BLACK_COLOR, LIGHT_MODE_THEME, WHITE_COLOR } from '../utils/constants';


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
    <Grid container gap={4}>
          <GridItem item xs={12} sm={6}>
            <Typography>There's usually a bit of a waiting period after your client interview. However, the interview and feedback/decision
               timeline varies depending on our client's hiring urgency and priorities. Sometimes we hear back within the same day, 
               and other times it takes clients a few weeks to finalize a decision. But don't worry! As soon as we have the client 
               feedback, you will be notified by our matchers here in AC or via email</Typography></GridItem>
          <GridItem item xs={12} sm={4}>
            <Typography>There's usually a bit of a waiting period after your client interview. However, the interview and feedback/decision
               timeline varies depending on our client's hiring urgency and priorities. Sometimes we hear back within the same day, and other
                times it takes clients a few weeks to finalize a decision. But don't worry! As soon as we have the client feedback, you will
                 be notified by our matchers here in AC or via email</Typography>
                 </GridItem>
    </Grid>
    </PageContainer>
//     <PageContainer>
//       <AlertDialogue />
//       <>
//         <Typography variant='h6' sx={{ textTransform: 'none', marginLeft: { xs: '0px', md: '120px' }, mb: 1 }}>Connection Info</Typography>
//         <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row' }, margin: { xs: "0 10px", sm: "0 auto", md: "0 110px" }, flexWrap: 'wrap' }}>

//           <BasicCard cardContent='Number of Followers' number={acceptedRequest ? acceptedRequest.length : 0} />
//           <BasicCard cardContent='Number of Followings' number={following ? following.getFollowings.length : 0} />
//           <BasicCard cardContent='Number of Messages' number={15} />
//          { data && <BasicCard cardContent='Number of Requests' number={pendingRequest.length} />}
//         </Box>
//       </>
// {data &&
//       <><>
//         </><Table rows={pendingRequest} title={{ label: 'Pending Request Table' }} columns={createColumn(pendingRequest)} />
//         </>
// }
//     </PageContainer>
  );
};


const PageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8), 
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  height: '100vh'
}));

const GridItem = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR,
  borderRadius: '10px',
  border: '1px solid lightGrey'
}));