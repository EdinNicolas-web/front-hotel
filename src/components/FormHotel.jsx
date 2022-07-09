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
} from "@mui/material";

// services
import { createNewHotel, updateHotel } from "../services/hotel";

const FormHotel = ({ handleCloseModal, setReload, isEdit, hotel }) => {
  const [formHotel, setFormHotel] = useState({
    name: "",
    category: 0,
    price: 0,
  });
  const [loadingFetch, setLoadingFetch] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setFormHotel({...hotel});
    }
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const functionToCall = isEdit ? updateHotel : createNewHotel;
    setLoadingFetch(true);
    functionToCall(formHotel)
      .then(({ data }) => {
        if (data) {
          console.log("success");
          handleCloseModal();
          setReload((prev) => !prev);
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={onSubmitForm}>
          <TextField
            variant="outlined"
            fullWidth
            label="Name"
            value={formHotel.name}
            onChange={(e) =>
              setFormHotel({ ...formHotel, name: e.target.value })
            }
          />
          <Box marginTop={1} marginBottom={1}>
            <Typography variant="body1">Category</Typography>
            <Rating
              size="large"
              value={formHotel.category}
              onChange={(_, newValue) =>
                setFormHotel({ ...formHotel, category: newValue })
              }
            />
          </Box>
          <TextField
            variant="outlined"
            fullWidth
            label="Price"
            type="number"
            value={formHotel.price}
            onChange={(e) =>
              setFormHotel({ ...formHotel, price: Number(e.target.value) })
            }
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
            type="submit"
            disabled={loadingFetch}
          >
            {loadingFetch ? (
              <CircularProgress color="secondary" />
            ) : (
              "Save hotel"
            )}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default FormHotel;
