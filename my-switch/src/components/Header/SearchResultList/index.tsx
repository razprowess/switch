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

interface SearchResultListProps {
  left: number;
  searchResult?: any
}


export default function SearchResultList({ left, searchResult }: SearchResultListProps) {
  if (!searchResult) return null;

  const { getMentors } = searchResult;

  if (getMentors.length === 0) {
    return (
      <StyledList left={left} >
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
      </StyledList>
    )
  }

  const capitalizedFirstLetter = (str: string) => {
    return str[0].toUpperCase();
  }
  return (
    <StyledList left={left}>
      {getMentors?.map((result: any) => {
        const { info, account } = result;
        const { firstname, lastname } = account;
        return (
          <>
            <StyledListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={capitalizedFirstLetter(lastname)} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemWrapper>
                <Typography variant='h6' sx={{ textTransform: 'capitalize' }}>
                  {firstname} {lastname}
                </Typography>
                <Typography variant='body2'>
                  {info}
                </Typography>
              </ListItemWrapper>
              <ButtonContainer>
              <Button variant='contained' size='small' sx={{textTransform: 'none', borderRadius: '0'}}>Follow</Button> 
              <Button variant='text' size='small' sx={{textTransform: 'none', borderRadius: '0', marginBottom: '3px'}}>View Profile</Button> 
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