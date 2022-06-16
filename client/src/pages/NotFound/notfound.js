import React from 'react'
import { Box } from '@mui/material';
import './notfound.css'

const NotFound = () => {

  return (
    <Box className="nf">
      <Box
        component="img"
        sx={{
          height: '40vh',
        }}
        alt="The house from the offer."
        src={require("../../assets/photos/nf404.png")}
      />
      <h1>A Dog ate this Page</h1>
      <p>404 || Not Found</p>
    </Box>
  );
};

export default NotFound;