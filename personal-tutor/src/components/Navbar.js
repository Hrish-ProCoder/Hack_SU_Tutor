import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          HomePage
        </Typography>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
