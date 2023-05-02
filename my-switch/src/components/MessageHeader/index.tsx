import { Box, Typography, styled } from "@mui/material";
import { UnreadMail, ArrowUp, ArrowDown } from "../Actions";
import { useState } from "react";


const MessageHeader = () => {

    const [open, setOpen] = useState(false);

    const handleArrowUpClick = () => {
        setOpen(true);
    }

    const handleArrowDownClick = () => {
        setOpen(false);
    }

    return (
        <Container open={open}>
            <Wrapper>
                <Box sx={{flex: 1}}>
                    <Typography variant="h6">Messages</Typography>
                </Box>
                <Box>
                     <UnreadMail />
                    {open ? <ArrowDown onClick={handleArrowDownClick}/> : <ArrowUp onClick={handleArrowUpClick}/>}
                </Box>
            </Wrapper>
        </Container>
    )
}

export default MessageHeader

const Container = styled(Box)<{open: boolean}>(({ open, theme }) => ({
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    zIndex: 2,
    background: 'pink',
    position: 'fixed',
    bottom: '0px',
    right: '20px',
    width: '368px',
    height: '54px',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
    ...(open && {
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          height: '500px',    
      }),
      ...(!open && {
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }),
   }))

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(1, 0),
    alignItems: 'center'
}))