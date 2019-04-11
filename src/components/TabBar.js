import React from "react";
import "./TabBar.css";
import { Link } from "react-router-dom";
import favouritesIcon from "../assets/favourites.svg";
import messagesIcon from "../assets/messages.svg";
import sendNewIcon from "../assets/new_chat.svg";
import { getContacts } from "../api";
import favouritesIconW from "../assets/favourites_w.svg";
import messagesIconW from "../assets/messages_w.svg";
import sendNewIconW from "../assets/sendnew_w.svg";
import favouritesIconO from "../assets/favourites_o.svg";
import messagesIconO from "../assets/messages_o.svg";
import sendNewIconO from "../assets/newchat_o.svg";

import PropTypes from "prop-types";
//props active tab, selectTab
const TabBar = props => {
  return (
    <div
      className={`TabBar ${props.context} ${
        props.searchToggle ? "TabBar-hidden" : ""
      }`}
    >
      <Link to="/messages/">
        <div
          className={`Tab-element ${
            props.activeTab === "favourites" ? "iconattiva" : ""
          }`}
          onClick={() => {
            props.selectTab("favourites");
          }}
        >
          {/* {props.activeTab === "favourites" ? ( */}
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={
              props.context === "onlytablet"
                ? props.activeTab === "favourites"
                  ? favouritesIconO
                  : favouritesIconW
                : props.activeTab === "favourites"
                ? favouritesIcon
                : favouritesIconO
            }
          />
          <span>Favourites</span>
        </div>
      </Link>
      <Link to="/messages/">
        <div
          className={`Tab-element ${
            props.activeTab === "messages" ? "iconattiva" : ""
          }`}
          onClick={() => {
            props.selectTab("messages");
          }}
        >
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={
              props.context === "onlytablet"
                ? props.activeTab === "messages"
                  ? messagesIconO
                  : messagesIconW
                : props.activeTab === "messages"
                ? messagesIcon
                : messagesIconO
            }
          />

          <span>Messages</span>
        </div>
      </Link>
      <Link to="/sendnew">
        <div
          className={`Tab-element ${
            props.activeTab === "sendNew" ? "iconattiva" : ""
          }`}
          onClick={() => props.selectTab("sendNew")}
        >
          <img
            className="TabBar-Icon"
            alt="go to favourites"
            src={
              props.context === "onlytablet"
                ? props.activeTab === "sendNew"
                  ? sendNewIconO
                  : sendNewIconW
                : props.activeTab === "sendNew"
                ? sendNewIcon
                : sendNewIconO
            }
          />
          <span>Send New</span>
        </div>
      </Link>
    </div>
  );
};
export default TabBar;

TabBar.propTypes = {
  searchToggle: PropTypes.bool.isRequired
};
