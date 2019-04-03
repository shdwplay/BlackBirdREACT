import React from "react";
import "./TabBar.css";
import { NavLink } from "react-router-dom";
import favouritesIcon from "../assets/favourites.svg";
import messagesIcon from "../assets/messages.svg";
import sendNewIcon from "../assets/new_chat.svg";

import PropTypes from "prop-types";
//props active tab, selectTab
const TabBar = props => {
  return (
    <div className={`TabBar ${props.searchToggle ? "TabBar-hidden" : ""}`}>
      <div
        className="Tab-element"
        onClick={() => {
          props.selectTab("favourites");
          props.toggleFavourites();
        }}
      >
        {props.activeTab === "favourites" ? (
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={favouritesIcon}
          />
        ) : (
          <span>Favourites</span>
        )}
      </div>
      <div
        className="Tab-element"
        onClick={() => {
          props.selectTab("messages");
          props.toggleFavourites();
        }}
      >
        {props.activeTab === "messages" ? (
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={messagesIcon}
          />
        ) : (
          <span>Messages</span>
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
          <span>Send New</span>
        )}
      </div>
    </div>
  );
};
export default TabBar;

TabBar.propTypes = {
  searchToggle: PropTypes.bool.isRequired
};
