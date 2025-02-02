import React, { useState, useEffect } from "react";
import { TextField, Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    onSearch(localSearchTerm);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginY={2} width="100%">
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            borderRadius: "24px",
            height: "56px",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "24px",
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "10px", borderRadius: "24px", height: "56px" }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;