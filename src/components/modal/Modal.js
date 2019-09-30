import React from "react";

import Card from "../card/Card";
import "./modal.styles.scss";

const Modal = ({ collections }) => {
  return (
    <div className="modal">
      {collections.length
        ? collections.map((collection, i) => <Card key={i} {...collection} />)
        : ""}
    </div>
  );
};

export default Modal;
