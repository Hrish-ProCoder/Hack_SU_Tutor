import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";

const Flashcards = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Flashcards
        </Typography>
        {/* Add your flashcards content here */}
      </Container>
    </>
  );
};

export default Flashcards;