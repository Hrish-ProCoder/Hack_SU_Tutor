import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";

const Dropdown = ({ mainTopic, subTopics, selectedSubTopic, setSelectedSubTopic, setSearchTerm }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleSelect = (subTopic) => {
    setSelectedSubTopic(()=>{return subTopic});
    setSearchTerm(()=>{return subTopic});
    handleMouseLeave();
    console.log("Selected subtopic:", subTopic);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: "5px" }}
      >
        {mainTopic}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
        MenuListProps={{ onMouseLeave: handleMouseLeave }}
      >
        {subTopics.map((subTopic, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelect(subTopic)}
            selected={selectedSubTopic === subTopic}
          >
            {subTopic}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
