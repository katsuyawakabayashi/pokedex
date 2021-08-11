import React, { useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Card = ({ card, toggleLiked }) => {
  const [toggle, setToggle] = useState(false);
  const toggleStatus = (card) => {
    setToggle((prev) => !prev);
  };
  return (
    <Box variant="sm" m={4}>
      <Paper elevation={5}>
        <Box p={6} bgcolor="primary.main">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box flex-direction="column">
              <CardContent>
                <Typography variant="h6">#{card.id}</Typography>
                <Typography variant="h4">{card.name}</Typography>
                <img src={card.image} />
              </CardContent>

              {card.liked ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleLiked(card)}
                >
                  <FavoriteIcon color="secondary" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleLiked(card)}
                >
                  <FavoriteBorderIcon color="secondary" />
                </Button>
              )}
              <Button
                onClick={() => {
                  toggleStatus(card.id);
                }}
              >
                Lern more
                <ExpandMoreIcon />
              </Button>
              {toggle && (
                <Alert severity="info">
                  <AlertTitle>Types</AlertTitle>
                  {card.type1}/{card.type2}
                  <AlertTitle>Abilities</AlertTitle>
                  {card.ability1}/{card.ability2}
                </Alert>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Card;
