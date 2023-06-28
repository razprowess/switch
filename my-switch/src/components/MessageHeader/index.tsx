import { Box, Typography, styled } from "@mui/material";
import { UnreadMail, ArrowUp, ArrowDown, ArrowBack } from "../Actions";
import { useContext, useEffect, useState } from "react";
import {
  BLACK_COLOR,
  LIGHT_MODE_THEME,
  WHITE_COLOR,
} from "../../utils/constants";
import MessageModal from "../MessageModal";
import {
  GET_MENTOR_FOLLOWERS,
  GET_USER_FOLLOWING,
  CREATE_MESSAGE,
  GET_CHAT,
  GET_MESSAGES,
} from "../../types/graphSchema";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../contexts/authContext";
import isMatch from "../../utils/searchFilter";
import MessageInput from "../MessageInput";
import Chat from "../Chat";
import ChatList, { ChatData } from "../ChatList";

export type Account = {
  firstname: string;
  lastname: string;
  imgurl: string;
  username: string;
};

export type Message = {
  chatid: number;
  sender: number;
  content: string;
  createdAt: string;
};

export type Following = {
  mentorAccount: Account;
  status: string;
};

export type Follower = {
  account: Account;
  status: string;
  mentorAccount?: Account;
  menteeid: string;
};

export type ChatLists = {
  recieverAccount: Account;
  chatId: number;
  conversation: [Message];
};
export type User = Follower | Following;

const MessageHeader = () => {
  const [conversation, setConversation] = useState<Message[] | []>([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState<User[] | []>([]);
  const [openChatMessage, setOpenchatMessage] = useState(false);
  const [openChatHeader, setOpenChatHeader] = useState(false);
  const [currentRecieverData, setCurrentRecieverData] =
    useState<ChatData | null>(null);
  const [currentChatId, setCurrentChatId] = useState("");

  const { user } = useContext(AuthContext);

  const [getFollowing, { data }] = useLazyQuery(GET_USER_FOLLOWING);
  const following: Following[] = data?.getFollowing || [];

  const [getFollower, { data: followerData }] =
    useLazyQuery(GET_MENTOR_FOLLOWERS);
    
  const follower: Follower[] = followerData?.getFollowers || [];

  const [getChats, { data: chatData }] = useLazyQuery(GET_CHAT);
  const chatList: ChatLists[] = chatData?.getChat || [];

  const [getMessages, { data: messages }] = useLazyQuery(GET_MESSAGES, { pollInterval: 5000});
  useEffect(() => {
    if (messages) setConversation(messages?.getMessages);
  }, [messages]);

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const handleSearchFilter = (searchInput: string) => {
    if (searchInput === "") return setFilter([]);

    const result = following.filter((user) => {
      return isMatch(user.mentorAccount, searchInput);
    });

    const followerResult = follower
      .filter((user) => {
        return isMatch(user.account, searchInput);
      })
      .map((user) => {
        const temp = { ...user };
        temp.mentorAccount = { ...temp.account };
        return temp;
      });

    setFilter([...result, ...followerResult]);
  };

  const handleArrowUpClick = () => {
    setOpen(true);
    getChats();
    if (openChatMessage) {
      setOpenChatHeader(true);
    }
  };

  const handleArrowDownClick = () => {
    setOpen(false);
    setOpenChatHeader(false);
  };

  const handleMessageButtonClick = (chatId: string) => {
    getMessages({ variables: { chatid: chatId } });
    setCurrentChatId(chatId);
    setOpenChatHeader((status) => !status);
    handleArrowUpClick();
  };

  const handleMailCick = () => {
    setOpenModal((status) => !status);
    getFollowing();

    if (user?.role === "mentor") {
      getFollower();
    }
  };

  const updateConversation = (message: string) => {
    let chat = [...conversation];
    let chatId = currentRecieverData?.chatId
      ? currentRecieverData.chatId
      : currentChatId;
    let newChat = {
      sender: user?.id!,
      content: message,
      createdAt: new Date().getTime().toString(),
      chatid: +chatId
    };
    chat.push(newChat);
    setConversation(chat);
    createMessage({ variables: { message, chatId } });
  };

  const handleChatList = (data: ChatData) => {
    const { firstname, lastname, username, chatId } = data;
    getMessages({ variables: { chatid: chatId } });
    setOpenChatHeader(true);
    setOpenchatMessage(true);
    setCurrentRecieverData({ firstname, lastname, username, chatId });
  };

  const handleArrowBack = () => {
    setOpenchatMessage(false);
    setOpenChatHeader(false);
  };

  console.log('reload...')
  return (
    <Container open={open}>
      {openChatMessage ? (
        <Wrapper>
          <ArrowBack onClick={handleArrowBack} />
          <Box
            sx={{ display: "flex", flex: 1, flexDirection: "column", ml: 2 }}
          >
            <Typography
              paragraph
              sx={(theme) => ({
                textTransform: "capitalize",
                fontWeight: 600,
                my: "auto",
              })}
            >
              {currentRecieverData?.firstname} {currentRecieverData?.lastname}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgb(0,0,0, 0.5)", fontWeight: 500 }}
            >
              @{currentRecieverData?.username}
            </Typography>
          </Box>
          <Box>
            {open ? (
              <ArrowDown onClick={handleArrowDownClick} />
            ) : (
              <ArrowUp onClick={handleArrowUpClick} />
            )}
          </Box>
        </Wrapper>
      ) : (
        <Wrapper>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Messages</Typography>
          </Box>
          <Box>
            <UnreadMail onClick={handleMailCick} />
            {open ? (
              <ArrowDown onClick={handleArrowDownClick} />
            ) : (
              <ArrowUp onClick={handleArrowUpClick} />
            )}
          </Box>
        </Wrapper>
      )}

      {openChatHeader && <Chat message={conversation} />}
      <MessageModal
        open={openModal}
        onClose={handleMailCick}
        onSearchFilter={handleSearchFilter}
        filterResult={filter}
        onUserClick={handleMessageButtonClick}
      />
      {openChatHeader && <MessageInput onUpdateChat={updateConversation} />}
      {!openChatHeader && (
        <ChatList list={chatList} handleChatList={handleChatList} />
      )}
    </Container>
  );
};

export default MessageHeader;

const Container = styled(Box)<{ open: boolean }>(({ open, theme }) => ({
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  zIndex: 2,
  background:
    theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR,
  position: "fixed",
  bottom: "0px",
  right: "20px",
  width: "400px",
  height: "65px",
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  ...(open && {
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    height: "500px",
  }),
  ...(!open && {
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1, 0),
  alignItems: "center",
}));
