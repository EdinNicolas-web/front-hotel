import React, { useState, useEffect, useSyncExternalStore } from "react";

// ui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// services
import { deleteHotel } from "../services/hotel";
import { getAllCommentsByHotel } from "../services/comments";

// components
import CardComment from "./CardComment";
import FormComment from "./FormComment";

const CardHotel = ({ hotel, handleSelectHotel, setReload }) => {
  const [showComments, setShowComments] = useState(false);
  const [showFormComment, setShowFormComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    if (showComments) {
      getAllCommentsByHotel(hotel.id)
        .then(({ data }) => {
          if (data) {
            setComments(data);
          } else {
            setComments([]);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [reloadData, showComments]);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleShowFormComment = () => {
    setShowFormComment((prev) => !prev);
  };

  const handleCloseFormComment = () => {
    setShowFormComment(false);
  };

  const handleDeleteHotel = () => {
    deleteHotel(hotel.id)
      .then((res) => {
        if (res.status === 200) {
          setReload((prev) => !prev);
        }
      })
      .catch((e) => {
        console.log(err);
      });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://p4.wallpaperbetter.com/wallpaper/146/867/628/luxury-hotel-wallpaper-preview.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotel.name}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            Category:
          </Typography>
          <Rating readOnly value={hotel.category} />
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            Price:
          </Typography>
          <Typography variant="span">{hotel.price}</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button onClick={handleShowComments}>Show comments</Button>
        </Box>
        {showComments && (
          <Box padding={1}>
            <Button
              sx={{ marginBottom: 2 }}
              variant="outlined"
              onClick={handleShowFormComment}
            >
              Add comment
            </Button>
            {showFormComment && (
              <FormComment
                hotel={hotel}
                handleCloseFormComment={handleCloseFormComment}
                setReloadData={setReloadData}
              />
            )}
            {comments &&
              comments.length > 0 &&
              comments.map((comment, index) => (
                <CardComment
                  comment={comment}
                  key={`comment-${index}`}
                  setReloadData={setReloadData}
                  handleCloseFormComment={handleCloseFormComment}
                  hotel={hotel}
                />
              ))}
          </Box>
        )}
      </CardContent>
      <CardActions>
        <IconButton onClick={handleDeleteHotel}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => handleSelectHotel({ hotel: hotel })}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardHotel;
