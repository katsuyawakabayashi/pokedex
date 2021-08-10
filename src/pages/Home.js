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
  const { logout, history, cardRef } = useAuth();
  const pokeapi = "https://pokeapi.co/api/v2/pokemon?offset=300&limit=25";

  const getCards = () => {
    cardRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setCards(items);
    });
  };

  useEffect(() => {
    axios
      .get(pokeapi)
      .then((res) => {
        res.data.results.map((data) => {
          const index = data.url.split("/")[data.url.split("/").length - 2];

          console.log(cardRef.doc(index).id);
          if (cardRef.doc(index).id !== index) {
            cardRef
              .doc(index)
              .set({ id: index, name: data.name, url: data.url, liked: false });
          } else {
          }
        });
      })
      .catch((error) => console.log(error));
    getCards();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  const [reload, setReload] = useState(false);

  const toggleLiked = (card) => {
    cardRef
      .doc(card.id)
      .update({ liked: !card.liked })
      .then(() => {
        console.log("Toggle successfully triggered!");
      })
      .catch((error) => {
        console.error("Error toggleing document: ", error);
      });
  };

  const deleteCard = () => {
    console.log(cardRef);
    cardRef
      .doc()
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
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
                  <Button onClick={() => deleteCard}>delete</Button>
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
                  return (
                    <Card key={card.id} card={card} toggleLiked={toggleLiked} />
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
