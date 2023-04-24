import { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import BasicCard from '../components/Card';
import { Module } from '../components/Module';
import CustomizedTable from '../components/CustomizedTable';
import AlertDialogue from '../components/AlertDialogue';
import { useQuery } from "@apollo/client";
import { GET_MENTOR_FOLLOWERS } from '../types/graphSchema';
import { GET_USER_FOLLOWING } from '../types/graphSchema';
import { AuthContext } from '../contexts/authContext';

export const Dashboard = () => {
  const { user } =  useContext(AuthContext);

// const {data, error} = useQuery(GET_MENTOR_FOLLOWERS,   {
//   variables: { user?.username },
// });
// const {data: following} = useQuery(GET_USER_FOLLOWING,   {
//   variables: { user?.username },
// });
  return (
    <>
    <AlertDialogue/>
      <>
      <Typography variant='h6' sx={{textTransform: 'none', marginLeft: {xs: '0px', md: '120px'}, mb: 1}}>Connection Info</Typography>
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', md: 'row'}, margin: {xs: "0 10px",sm: "0 auto", md: "0 110px"}, flexWrap: 'wrap'}}>
      
        <BasicCard cardContent='Number of Followers' number={5}/>
      <BasicCard cardContent='Number of Followings' number={0}/>
        </Box>
        </>
  <>
  <Typography variant='h6' sx={{textTransform: 'none', marginLeft: {xs: '0px', md: '120px'}, mb: 1, mt: 3}}>Mentor Info</Typography>
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', md: 'row'}, margin: {xs: "0 10px",sm: "0 auto", md: "0 110px"}, flexWrap: 'wrap'}}>
      <BasicCard cardContent='Number of messages' number={15}/>
      <BasicCard cardContent='Number of request' number={10}/>

        </Box>
        </>  

      <Module>
          <CustomizedTable/>
      </Module>
      <Box sx={{ p: 3 }}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam
          dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus
          sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod
          lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
          In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod
          elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere
          sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </>
  );
};