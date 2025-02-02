import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Flashcards from "./pages/Flashcards"; // Ensure Flashcards.js correctly imports FlashcardsPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>
    </Router>
  );
};

export default App;
