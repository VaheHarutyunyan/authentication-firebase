import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";

const Card = ({ title, href, hrefName, paragraph, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">{children}</div>
      <div className="card-footer">
        <span>{paragraph}</span> <Link to={href}>{hrefName}</Link>
      </div>
    </div>
  );
};

export default Card;
