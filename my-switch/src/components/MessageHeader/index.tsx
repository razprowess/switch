import { Box, Typography, styled } from "@mui/material";
import { UnreadMail, ArrowUp, ArrowDown } from "../Actions";
import { useContext, useEffect, useState } from "react";
import { BLACK_COLOR, LIGHT_MODE_THEME, WHITE_COLOR } from "../../utils/constants";
import MessageModal from "../MessageModal";
import { GET_MENTOR_FOLLOWERS, GET_USER_FOLLOWING } from "../../types/graphSchema";
import { useLazyQuery } from "@apollo/client";
import { AuthContext } from '../../contexts/authContext';
import isMatch from "../../utils/searchFilter";
import MessageInput from "../MessageInput";


export type Account = { firstname: string, lastname: string, imgurl: string, username: string };
export type Following = {
    mentorAccount: Account;
    status: string
}

export type Follower = {
    account: Account;
    status: string;
    mentorAccount?: Account;
    menteeid: string;
}

export type User = Follower | Following;

const MessageHeader = () => {

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [following, setFollowing] = useState<Following[]|[]>([]);
    const [follower, setFollower] = useState<Follower[] | []>([]);
    const [filter, setFilter] = useState<User[] | []>([]);
    const [openChatHeader, setChatHeader] = useState(false);
    const { user } = useContext(AuthContext);

    const [getFollowing, { data }] = useLazyQuery(GET_USER_FOLLOWING);
    useEffect(() => {
        if (data) setFollowing(data?.getFollowings)
    }, [data])


    const [getFollower, { data: followerData }] = useLazyQuery(GET_MENTOR_FOLLOWERS);
    useEffect(() => {
        if (followerData) setFollower(followerData?.getFollowers);
    }, [followerData]);

    const handleSearchFilter = (searchInput: string) => {
        if (searchInput === '') return setFilter([]);

        const result = following.filter((user) => {
            return isMatch(user.mentorAccount, searchInput);
        })

        const followerResult = follower.filter((user) => {
            return isMatch(user.account, searchInput);
        }).map((user)=> {
            const temp = {...user};
            temp.mentorAccount = {...temp.account};
            return temp;
        })

        setFilter([...result, ...followerResult]);
    }



    const handleArrowUpClick = () => {
        setOpen(true);
    }

    const handleArrowDownClick = () => {
        setOpen(false);
        setChatHeader(false);
    }

    const toggleChatHeader = ()=>{
        setChatHeader((status)=> !status);
        handleArrowUpClick();
    } 
    const handleMailCick = () => {
        setOpenModal((status) => !status)
        getFollowing();
    
         if(user?.role === 'mentor'){
            getFollower();
         }
    }

    return (
        <Container open={open}>
            <Wrapper>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">Messages</Typography>
                </Box>
                <Box>
                    <UnreadMail onClick={handleMailCick} />
                    {open ? <ArrowDown onClick={handleArrowDownClick} /> : <ArrowUp onClick={handleArrowUpClick} />}
                </Box>
            </Wrapper>
            <MessageModal open={openModal} onClose={handleMailCick} onSearchFilter={handleSearchFilter} filterResult={filter} onUserClick={toggleChatHeader} />
           { openChatHeader && <MessageInput/>} 
        </Container>
    )
}

export default MessageHeader

const Container = styled(Box)<{ open: boolean }>(({ open, theme }) => ({
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    zIndex: 2,
    background: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR,
    position: 'fixed',
    bottom: '0px',
    right: '20px',
    width: '400px',
    height: '65px',
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