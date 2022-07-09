import React from "react";

import { Grid, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <header>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={12}>
          <Box display="flex" justifyContent="center" alignItems="center" marginTop={6}>
            <Typography variant="h3">Hotels To Travel</Typography>
          </Box>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
