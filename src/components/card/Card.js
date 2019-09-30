import React from "react";

import "./card.styles.scss";

const Card = ({ header, description, date }) => {
  return (
    <div className="card">
      <div className="date">{date}</div>
      <div className="content">
        <h2 className="header">{header}</h2>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
