import React, { useState } from "react";

// ui
import Card from "@mui/material/Card";
import {
  Typography,
  Rating,
  Box,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// services
import { deleteComment } from "../services/comments";

// components
import FormComment from "./FormComment";

const CardComment = ({
  comment,
  setReloadData,
  hotel,
  handleCloseFormComment,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSelectIsEdit = () => {
    setIsEdit(true);
  };

  const handleDeleteComment = () => {
    deleteComment(comment.id)
      .then((res) => {
        if (res.status) {
          setReloadData((prev) => !prev);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Card sx={{ padding: 2 }}>
        {isEdit ? (
          <FormComment
            hotel={hotel}
            setReloadData={setReloadData}
            comment={comment}
            handleCloseFormComment={handleCloseFormComment}
            isEdit={isEdit}
          />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="body1">{comment.author}</Typography>
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="body1">Rating: </Typography>
                <Rating readOnly value={comment.rating} />
              </Box>
              <Typography variant="body2">{comment.comment}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={handleDeleteComment}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleSelectIsEdit}>
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Card>
      <Divider sx={{ marginTop: 2 }} />
    </>
  );
};

export default CardComment;
