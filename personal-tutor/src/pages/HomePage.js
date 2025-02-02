// src/pages/HomePage.js
import React, { use, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/DropDown";
import { Container, Box } from "@mui/material";
import { motion } from "framer-motion";
import axios from 'axios';

const mainTopics = {
  Science: ["Physics", "Biology", "Chemistry", "Astronomy"],
  Technology: ["AI", "Blockchain", "Cybersecurity", "Software"],
  Engineering: ["Civil", "Mechanical", "Electrical", "Robotics"],
  Maths: ["Algebra", "Calculus", "Geometry", "Statistics"],
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);


  useEffect(() => {console.log("Search term changed:", searchTerm);}, [searchTerm]);
  const handleSearch = (term) => {
    setIsSearchActive(true);
    const queryParams = {
      concept: term,
      filters: selectedSubTopic,
    };

    axios.post('http://127.0.0.1:5000/generate-flashcards', queryParams)
      .then((response) => {
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        <motion.div
          initial={{ y: "20%", opacity: 0 }}
          animate={{ y: isSearchActive ? "-30%" : "0%", opacity: 1 }}
          transition={{
            type: "tween",
            duration: 2,
            ease: "easeInOut",
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
          <Box display="flex" flexWrap="wrap" justifyContent="center" marginTop={2}>
            {Object.entries(mainTopics).map(([mainTopic, subTopics]) => (
              <Dropdown
                key={mainTopic}
                mainTopic={mainTopic}
                subTopics={subTopics}
                selectedSubTopic={selectedSubTopic}
                setSelectedSubTopic={setSelectedSubTopic}
                setSearchTerm={setSearchTerm}
              />
            ))}
          </Box>
        </motion.div>
        <Box marginTop={3} textAlign="center">
          <strong>Selected Sub-Topic:</strong> {selectedSubTopic || "None"}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
