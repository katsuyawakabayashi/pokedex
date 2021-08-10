import React from "react";
import { Box, Button, Container, Paper, Typography } from "@material-ui/core";

const Card = ({ name, liked, id, toggleLiked }) => {
  return (
    <Box variant="sm" m={4}>
      <Paper elevation={5}>
        <Box p={6} bgcolor="primary.main">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box flex-direction="column">
              <Typography variant="h6">#{id}</Typography>
              <Typography variant="h4">{name}</Typography>
              {liked ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleLiked(id)}
                >
                  Unlike
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleLiked(id)}
                >
                  Like
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
