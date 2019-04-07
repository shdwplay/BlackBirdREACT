import React, { Component } from "react";
import ChatMenu from "./ChatMenu";
import "./HeaderChat.css";
import Search from "./Search";
import backImage from "../assets/backbutton.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

// import Back from "./Back";

const HeaderChat = props => {
  console.log(props.searchToggle);
  var searchClass = classNames({
    "HeaderChat-search": true,
    open: props.searchToggle
  });
  return (
    <div className="HeaderChat">
      <Link to="/messages">
        <div className="HeaderChat-back">
          <img className="HeaderChat-back-arrow" src={backImage} alt="back" />
        </div>
      </Link>
      {!props.searchToggle && (
        <div className="HeaderChat-user">
          <div className="HeaderChat-user-name">{props.name}</div>
          <div className="HeaderChat-user-status">{props.status}</div>
        </div>
      )}
      <div className={searchClass}>
        <Search
          searchToggle={props.searchToggle}
          openSearch={props.openSearch}
          setQueryString={props.setChatQuerystr}
        />
      </div>
      <div className="HeaderChat-menu">
        <ChatMenu
          silenced={props.silenced}
          favourite={props.favourite}
          highlightedCardOptions={props.highlightedCardOptions}
          openSearch={props.openSearch}
        />
      </div>
    </div>
  );
};

HeaderChat.propTypes = {
  searchToggle: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  openSearch: PropTypes.func,
  setQueryString: PropTypes.func
};

export default HeaderChat;
