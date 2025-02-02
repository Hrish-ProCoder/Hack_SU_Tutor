import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Typography, Container, Grid, Card, CardContent,
  Button, Box, LinearProgress, IconButton,
  Chip, ButtonGroup
} from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  Check,
  Close,
  Refresh
} from '@mui/icons-material';

const COUNTDOWN_TIME = 15; // seconds per card

const Flashcard = ({ question, answer, onAnswer, onNext, timeLeft }) => {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (isCorrect) => {
    setAnswered(true);
    onAnswer(isCorrect);
    setTimeout(onNext, 800);
  };

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: 350,
        minHeight: 220,
      }}
    >
      <Box
        onClick={() => !answered && setFlipped(!flipped)}
        sx={{
          width: '100%',
          minHeight: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer'
        }}
      >
        {/* Front of card */}
        <Card
          elevation={6}
          sx={{
            width: '100%',
            minHeight: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            borderRadius: 4,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 2,
            }}
          >
            <Typography variant="body2" align="center" gutterBottom>
              Time Left: {timeLeft}s
            </Typography>
            <Typography variant="h6" align="center">
              {question}
            </Typography>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card
          elevation={6}
          sx={{
            width: '100%',
            minHeight: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            borderRadius: 4,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2
            }}
          >
            <Typography variant="h6" align="center">
              {answer}
            </Typography>

            {/* Approve / Reject Buttons */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(false);
                }}
                startIcon={<Close />}
              >
                Incorrect
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(true);
                }}
                startIcon={<Check />}
              >
                Correct
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const FlashcardsPage = ({ flashcardsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_TIME);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (currentIndex < flashcardsData.length) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(COUNTDOWN_TIME);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = (isCorrect) => {
    let points = 0;
    if (isCorrect) {
      points = 5;
      const bonus = Math.floor(timeLeft / 2);
      points += bonus;
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
    setScore(score + points);
  };

  const handleNext = () => {
    if (currentIndex < flashcardsData.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && currentIndex < flashcardsData.length) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const resetGame = () => {
    clearInterval(timerRef.current);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(COUNTDOWN_TIME);
  };

  if (!flashcardsData || flashcardsData.length === 0) {
    return <Typography variant="h6" align="center">No flashcards available</Typography>;
  }

  // Summary Screen
  if (currentIndex >= flashcardsData.length) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h4" gutterBottom>All cards completed!</Typography>
          <Typography variant="h5">Final Score: {score}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Best Streak: {bestStreak}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={resetGame}
            sx={{ mt: 3 }}
          >
            Start Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Score: {score}</Typography>
        <Box sx={{ mb: 1 }}>
          <Chip label={`Streak: ${streak}`} color="primary" sx={{ mr: 1 }} />
          <Chip label={`Best: ${bestStreak}`} color="secondary" />
        </Box>
        <LinearProgress
          variant="determinate"
          value={(currentIndex / flashcardsData.length) * 100}
          sx={{ mb: 2, height: 10, borderRadius: 5 }}
        />
        <Typography>Card {currentIndex + 1} of {flashcardsData.length}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <ButtonGroup>
          <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
            <NavigateBefore />
          </IconButton>
          <IconButton onClick={resetGame}>
            <Refresh />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={currentIndex === flashcardsData.length}
          >
            <NavigateNext />
          </IconButton>
        </ButtonGroup>
      </Box>

      <AnimatePresence mode="wait">
        <Grid container justifyContent="center">
          <Grid item>
            <Flashcard
              key={currentIndex}
              question={flashcardsData[currentIndex].question}
              answer={flashcardsData[currentIndex].answer}
              onAnswer={handleAnswer}
              onNext={handleNext}
              timeLeft={timeLeft}
            />
          </Grid>
        </Grid>
      </AnimatePresence>
    </Container>
  );
};

export default FlashcardsPage;
