import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled, alpha, Button, Box } from '@mui/material';
import { HEADER_HEIGHT, LIGHT_MODE_THEME } from '../../../utils/constants';
import { useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { REGISTER_FOLLOWER, REMOVE_FOLLOWER } from '../../../types/graphSchema';
import { toast } from "react-toastify";
import { LIGHT_THEME_COLOR, DARK_THEME_COLOR } from '../../../utils/constants';
import capitalizedFirstLetter from '../../../utils/capitalizeFirstLetter';


interface SearchResultListProps {
  left: number;
  searchResult?: any;
  onHandleButtonClick: Function;
  onHandleCloseButton: ()=>void;
  isInputClick?: boolean;
}


export default function SearchResultList(props: SearchResultListProps) {
  const { left, searchResult, onHandleButtonClick, onHandleCloseButton, isInputClick } = props;
const navigate = useNavigate();


const [create] = useMutation(REGISTER_FOLLOWER);

const [remove] = useMutation(REMOVE_FOLLOWER);


if (!searchResult) return null;

  if (searchResult.length === 0) {
    
    return (
      <>
     {isInputClick && (<StyledList left={left} >
        <NoSearchResult>
          <ListItemText
            sx={{ textAlign: 'center' }}
            primary='No results for the search speciality'
            secondary={<React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.info"
              >
                Try search for another career
              </Typography>
            </React.Fragment>} />
        </NoSearchResult>
        <Divider variant='fullWidth' component="li" />
      </StyledList>)
    }
    </>
    )
  }

  const handleFollowButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation();
      onHandleButtonClick(id);
     create({ variables: { mentorid: id } });
     toast('Follow request sent! You will be able to send a direct message when the user accept your request', {type: 'info'});
    }  


  const handleUnfollowButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation();
    onHandleButtonClick(id);
    remove({ variables: { mentorid: id } })
  }

  const viewUserProfile = (username: string)=>{
       onHandleCloseButton();
      navigate(`/${username}`);
  }

  return (
    <StyledList left={left}>
      {searchResult?.map((result: any) => {
        const { info, account, id, hasFollowed } = result;
        const { firstname, lastname, username,imgurl } = account;
        return (
          <>
            <StyledListItem alignItems="flex-start" key={id}>
              <ListItemAvatar>
                <Avatar alt={capitalizedFirstLetter(firstname)} src={imgurl? imgurl : "/static/images/avatar/1.jpg"}  />
              </ListItemAvatar>
              <ListItemWrapper>
                <Typography variant='h6' sx={(theme)=>({ textTransform: 'capitalize', color: theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR })}>
                  {firstname} {lastname}
                </Typography>
                <StyledTypographay variant='body2'>
                  {info}
                </StyledTypographay>
              </ListItemWrapper>
              <ButtonContainer>
                { hasFollowed ? <Button variant='contained' size='small' sx={{ textTransform: 'none', borderRadius: '34px', marginBottom: '5px' }} onClick={(event) => handleUnfollowButtonClick(event, id)}>Unfollow</Button>: 
                 <Button variant='contained' size='small' sx={{ textTransform: 'none', borderRadius: '34px', marginBottom: '5px' }} onClick={(event) => handleFollowButtonClick(event, id)}>Follow</Button> }
                <Button variant='text' size='small' sx={{ textTransform: 'none', borderRadius: '0' }} onClick={()=>viewUserProfile(username)}>View Profile</Button>
              </ButtonContainer>
            </StyledListItem>
            <Divider variant="inset" component="li" />
          </>
        )
      })}
    </StyledList>
  );
}


const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.mode === LIGHT_MODE_THEME ? alpha(LIGHT_THEME_COLOR, 0.05) : alpha(DARK_THEME_COLOR, 0.25),
    cursor: 'pointer',
    paddingRight: '10px',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR,
  },
  alignItems: 'flex-start',
  marginRight: '10px',
  color: theme.palette.mode === LIGHT_MODE_THEME ? theme.palette.text.primary : '#fff',
}));


const StyledList = styled(List)<{ left: number }>(({ left, theme }) => ({
  paddingLeft: '6px',
  paddingRight: '6px',
  position: 'fixed',
  top: '100px',
  zIndex: '1',
  overflowY: 'scroll',
  overflowX: 'hidden',
  borderRadius: '10px',
  borderBottom:  theme.palette.mode === LIGHT_MODE_THEME ? `5px solid ${LIGHT_THEME_COLOR}` : `5px solid ${DARK_THEME_COLOR}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('xs')]: {
    width: '100%',
    left: '0',
    maxHeight: '-webkit-fill-available;, 100vh',
    top: `${HEADER_HEIGHT + 73}px`
  },
  [theme.breakpoints.up('md')]: {
    width: '525px',
    left: `${left}px`,
    maxHeight: '400px',
    minHeight: 'auto',
    top: `${HEADER_HEIGHT + 73}px`,
  },

}))

const NoSearchResult = styled(ListItem)(({ theme }) => ({
  alignItems: 'flex-start',
  marginRight: '10px',
  color: theme.palette.mode === LIGHT_MODE_THEME ? theme.palette.text.primary : '#fff',
}));

const ListItemWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}));

const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '15px'
}));

const StyledTypographay = styled(Typography)`
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
`;