import { Box, Typography, styled } from "@mui/material";
import './chat.css';
import { useEffect, useRef } from "react";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Message } from "../MessageHeader";
import {timeStampFormatter} from "../../utils/timestampFormatter";


interface IChat {
    message: Message[]
}
const Chat = ({ message }: IChat) => {

    const chatRef = useRef<HTMLDivElement | null>(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const divElement = chatRef.current;
        if (divElement) {
            divElement.scrollTop = divElement.scrollHeight;
        }
    }, [message]);

    return (
        <ChatWrapper ref={chatRef}>
            {message.map((item, index: number) => {
                let isMarginEnabled = false;
                let isLastMessage = false;
                let hasExceedTimeGap = false;
                let total = index + 1;
                if (message.length - total > 0) {
                    let nextItem = message[index + 1];
                    if (item.sender !== nextItem.sender) {
                        isMarginEnabled = true;
                    }
                }

                if (message.length === index + 1) {
                    isLastMessage = true;
                }

                if (message.length - total > 0) {
                    let currentMessageTime = parseInt(item.createdAt);
                    let nextItem = message[index + 1];
                    let nextMessageTime = parseInt(nextItem.createdAt);
                    let diff = nextMessageTime - currentMessageTime;
                    if (diff >= 600000) {
                        hasExceedTimeGap = true;
                    }

                }

                return (
                    <><Box key={index}
                        className={`${+item.sender === user?.id ? 'chat-message-sender' : 'chat-message-reciever'}
                         ${hasExceedTimeGap ? +item.sender === user?.id ? 'chat-message-sender-radius' : 'chat-message-reciever-radius' : ''}                         
                    `}>
                        <Typography className={+item.sender === user?.id ? 'chat-message-sender-content' : 'chat-message-reciever-content'}>{item.content}</Typography>
                    </Box>
                        {(isMarginEnabled || isLastMessage) && <Typography variant="body2"
                            className={`${+item.sender === user?.id ? 'chat-sender-time' : 'chat-reciever-time'}
                         ${isMarginEnabled ? 'chat-messages-spacing' : ''} 
                         ${isLastMessage ? 'chat-last-message-spacing' : ''}`}>{timeStampFormatter(item.createdAt)}</Typography>}</>
                )
            })}

        </ChatWrapper>
    )
}

export default React.memo(Chat);


const ChatWrapper = styled('div')(({ theme }) => ({
    marginRight: '-16px',
    position: 'relative',
    maxHeight: '75%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    overflowX: 'hidden',
    gap: '5px',
}))


