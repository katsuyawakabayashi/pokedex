import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeBall from "../assets/pokeball.svg";

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
import theme from "./styles";
import AuthProvider, { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const { logout, currentUser, cardRef } = useAuth();
  const listApi = "https://pokeapi.co/api/v2/pokemon?offset=320&limit=30";

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
      .get(listApi)
      .then((res) => {
        res.data.results.forEach((data) => {
          const index = data.url.split("/")[data.url.split("/").length - 2];
          axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then((rs) => {
            //console.log(cardRef.doc(index).id);
            if (index !== cardRef.doc(index).id) {
              console.log(rs.data.sprites.front_default);
              cardRef.doc(index).set({
                id: index,
                name: data.name,
                url: data.url,
                liked: false,
                image: rs.data.sprites.front_default,
              });
            } else {
            }
          });
        });
      })
      .catch((error) => console.log(error));
    getCards();
  }, [cardRef, getCards]); // eslint-disable-line

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

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

  const deleteUnlikedCard = () => {
    cards.forEach((card) => {
      console.log(card.liked);
      if (!card.liked) {
        cardRef.doc(card.id).delete();
        console.log("following has been deleted:", card.id);
      }
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
  };

  const reloadApi = () => {
    axios
      .get(listApi)
      .then((res) => {
        res.data.results.forEach((data) => {
          const index = data.url.split("/")[data.url.split("/").length - 2];
          axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then((rs) => {
            //console.log(rs.data.types[0].type.name);
            var tp2;
            var ab2;
            try {
              tp2 = rs.data.types[1].type.name;
            } catch {
              tp2 = "NA";
            }

            try {
              ab2 = rs.data.abilities[1].type.name;
            } catch {
              ab2 = "NA";
            }

            cardRef.doc(index).set({
              id: index,
              name: data.name,
              url: data.url,
              liked: false,
              image: rs.data.sprites.front_default,
              type1: rs.data.types[0].type.name,
              type2: tp2,
              ability1: rs.data.abilities[0].ability.name,
              ability2: ab2,
            });
          });
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative" color="primary">
            <Toolbar>
              <Box
                display="flex"
                flexDirection="center"
                alignItems="center"
                m={2}
              >
                <Typography variant="h6">Pokedex</Typography>
                <Box
                  display="flex"
                  flexDirection="center"
                  alignItems="center"
                  p={1}
                >
                  <img
                    style={{ width: "1rem", height: "1rem" }}
                    src={PokeBall}
                    alt="pokeball"
                  />
                </Box>
              </Box>
              <Button onClick={handleLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <main>
            <Container maxWidth="md" align="center">
              <Box m={3}>
                <Typography color="textPrimary" variant="h5" gutterBottom>
                  Welcome to Pokedex, Logged in as{" "}
                  {currentUser && currentUser.email}
                </Typography>
                <Typography color="textPrimary" variant="h5" gutterBottom>
                  <Button onClick={() => deleteUnlikedCard()}>
                    Delete unliked
                  </Button>
                  <Button onClick={() => reloadApi()}>Reset</Button>
                </Typography>
              </Box>

              <TextField
                id="search"
                variant="outlined"
                color="primary"
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
