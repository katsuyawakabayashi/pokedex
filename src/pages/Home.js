import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  TextField,
  ThemeProvider,
  Typography,
  Button,
} from "@material-ui/core";
import Card from "../components/Card";
import { v4 as uuidv4 } from "uuid";
import theme from "./styles";
import AuthProvider, { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const { logout, histor, cardRef } = useAuth();
  const pokeapi = "https://pokeapi.co/api/v2/pokemon?offset=300&limit=10";

  var count = "init";
  useEffect(() => {
    console.log("Fetching...");
    axios
      .get(pokeapi)
      .then((res) => {
        setCards(res.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  // everytime card changes

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLiked = (card) => {
    // let newCards = cards.map((card) => {
    //   if (card.id === id) {
    //     card.liked = !card.liked;
    //   }
    //   return card;
    // });
    // setCards(newCards);
    cardRef
      .doc(card.id)
      .update({ liked: !card.liked })
      .then(() => {
        console.log("Toggle triggered");
        axios
          .get(pokeapi)
          .then((res) => {
            setCards(res.data.results);
          })
          .catch((error) => console.log(error));
        console.log("fetched");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  useEffect(() => {
    console.log("...");
  }, [cards]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
  };

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative" color="primary">
            <Toolbar>
              <Typography variant="h6">Pokedex</Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Container maxWidth="md" align="center">
              <Box m={3}>
                <Typography color="textPrimary" variant="h5" gutterBottom>
                  Choose your favorite pokemon
                </Typography>
                <Typography color="textPrimary" variant="h5" gutterBottom>
                  <Button onClick={handleLogout}>Logout</Button>
                </Typography>
              </Box>

              <TextField
                id="search"
                variant="outlined"
                color="secondary"
                placeholder="Search here"
                onChange={handleSearch}
                required
                style={{ backgroundColor: "#303030" }}
              />
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
                {filteredCards.map((card) => {
                  // rendering
                  const _url = card.url;
                  const index = _url.split("/")[_url.split("/").length - 2];
                  card.id = index;
                  card.liked = false;
                  if (cardRef.doc(card.id)) {
                    // if existing card
                    cardRef
                      .doc(card.id)
                      .get()
                      .then((doc) => {
                        console.log(doc.data().liked);
                        card.liked = doc.data().liked;
                      });
                  } else {
                    // if new card set liked false
                    cardRef.doc(card.id).set({ liked: false });
                  }
                  return (
                    <Card key={index} card={card} toggleLiked={toggleLiked} />
                  );
                })}
              </Box>
            </Container>
          </main>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default Home;
