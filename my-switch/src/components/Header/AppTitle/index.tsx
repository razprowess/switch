import { styled, Typography } from '@mui/material';

import { APP_TITLE } from '../../../utils/constants';

export const AppTitle = () => (
  <StyledAppTitle variant="h5" noWrap>
    {APP_TITLE}
  </StyledAppTitle>
);

const StyledAppTitle = styled(Typography)`
  display: {
    xs: none;
    sm: block;
  }
  cursor: default;
  margin-left: 40px;
  font-weight: bold;
`;