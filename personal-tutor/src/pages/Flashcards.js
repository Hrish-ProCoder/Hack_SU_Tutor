import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";
import FlashcardsPage from "../components/FlashcardsPage";

const Flashcards = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Flashcards
        </Typography>
        <FlashcardsPage /> {/* This renders the flashcards component */}
      </Container>
    </>
  );
};

export default Flashcards; 


