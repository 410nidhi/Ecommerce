import React from "react";
import "./NotFound.css";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <ErrorIcon />
      <h1>Page Not Found</h1>
      <Link to="/">
        <div className="homeLink">
          <p>HOME</p>
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
