import { styled, Typography } from '@mui/material';

import { APP_TITLE } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const AppTitle = ({variant}: {variant: any}) => {
const navigate = useNavigate();

  const handleTitle = ()=> navigate('/');
return(
  <StyledAppTitle variant={variant} noWrap onClick={handleTitle}>
  {APP_TITLE}
</StyledAppTitle>
)
};

const StyledAppTitle = styled(Typography)`
  display: {
    xs: none;
    sm: block;
  }
  cursor: pointer;
  margin: 0 auto;
  font-weight: bold;
  font-family: 'Oregano', cursive;
`;