import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";


export const RoundedButton = styled(Button)`
  && {
    border-radius: 25px;
    max-height: 36px;
  }
`;


const ElevatedContainer = styled('div')<{ radius?: number; background?: string}>(({ radius, background }) => ({
    boxShadow: '0 3px 6px rgb(0 0 0 / 12%)',
    padding: '16px',
    backgroundColor: background ? background :  "#fff",
    borderRadius: radius? `${radius}px` : '0px',
  }))



export const TableHeaderNode = ({
  title,
  ctaLabel,
  onCtaClicked,
  style
}: {
  title: string;
  ctaLabel?: string;
  onCtaClicked?: Function;
  style?: React.CSSProperties;
}) => (
  <Box
    mx={2}
    my={2}
    mb={1}
    display="flex"
    flexDirection="row"
    alignItems="center"
    style={style}
  >
    <Typography fontWeight="bold" sx={{ flex: 1 }} variant="body1">
      {title}
    </Typography>
    {ctaLabel && (
      <RoundedButton
        variant="contained"
        onClick={() => onCtaClicked && onCtaClicked()}
      >
        {ctaLabel}
      </RoundedButton>
    )}
  </Box>
);
