import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography, Container, Grid, Card, CardContent } from "@mui/material";
import "./Flashcards.css"; // Ensure this file contains updated styles

const flashcardsData = [
  {
    question: "What is Artificial Intelligence (AI)?",
    answer: "AI is the simulation of human intelligence processes by machines, especially computer systems.",
  },
  {
    question: "What are the main subfields of AI?",
    answer: "Key subfields include Machine Learning, Deep Learning, Natural Language Processing, and Computer Vision.",
  },
  {
    question: "What is Machine Learning?",
    answer: "Machine learning is a type of AI that allows systems to learn from data without being explicitly programmed.",
  },
  {
    question: "What are some real-world applications of AI?",
    answer: "AI is used in areas like self-driving cars, facial recognition, virtual assistants, and medical diagnosis.",
  },
  {
    question: "What is the difference between 'narrow' and 'general' AI?",
    answer: "Narrow AI is good at specific tasks, while general AI (which doesn't currently exist) would have human-level intelligence across many tasks.",
  },
];

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="flashcard"
      onClick={() => setFlipped(!flipped)}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        className={`flashcard-content ${flipped ? "flipped" : ""}`}
        sx={{
          width: 250,
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1000px",
          cursor: "pointer",
        }}
      >
        <CardContent
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backfaceVisibility: "hidden",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          className="card-front"
        >
          <Typography variant="h6" align="center">
            {question}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backfaceVisibility: "hidden",
            transform: flipped ? "rotateY(0deg)" : "rotateY(180deg)",
            backgroundColor: "#f5f5f5",
          }}
          className="card-back"
        >
          <Typography variant="body1" align="center">
            {answer}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FlashcardsPage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        AI Flashcards
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {flashcardsData.map((flashcard, index) => (
          <Grid item key={index}>
            <Flashcard question={flashcard.question} answer={flashcard.answer} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FlashcardsPage;
