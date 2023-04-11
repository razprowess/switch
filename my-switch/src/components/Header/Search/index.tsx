import { useEffect, useRef, useState } from 'react';
import { alpha, InputBase, styled, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchResultList from '../SearchResultList';
import { gql, useLazyQuery } from '@apollo/client';
import { LIGHT_MODE_THEME } from '../../../utils/constants';


interface SearchProps {
  isIconClick: boolean,
  handleIconclose: () => void,
}

type Mentor = {
  account: {
    firstname: string,
    lastname: string,
  },
  info: string,
  id: number,
  hasFollowed: boolean,
}


export const Search = ({ isIconClick, handleIconclose }: SearchProps) => {

  const [searchInput, setSearchInput] = useState('');
  const [isClosed, setIsClosed] = useState(false);
  const [left, setLeft] = useState(0);
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);

  const ref = useRef<HTMLElement | null>(null);
  const GET_MENTOR_LiST = gql`
      query mentorList($speciality: String){
      getMentors(speciality: $speciality){
        info
        id
        account {
          firstname
          lastname
      }
      followers {
        status
      }
    }
  }
  `


  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  useEffect(() => {
    if (ref.current !== null) {
      let leftMargin = ref.current.getBoundingClientRect().left;
      setLeft(leftMargin);
    }
  }, []);


  const [getMentor, { data }] = useLazyQuery(GET_MENTOR_LiST);
  useEffect(() => {
    setMentorsList((data?.getMentors || []).map((item: any) => ({ ...item, hasFollowed: item.followers?.length > 0 })));
  }, [data])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchInput) {
        getMentor({ variables: { speciality: searchInput } });
        setIsClosed(false);
      }

      if (searchInput === "") {
        setIsClosed(true);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchInput]);

  const handleResize = () => {
    if (ref.current) {
      let leftMargin = ref.current.getBoundingClientRect().left;
      setLeft(leftMargin);
    }
  }


  const handleCloseButton = () => {
    setSearchInput('');
    setIsClosed(true);
    handleIconclose();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  const onHandleButtonClick = (id: number) => {

    const result = mentorsList.map((mentor) => {
      if (mentor.id === id) {
        const value = mentor.hasFollowed;
        return { ...mentor, hasFollowed: !value }
      }
      return mentor;
    })

    setMentorsList(result);
  }

  if (isIconClick) {
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
        {!isClosed && <SearchResultList left={left} searchResult={mentorsList} onHandleButtonClick={onHandleButtonClick} />}
        {data && !isClosed && <SearchResultWrapper left={left}>
          <Typography variant='body1' sx={{ flexGrow: 1, fontWeight: 'bold' }} ml={2}>
            Search Result for Mentors
          </Typography>
          <CloseIconWrapper onClick={handleCloseButton}>
            <CloseIcon />
          </CloseIconWrapper>
        </SearchResultWrapper>
        }
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
          <StyledInputBase placeholder="Search a career for mentor…" inputProps={{ 'aria-label': 'search' }} onChange={handleChange} value={searchInput} />
          <CloseIconWrapper onClick={handleCloseButton}>
            <CloseIcon sx={(theme) => ({
              "&:hover": {
                backgroundColor: theme.palette.mode === LIGHT_MODE_THEME ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.white, 0.15),
                borderRadius: '10%',
                cursor: 'pointer',
              }
            })
            }
            />
          </CloseIconWrapper>
        </SearchWrapper>
      </Box>
      {!isClosed && <SearchResultList left={left} searchResult={mentorsList} onHandleButtonClick={onHandleButtonClick} />}
      {data && !isClosed && <SearchResultWrapper left={left}>
        <Typography variant='body1' sx={{ flexGrow: 1, fontWeight: 'bold' }} ml={2}>
          Search Result for Mentors
        </Typography>
        <CloseIconWrapper onClick={handleCloseButton}>
          <CloseIcon sx={(theme) => ({
            "&:hover": {
              backgroundColor: theme.palette.mode === LIGHT_MODE_THEME ? '#e0e0e0' : alpha(theme.palette.common.white, 0.15),
              borderRadius: '10%',
              cursor: 'pointer',
            }
          })
          } />
        </CloseIconWrapper>
      </SearchResultWrapper>
      }
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
}));

const SearchResultWrapper = styled('div')<{ left: number }>(({ theme, left }) => ({
  display: 'flex',
  width: '480px',
  position: 'fixed',
  top: '70px',
  left: `calc(${left}px + 24px)`,
  height: '50px',
  borderTopRightRadius: '10px',
  borderTopLeftRadius: '10px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.mode === LIGHT_MODE_THEME ? theme.palette.text.primary : '#fff',
  alignItems: 'center',
  boxShadow: '0px 2px 0px #888',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    left: '0',
    top: '70px',
  },
}))