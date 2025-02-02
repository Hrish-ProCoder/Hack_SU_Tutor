import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";
import FlashcardsPage from "../components/FlashcardsPage";
import { useLocation } from 'react-router-dom';

const Flashcards = () => {
  const location = useLocation();
  console.log(location.state);
  const flashcardsData = location.state?.flashcardsData || [];

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Flashcards
        </Typography>
        <FlashcardsPage flashcardsData={flashcardsData} />
      </Container>
    </>
  );
};

export default Flashcards;


