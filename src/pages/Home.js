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
  const { logout, history } = useAuth();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=300&limit=10")
      .then((res) => {
        setCards(res.data.results);
      })
      .catch((error) => console.log(error));
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLiked = (id) => {
    console.log("Toggle Liked", cards);

    let newCards = cards.map((card) => {
      console.log("card", card.id);
      if (card.id === id) {
        card.liked = !card.liked;
      }
      return card;
    });
    setCards(newCards);
  };

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
                  const _url = card.url;
                  const index = _url.split("/")[_url.split("/").length - 2];
                  return (
                    <Card
                      key={index}
                      id={index}
                      name={card.name}
                      url={_url}
                      liked={false}
                      cards={cards}
                      toggleLiked={toggleLiked}
                    />
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
