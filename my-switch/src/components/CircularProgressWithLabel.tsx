import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IProps {
  value: number;
}

export default function CircularProgressWithLabel(props: IProps) {
  return (
    <Box position="relative" display="inline-flex" alignItems="center">
      {props.value > 0 && (
        <>
          <CircularProgress variant="determinate" {...props} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              component="div"
              color="primary"
            >{`${Math.round(props.value)}%`}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
