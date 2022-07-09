import React from "react";

// ui
import { Dialog, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({ open, handleCloseModal, children, title }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box padding={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{title}</Typography>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Dialog>
  );
};

export default CustomDialog;
