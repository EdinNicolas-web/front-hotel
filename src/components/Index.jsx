import React, { useState, useEffect } from "react";

// ui
import { Grid, Container, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// services
import {
  getAllHotels,
  getHotelsByCategory,
  getHotelsHigherPrice,
  getHotelsLowestPrice,
} from "../services/hotel";

// components
import CardHotel from "./CardHotel";
import CustomDialog from "./Dialog";
import FormHotel from "./FormHotel";

const Index = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    if (selectedCategory !== 0) {
      getHotelsByCategory(selectedCategory)
        .then(({ data }) => {
          if (data) {
            setHotels(data);
          } else {
            setHotels([]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (orderBy !== "") {
      if (orderBy === "DESC") {
        getHotelsHigherPrice()
          .then(({ data }) => {
            if (data) {
              setHotels(data);
            } else {
              setHotels([]);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        getHotelsLowestPrice()
          .then(({ data }) => {
            if (data) {
              setHotels(data);
            } else {
              setHotels([]);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      getAllHotels()
        .then(({ data }) => {
          if (data) {
            setHotels(data);
          } else {
            setHotels([]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [reload, selectedCategory, orderBy]);

  const handleOpenModal = () => {
    setOpenModal(true);
    setSelectedHotel({});
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectHotel = ({ hotel }) => {
    setSelectedHotel(hotel);
    setOpenModal(true);
  };

  const handleChangeOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(Number(e.target.value));
  };

  return (
    <Container sx={{ padding: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} marginBottom={2}>
          <Button variant="contained" onClick={handleOpenModal}>
            Add new Hotel
          </Button>
        </Grid>
        <Grid item xs={12} md={4} marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Filter by category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Filter by category"
              onChange={handleChangeCategory}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={1}>One Star</MenuItem>
              <MenuItem value={2}>Two Stars</MenuItem>
              <MenuItem value={3}>Three Stars</MenuItem>
              <MenuItem value={4}>Four Stars</MenuItem>
              <MenuItem value={5}>Five Stars</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Order by price
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderBy}
              label="Order by price"
              onChange={handleChangeOrderBy}
            >
              <MenuItem value={""}>No order</MenuItem>
              <MenuItem value={"DESC"}>Higher price</MenuItem>
              <MenuItem value={"ASC"}>Lowest price</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {hotels &&
          hotels.length > 0 &&
          hotels.map((hotel, index) => (
            <Grid key={`hotel-${index}`} item xs={12} md={4}>
              <CardHotel
                hotel={hotel}
                handleSelectHotel={handleSelectHotel}
                setReload={setReload}
              />
            </Grid>
          ))}
        <CustomDialog
          open={openModal}
          handleCloseModal={handleCloseModal}
          title="Crate a new Hotel"
          children={
            <FormHotel
              setReload={setReload}
              handleCloseModal={handleCloseModal}
              isEdit={Object.keys(selectedHotel).length > 0}
              hotel={selectedHotel}
            />
          }
        />
      </Grid>
    </Container>
  );
};

export default Index;
