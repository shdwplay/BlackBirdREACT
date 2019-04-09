import React from "react";
import "./TabBar.css";
import { Link } from "react-router-dom";
import favouritesIcon from "../assets/favourites.svg";
import messagesIcon from "../assets/messages.svg";
import sendNewIcon from "../assets/new_chat.svg";
import favouritesIconW from "../assets/favourites_w.svg";
import messagesIconW from "../assets/messages_w.svg";
import sendNewIconW from "../assets/sendnew_w.svg";
import favouritesIconO from "../assets/favourites_o.svg";
import messagesIconO from "../assets/messages_o.svg";
import sendNewIconO from "../assets/newchat_o.svg";
import { getContacts } from "../api";

import PropTypes from "prop-types";
//props active tab, selectTab
const TabBar = props => {
  return (
    <div
      className={`TabBar ${props.context} ${
        props.searchToggle ? "TabBar-hidden" : ""
      }`}
    >
      <div
        className={`Tab-element ${
          props.activeTab === "favourites" ? "iconattiva" : ""
        }`}
        onClick={() => {
          props.selectTab("favourites");
          props.toggleFavourites();
        }}
      >
        {/* {props.activeTab === "favourites" ? ( */}
        <img
          className="TabBar-Icon"
          alt="go to favourites"
          src={
            props.context === "onlytablet"
              ? favouritesIconW
              : props.activeTab === "favourites"
              ? favouritesIcon
              : favouritesIconO
          }
        />
        <span>Favourites</span>
      </div>
      <div
        className={`Tab-element ${
          props.activeTab === "messages" ? "iconattiva" : ""
        }`}
        onClick={() => {
          props.selectTab("messages");
          props.toggleFavourites();
        }}
      >
        <img
          className="TabBar-Icon"
          alt="go to favourites"
          src={
            props.context === "onlytablet"
              ? messagesIconW
              : props.activeTab === "messages"
              ? messagesIconO
              : messagesIcon
          }
        />

        <span>Messages</span>
      </div>
      <div
        className={`Tab-element ${
          props.activeTab === "send-new" ? "iconattiva" : ""
        }`}
        onClick={() => props.selectTab("sendNew")}
      >
        <img
          className="TabBar-Icon"
          alt="go to favourites"
          src={
            props.context === "onlytablet"
              ? sendNewIconW
              : props.activeTab === "send-new"
              ? sendNewIcon
              : sendNewIconO
          }
        />

        <Link to="/sendnew">Send New</Link>
      </div>
    </div>
  );
};
export default TabBar;

TabBar.propTypes = {
  searchToggle: PropTypes.bool.isRequired
};
