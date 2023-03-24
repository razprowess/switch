import { useEffect, useRef, useState } from 'react';
import { alpha, InputBase, styled, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchResultList from '../SearchResultList';
import {gql, useQuery} from '@apollo/client';

// const GET_MENTOR_LiST = gql`
// query mentorList($speciality: String){
// mentor()
// }
// `

interface SearchProps {
isIconClick: boolean,
handleIconclose: ()=>void,
}

export const Search = ({ isIconClick, handleIconclose}: SearchProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [left, setLeft] = useState(0);
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  const ref = useRef<HTMLElement | null>(null);

useEffect(()=>{
window.addEventListener('resize', handleResize);

return ()=>{
  window.removeEventListener('resize', handleResize);
}
},[])

useEffect(()=>{
  if(ref.current !== null){
    let leftMargin = ref.current.getBoundingClientRect().left;
    setLeft(leftMargin);
  }
},[])

const handleResize =()=>{
if(ref.current){
  let leftMargin = ref.current.getBoundingClientRect().left;
  setLeft(leftMargin);
}
}

const handleCloseButton = () =>{
  setSearchInput('');
  handleIconclose();
}

if(isIconClick){
  return (
    <>
       <Box sx={{ display: { xs: 'flex' }, ml: [6, null, 12] }} ref={ref}>
       <SearchWrapper>
         <SearchIconWrapper>
           <SearchIcon />
         </SearchIconWrapper>
         <StyledInputBase placeholder="Search a career for mentor…" inputProps={{ 'aria-label': 'search' }} onChange={handleChange} value={searchInput} />
         <CloseIconWrapper onClick={handleCloseButton}>
           <CloseIcon />
         </CloseIconWrapper>
       </SearchWrapper>
     </Box>
     <SearchResultList left={left}/>
   </> 
   )
} 

  return (
    <>
       <Box sx={{ display: { sm: 'flex', xs: 'none', }, ml: [2, null, 12] }} ref={ref}>
       <SearchWrapper>
         <SearchIconWrapper>
           <SearchIcon />
         </SearchIconWrapper>
         <StyledInputBase placeholder="A Search a career for mentor…" inputProps={{ 'aria-label': 'search' }} onChange={handleChange} value={searchInput}/>
         <CloseIconWrapper onClick={handleCloseButton}>
           <CloseIcon />
         </CloseIconWrapper>
       </SearchWrapper>
     </Box>
     <SearchResultList left={left}/>
   </> 
   )
};

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '41ch',
    },
  },
}));

const CloseIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  height: '100%',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.20),
    cursor: 'pointer',
  },
}));

