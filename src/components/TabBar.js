import React from "react";
import "./TabBar.css";
import { Link } from "react-router-dom";
import favouritesIcon from "../assets/favourites.svg";
import messagesIcon from "../assets/messages.svg";
import sendNewIcon from "../assets/new_chat.svg";
import { getContacts } from "../api";

import PropTypes from "prop-types";
//props active tab, selectTab
const TabBar = props => {
  return (
    <div className={`TabBar ${props.searchToggle ? "TabBar-hidden" : ""}`}>
      <div
        className="Tab-element"
        onClick={() => {
          props.selectTab("favourites");
          //props.toggleFavourites();
        }}
      >
        {props.activeTab === "favourites" ? (
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={favouritesIcon}
          />
        ) : (
          <Link to="/messages/">Favourites</Link>
        )}
      </div>
      <div
        className="Tab-element"
        onClick={() => {
          props.selectTab("messages");
          //props.toggleFavourites();
        }}
      >
        {props.activeTab === "messages" ? (
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={messagesIcon}
          />
        ) : (
          <Link to="/messages/">Messages</Link>
        )}
      </div>
      <div className="Tab-element" onClick={() => props.selectTab("sendNew")}>
        {props.activeTab === "sendNew" ? (
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={sendNewIcon}
          />
        ) : (
          <Link to="/sendnew">Send New</Link>
        )}
      </div>
    </div>
  );
};
export default TabBar;

TabBar.propTypes = {
  searchToggle: PropTypes.bool.isRequired
};
