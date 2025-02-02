import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const TrendingCard = ({ title, description, imageUrl }) => {
  const cardStyle = imageUrl
    ? {
        maxWidth: 300,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        color: "#fff",
      }
    : {
        maxWidth: 300,
        backgroundColor: "#333",
        position: "relative",
        color: "#fff",
      };

  return (
    <Card className="m-2" style={cardStyle}>
      <CardContent
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="inherit">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrendingCard;