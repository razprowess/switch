import React from "react";
import { Box, Button, CircularProgress, styled, Typography } from "@mui/material";
import Lottie from "react-lottie";

import AnimatedError from '../../../assets/animated/error.json';
import AnimatedLoading from '../../../assets/animated/loading.json';

interface IPageLayoutProps {
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  children?: React.ReactNode | React.ReactNode[];
  onRetry?: () => any;
}

const PageLayout = ({
  loading,
  error,
  errorMessage,
  onRetry,
  children,
}: IPageLayoutProps) => {
  errorMessage =
    errorMessage ||
    "It's not you, it's us, but don't fret. Give us another try";

  const renderLoading = () => (
    <Box textAlign="center" style={{ marginTop: "10vh" }}>
      <Lottie
        options={{ loop: true, autoplay: true, animationData: AnimatedLoading }}
        width={300}
        isClickToPauseDisabled
        height={300}
      />
    </Box>
  );

  const renderError = () => (
    <Box textAlign="center" style={{ marginTop: "10vh" }}>
      <Lottie
        options={{ loop: true, autoplay: true, animationData: AnimatedError }}
        width={300}
        height={300}
        isClickToPauseDisabled
      />

      <Typography variant="subtitle1" fontWeight="bold" mt={-5}>
        Something went wrong
      </Typography>
      <Typography variant="body1" mb={4} mt={1}>
        {errorMessage}
      </Typography>

      <RoundedButton onClick={onRetry} variant="contained" style={{minWidth:180}}>
        TRY AGAIN
      </RoundedButton>
    </Box>
  );

  return loading ? renderLoading() : error ? renderError() : <>{children}</>;
};

export default PageLayout;


export const RoundedButton = styled(Button)`
  && {
    border-radius: 25px;
    max-height: 36px;
  }
`;