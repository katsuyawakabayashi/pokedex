import React from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";

const Card = ({ card, toggleLiked }) => {
  console.log("liked status", card.liked);

  return (
    <Box variant="sm" m={4}>
      <Paper elevation={5}>
        <Box p={6} bgcolor="primary.main">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box flex-direction="column">
              <Typography variant="h6">#{card.id}</Typography>
              <Typography variant="h4">{card.name}</Typography>

              {card.liked ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleLiked(card)}
                >
                  Like
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => toggleLiked(card)}
                >
                  Unlike
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Card;
