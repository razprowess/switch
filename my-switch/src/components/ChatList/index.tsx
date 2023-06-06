import { alpha, styled, List, ListItem, ListItemAvatar, Avatar, Typography } from "@mui/material";

import { DARK_THEME_COLOR, LIGHT_MODE_THEME, LIGHT_THEME_COLOR } from "../../utils/constants";
import { ChatLists } from "../MessageHeader";
import capitalizedFirstLetter from "../../utils/capitalizeFirstLetter";
import { timeStampForDate } from "../../utils/timestampFormatter";


export interface ChatData {
  firstname: string;
  lastname: string;
  username: string;
  chatId?: number
}

interface IChatList {
  list: ChatLists[];
  handleChatList: (data: ChatData) => void;
}

const ChatList = (props: IChatList) => {
  const { list, handleChatList } = props;

  const onHandleChatList = (data: ChatData) => {
    handleChatList(data);
  }

  return (
    <StyledList sx={{ p: 0 }}>
      {list.map((chatList, index: number) => {
        const { recieverAccount, chatId, conversation } = chatList;
        const { username, firstname, lastname, imgurl } = recieverAccount;

        return (
          <StyledListItem alignItems="flex-start" onClick={() => { onHandleChatList({ firstname, lastname, username, chatId }) }} sx={{ py: 2 }} key={index}>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar alt={capitalizedFirstLetter(firstname)} src={imgurl ? imgurl : "/static/images/avatar/1.jpg"} sx={{ width: '48px', height: '48px', mr: 1 }} />
            </ListItemAvatar>
            <ListItemWrapper>
              <Typography paragraph sx={(theme) => ({ textTransform: 'capitalize', fontWeight: 600, mb: 0 })}>
                {firstname} {lastname} <Typography component='span' variant='body2' sx={{ color: 'rgb(0,0,0, 0.6)', fontWeight: 500 }}>@{username}</Typography>
                {conversation[0] && <Typography component='span' variant='body1' sx={{ color: 'rgb(0,0,0, 0.6)', mb: 0, ml: 1 }}>{timeStampForDate(conversation[0].createdAt)}</Typography>}
              </Typography>
              {conversation[0] && <Typography paragraph sx={{ color: 'rgb(0,0,0, 0.6)', mb: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '260px' }}>{conversation[0].content}</Typography>}
            </ListItemWrapper>
          </StyledListItem>

        )
      })}


    </StyledList>
  )
}

export default ChatList;

const StyledList = styled(List)(({ theme }) => ({
  marginRight: '-15px',
  marginLeft: '-15px',
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

const ListItemWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignSelf: 'start'
}));