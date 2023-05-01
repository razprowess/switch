import { styled, Typography } from '@mui/material';

import { APP_TITLE } from '../../../utils/constants';

export const AppTitle = ({variant}: {variant: any}) => (
  <StyledAppTitle variant={variant} noWrap>
    {APP_TITLE}
  </StyledAppTitle>
);

const StyledAppTitle = styled(Typography)`
  display: {
    xs: none;
    sm: block;
  }
  cursor: default;
  margin: 0 auto;
  font-weight: bold;
  font-family: 'Oregano', cursive;
`;