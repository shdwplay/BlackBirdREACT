import React from "react";
import "./TabBar.css";
import { NavLink } from "react-router-dom";
import favouritesIcon from "../assets/favourites.svg";
import messagesIcon from "../assets/messages.svg";
import sendNewIcon from "../assets/new_chat.svg";

import PropTypes from "prop-types";

export default class TabBar extends React.Component {
  render() {
    return (
      <div className={`TabBar ${this.props.searchToggle ? "TabBar-hidden" : ""}`}>
        <NavLink to="/favourites">
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={favouritesIcon}
          />
          <span>
            Favourites
          </span>
        </NavLink>
        <NavLink to="/messages">
          <img
            className="TabBar-Icon"
            alt="go to messages"
            src={messagesIcon}
          />
          <span>Messages</span>
        </NavLink>
        <NavLink to="/sendnew">
          <img className="TabBar-Icon" alt="go to send new" src={sendNewIcon} />
          <span>Send New</span>
        </NavLink>
      </div>
    );
  }
}

TabBar.propTypes = {
  searchToggle: PropTypes.bool.isRequired
};
