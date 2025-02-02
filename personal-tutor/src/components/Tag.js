import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Tag = ({ label, isSelected, onClick }) => {
  return (
    <span
      className={`badge m-1 ${isSelected ? "bg-primary text-white" : "bg-light text-dark"}`}
      style={{
        borderRadius: "12px",
        padding: "10px 20px",
        fontSize: "14px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default Tag;