import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled, alpha, Button, Box } from '@mui/material';
import { LIGHT_MODE_THEME } from '../../../utils/constants';
import { useMutation} from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTER_FOLLOWER, REMOVE_FOLLOWER } from '../../../types/graphSchema';


interface SearchResultListProps {
  left: number;
  searchResult?: any;
  onHandleButtonClick: Function;
  onHandleCloseButton: ()=>void;
}


export default function SearchResultList(props: SearchResultListProps) {
  const { left, searchResult, onHandleButtonClick, onHandleCloseButton } = props;
  const [rendered, setRendered] =  useState(false);
const navigate = useNavigate();

  useEffect(()=>{
    setRendered(true);
  },[])

const [create] = useMutation(REGISTER_FOLLOWER);

const [remove] = useMutation(REMOVE_FOLLOWER);


if (!searchResult) return null;

  if (searchResult.length === 0) {
    return (
      <>
     {!rendered && (<StyledList left={left} >
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

  const capitalizedFirstLetter = (str: string) => {
    return str[0].toUpperCase();
  }

  const handleFollowButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    event.stopPropagation();
      onHandleButtonClick(id);
     create({ variables: { mentorid: id } });
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
        const { firstname, lastname, username } = account;
        return (
          <>
            <StyledListItem alignItems="flex-start" key={id}>
              <ListItemAvatar>
                <Avatar alt={capitalizedFirstLetter(firstname)} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemWrapper>
                <Typography variant='h6' sx={{ textTransform: 'capitalize' }}>
                  {firstname} {lastname}
                </Typography>
                <StyledTypographay variant='body2'>
                  {info}
                </StyledTypographay>
              </ListItemWrapper>
              <ButtonContainer>
                { hasFollowed ? <Button variant='contained' size='small' sx={{ textTransform: 'none', borderRadius: '0', marginBottom: '5px' }} onClick={(event) => handleUnfollowButtonClick(event, id)}>Unfollow</Button>: 
                 <Button variant='contained' size='small' sx={{ textTransform: 'none', borderRadius: '0', marginBottom: '5px' }} onClick={(event) => handleFollowButtonClick(event, id)}>Follow</Button> }
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
    backgroundColor: theme.palette.mode === LIGHT_MODE_THEME ? alpha(theme.palette.primary.light, 0.15) : alpha(theme.palette.secondary.contrastText, 0.25),
    cursor: 'pointer',
    paddingRight: '10px',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.mode === LIGHT_MODE_THEME ? theme.palette.primary.light : theme.palette.secondary.contrastText,
  },
  alignItems: 'flex-start',
  marginRight: '10px',
  color: theme.palette.mode === LIGHT_MODE_THEME ? theme.palette.text.primary : '#fff',
}));


const StyledList = styled(List)<{ left: number }>(({ left, theme }) => ({
  position: 'fixed',
  top: '100px',
  zIndex: '1',
  overflowY: 'scroll',
  overflowX: 'hidden',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  borderBottom:  theme.palette.mode === LIGHT_MODE_THEME ? '5px solid #2196f3' : '5px solid #fff',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('xs')]: {
    width: '100%',
    left: '0',
    maxHeight: '-webkit-fill-available;, 100vh',
    top: '122px',
  },
  [theme.breakpoints.up('md')]: {
    width: '480px',
    left: `calc(${left}px + 24px)`,
    maxHeight: '400px',
    minHeight: 'auto',
    top: '122px',
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