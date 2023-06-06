import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogTitle, DialogContent, Box, Typography, styled, InputBase, alpha, List, ListItem, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import {  useState } from 'react';
import { DARK_THEME_COLOR, LIGHT_MODE_THEME, LIGHT_THEME_COLOR } from '../../utils/constants';
import { User } from '../MessageHeader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { CREATE_CHAT } from '../../types/graphSchema';
import { useMutation } from '@apollo/client';
import PageLayout from '../Layout/PageLayout';

interface IMessageModal {
    open: boolean;
    onClose: () => void;
    onSearchFilter: (input: string)=>void;
    filterResult?: User[]|[];
    onUserClick?: (chatid: string)=> void; 
}

const MessageModal = (props: IMessageModal) => {
    const [searchInput, setSearchInput] = useState('');
    const { open, onClose, onSearchFilter, filterResult, onUserClick } = props;


    const [createChat, {error}] = useMutation(CREATE_CHAT, {onCompleted(data) {
        onUserClick && onUserClick(data.createChat.chatId);
    },});

    if (error) {
        return <PageLayout error />;
      }


    const handleClose = (e: any) => {
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const search = event.target.value;
        setSearchInput(search);
        onSearchFilter(search);
    }

    const handleMessageButtonClick = (event: any, id: number)=>{
        onClose();
        createChat({variables: {recieverid: id}});    
    }

    const capitalizedFirstLetter = (str: string) => {
        return str[0].toUpperCase();
      }

    return (
        <ModalContainer>
            <Dialog open={open}
                fullScreen
                PaperProps={{ sx: { width: {xs: '100%', sm: "42%"}, height: {xs: '100%', sm: "88%"}, borderRadius: {xs: 0, sm: '15px'} } }}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', my: -0.5, ml: -2 }}>
                    {open ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ mr: 2 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                    <Typography variant='h6' sx={{ textDecoration: 'none', fontWeight: 'bold', flex: 1 }}>New message</Typography>
                </DialogTitle>
                <DialogContent>
                    <SearchWrapper>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search people..." inputProps={{ 'aria-label': 'search' }} value={searchInput} onChange={handleChange} autoFocus/>
                    </SearchWrapper>
                    <Divider sx={(theme)=>({ mx: -3, mb: 1, bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? 'grey' : 'black' })}/>
                <StyledList>
                {filterResult?.map((result: any) => {
                 const { mentorAccount} = result;
                const { firstname, lastname, username, imgurl, id } = mentorAccount;
            return (<>
            <StyledListItem alignItems="flex-start" key={id}>
              <ListItemAvatar>
                <Avatar alt={capitalizedFirstLetter(firstname)} src={imgurl? imgurl : "/static/images/avatar/1.jpg"} sx={{width: '60px', height: '60px', mr: 1}}/>
              </ListItemAvatar>
              <ListItemWrapper>
                <Typography paragraph sx={(theme)=>({ textTransform: 'capitalize', color: theme.palette.mode === LIGHT_MODE_THEME ? LIGHT_THEME_COLOR : DARK_THEME_COLOR , fontWeight: 600})}>
                  {firstname} {lastname}
                </Typography>
                <Typography variant='body2' sx={{color: 'rgb(0,0,0, 0.5)', fontWeight: 500, mt: -2}}>@{username}</Typography>
              </ListItemWrapper>
              <ButtonContainer>
                 <Button variant='contained' size='small' sx={{ textTransform: 'none', borderRadius: '34px', marginBottom: '5px' }} onClick={(event) => handleMessageButtonClick(event, id)}>Message</Button> 
              </ButtonContainer>
            </StyledListItem>
                </>
                )
            })}
                </StyledList>
                </DialogContent>
                <DialogActions sx={{ marginLeft: '35px', marginRight: '20px', marginBottom: '30px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                </DialogActions>
            </Dialog>
        </ModalContainer>
    )
}

export default MessageModal;

const ModalContainer = styled(Box)(({ theme }) => ({
}))


const SearchIconWrapper = styled('div')(({ theme }) => ({
    color: '#5577ff',
    display: 'flex',
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    justifyContent: 'center',
    alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    color: 'inherit',
    '& .MuiInputBase-input': {
        '&::placeholder': {
            color: '#010B13'
        },
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
}));

const SearchWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: '-20px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        width: 'auto',
    }
}));

const StyledList = styled(List)(({ theme }) => ({
    marginRight: '-25px',
    marginLeft: '-25px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('xs')]: {
    },
  }))

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.mode === LIGHT_MODE_THEME ? alpha(LIGHT_THEME_COLOR, 0.05) : alpha(DARK_THEME_COLOR, 0.25),
      cursor: 'pointer',
    },
    alignItems: 'center',
    marginRight: '10px',
    color: theme.palette.mode === LIGHT_MODE_THEME ? theme.palette.text.primary : '#fff',
  }));
  

  const ListItemWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }));

//   const StyledTypographay = styled(Typography)`
// display: -webkit-box;
// -webkit-line-clamp: 2;
// -webkit-box-orient: vertical;
// overflow: hidden;
// `;

const ButtonContainer = styled(Box)(() => ({
    display: 'flex',
    marginLeft: '15px',
  }));