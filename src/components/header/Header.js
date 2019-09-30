import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";

const Header = ({ logo, title, userIcon, notifications, toggleModal }) => {
  return (
    <div id="header">
      <Link to="/" className="title-nav">
        {logo ? (
          <div className="logo">
            <img src={logo} alt="Site logo" />
          </div>
        ) : null}
        {title ? title : null}
      </Link>
      <div className="navigation">
        <Link to="/changelog" className="nav-link">
          Logs
        </Link>
        {userIcon ? (
          <div className="nav-link avatar" onClick={toggleModal}>
            <img src={userIcon} alt="User Icon" />
          </div>
        ) : null}
        {notifications ? (
          <div className="notification-icon">
            <span>{notifications}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
