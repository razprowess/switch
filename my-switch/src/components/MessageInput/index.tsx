import { Box, Divider, InputBase, alpha, styled } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import { LIGHT_MODE_THEME } from "../../utils/constants";
import { useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { WHITE_COLOR } from "../../utils/constants";
import { BLACK_COLOR } from "../../utils/constants";

const MessageInput = () => {
    const [input, setInput] = useState('');
    const [isInputClick, setIsInputClick] = useState(false);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
        setIsInputClick(true);
    }


    const handleArrowClick = () => {
        setIsInputClick(false);
    }
    return (
        <Box sx={{ position: 'fixed', bottom: '5px', right: '20px', width: 'inherit', height: 'auto', }}>
            <Divider sx={(theme) => ({ mb: 1, bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? 'grey' : 'black' })} />
            <InputWrapper>
                {isInputClick ? <SearchIconWrapper sx={{ ml: 1 }} onClick={handleArrowClick}> <ChevronRightIcon /> </SearchIconWrapper> :
                    <>
                        <SearchIconWrapper sx={{ ml: 1 }}>
                            <BrokenImageOutlinedIcon fontSize="small" />
                        </SearchIconWrapper>
                        <SearchIconWrapper>
                            <GifBoxOutlinedIcon fontSize="small" />
                        </SearchIconWrapper>
                        <SearchIconWrapper>
                            <SentimentSatisfiedOutlinedIcon fontSize="small" />
                        </SearchIconWrapper>
                    </>}
                <StyledInputBase multiline placeholder="Start a new message" inputProps={{ 'aria-label': 'search' }} autoFocus onChange={handleInput} value={input} /><SearchIconWrapper sx={{ mr: 1 }}>
                    <SendOutlinedIcon fontSize="small" sx={{ color: isInputClick ? 'inherit' : '#888', opacity: isInputClick ? 1 : 0.5, pointerEvents: isInputClick ? 'auto' : 'none' }} />
                </SearchIconWrapper>
            </InputWrapper>
        </Box>
    )

}

export default MessageInput;

const InputWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    width: '92%',
    background: '#eeeeee',
    borderRadius: '15px',
    marginLeft: theme.spacing(2)
}))


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    resize: 'vertical',
    marginLeft: theme.spacing(1),
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
    color: theme.palette.mode === LIGHT_MODE_THEME ? '#5577ff' :  BLACK_COLOR,
    display: 'flex',
    padding: theme.spacing(0, 1),
    margin: theme.spacing(0.5, 0),
    pointerEvents: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: alpha('#5577ff', 0.1),
        borderRadius: '50%',
    }
}));