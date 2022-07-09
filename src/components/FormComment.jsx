import React, { useState, useEffect } from "react";

// ui
import {
  TextField,
  Button,
  Grid,
  Rating,
  Box,
  Typography,
  CircularProgress,
  Card,
} from "@mui/material";

// services
import { saveComment, updateComment } from "../services/comments";

const FormComment = ({
  hotel,
  handleCloseFormComment,
  setReloadData,
  comment,
  isEdit,
}) => {
  const [formComment, setFormComment] = useState({
    author: "",
    rating: 0,
    comment: 0,
    hotelId: hotel.id ?? 0,
  });
  const [loadingFetch, setLoadingFetch] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setFormComment({ ...comment });
    }
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const functionToCall = isEdit ? updateComment : saveComment;
    setLoadingFetch(true);
    functionToCall(formComment)
      .then((res) => {
        if (res.status === 201) {
          handleCloseFormComment();
          setReloadData((prev) => !prev);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoadingFetch(false);
      });
  };
  return (
    <Card elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <form onSubmit={onSubmitForm}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={formComment.author}
              label="Author"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setFormComment({ ...formComment, author: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">Rating</Typography>
              <Rating
                value={formComment.rating}
                onChange={(_, newValue) =>
                  setFormComment({ ...formComment, rating: newValue })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formComment.comment}
              label="Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={(e) =>
                setFormComment({ ...formComment, comment: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="small"
              fullWidth
              type="submit"
              disabled={loadingFetch}
            >
              {loadingFetch ? (
                <CircularProgress color="secondary" />
              ) : (
                "Save comment"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default FormComment;
