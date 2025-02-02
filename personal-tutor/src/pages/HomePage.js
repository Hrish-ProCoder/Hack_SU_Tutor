// src/pages/HomePage.js
import React, { use, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/DropDown";
import { Container, Box } from "@mui/material";
import { motion } from "framer-motion";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
// Add new imports
import { 
  Select, 
  MenuItem, 
  TextField, 
  FormControl, 
  InputLabel,
  CircularProgress,
  Paper,
  Typography
} from '@mui/material';

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
  const [flashcards, setFlashcards] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');
  // Add new state variables
  const [skillLevel, setSkillLevel] = useState("Easy");
  const [domain, setDomain] = useState("");
  const [language, setLanguage] = useState("English");
  // Add new state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {console.log("Search term changed:", searchTerm);}, [searchTerm]);
  // Update handleSearch function
  const handleSearch = (term) => {
    setIsLoading(true);
    setIsSearchActive(true);
    const queryParams = {
      concept: term,
      filters: selectedSubTopic,
      skillLevel: skillLevel,
      domain: domain,
      language: language
    };
    
    const explainParams = {
      topic: term,
      age: 10,
      skillLevel: skillLevel,
      language: language,
      domain: domain,
    };
    fetchExplanation(term);

    Promise.all([
      axios.post('http://127.0.0.1:5000/generate-flashcards', queryParams),
      axios.post('http://127.0.0.1:5000/generate-explaination', explainParams)
    ])
    .then(([flashcardsRes, explanationRes]) => {
      setFlashcards(flashcardsRes.data);
      setHtmlContent(explanationRes.data.genAI_response);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const fetchExplanation = (term) => {
    const explainParams = {
        topic: term,
        age: 10,
        skillLevel: skillLevel,
        language: language,
        domain: domain,
      };
    axios.post('http://127.0.0.1:5000/generate-explaination', explainParams)
        .then((response) => {
            // console.log("API Response:", response.data);
            setHtmlContent(()=>{return response.data.genAI_response});
        })
        .catch((error) => {
            console.error("Error fetching search results:", error);
        });
  };

  useEffect(() => {
    console.log("Flashcards changed:", htmlContent.genAI_response);
    }
    , [htmlContent]);

  return (
    <>
      <Navbar />
      <Container 
        sx={{
          py: 4,  // padding top/bottom
          px: { xs: 2, sm: 4 }, // responsive padding left/right
          maxWidth: "lg"
        }}
      >
        <motion.div
          initial={{ y: "20%", opacity: 0 }}
          animate={{ 
            y: isSearchActive ? "0%" : "0%", 
            opacity: 1,
            minHeight: isSearchActive ? "30vh" : "80vh" // adjusted heights
          }}
          transition={{
            type: "spring",
            duration: 1.2,
            ease: "easeInOut",
            minHeight: {
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem 1rem",
            marginBottom: isSearchActive ? "2rem" : "0",
            gap: "1.5rem"
          }}
        >
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
          {/* Add Filters Section */}
          <Box 
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              width: '100%',
              alignItems: 'flex-start',
              marginTop: 2,
              justifyContent: 'space-between'
            }}
          >
            {/* Left side - Tags */}
            <Box 
              sx={{
                flex: { xs: '1', md: '1' }, // Controls width ratio
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'flex-start',
                minWidth: { md: '52%' }
              }}
            >
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

            {/* Right side - Filters */}
            <Box 
              component={Paper}
              elevation={2}
              sx={{
                flex: { xs: '1', md: '0.48' }, // Controls width ratio
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                padding: 3,
                borderRadius: 2,
                backgroundColor: 'white',
                minWidth: { md: '48%' }
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Skill Level</InputLabel>
                <Select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  label="Skill Level"
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                variant="outlined"
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  label="Language"
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </motion.div>
        {/* <Box marginTop={3} textAlign="center">
          <strong>Selected Sub-Topic:</strong> {selectedSubTopic || "None"}
        </Box> */}
        {/* <button onClick={fetchExplanation}>Fetch Explanation</button> */}
        {/* Add Loading Indicator */}
        {isLoading && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: 4 
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {/* Add Results Section */}
        {!isLoading && isSearchActive && htmlContent && (
          <Box 
            sx={{
              padding: 3,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '& h2': {
                color: '#333',
                marginBottom: 2
              },
              '& ul': {
                marginLeft: 3
              },
              '& li': {
                marginBottom: 1
              }
            }}
          >
            {/* <div>HIU</div> */}
            <ReactMarkdown>
              {htmlContent.genAI_response || htmlContent}
            </ReactMarkdown>
          </Box>
        )}
      </Container>
    </>
  );
};

export default HomePage;
