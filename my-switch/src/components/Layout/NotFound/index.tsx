import React from "react";
import { Box, Link, Typography } from "@mui/material";
import Lottie from "react-lottie";
import Animated404 from "../../../assets/animated/404-error.json";


type INotFoundProps = {
    homeUrl?: string;
}

const NotFound = ({ homeUrl='/'}: INotFoundProps) => {
  return (
    <Box sx={{ marginTop: "10vh" }} textAlign="center">
      <Lottie
        width={400}
        height={400}
        options={{ animationData: Animated404, loop: true, autoplay: true }}
      />
    <Typography variant="h5" fontWeight='bold'>404 ERROR</Typography>
      <Typography variant="body1" mt={2}>
          You seem lost. Don't worry, you can always go back{"   "}
          <Link href={homeUrl} variant="body1">Home </Link>
      </Typography>
    </Box>
  );
};

export default NotFound;
