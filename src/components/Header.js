import React from "react";
import "./Header.css";
import logo from "../assets/logo_blackbird.svg";
import Search from "./Search";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <div className="Header">
      <div
        className={`Header-pic-and-logo ${
          props.searchToggle ? "Header-hidden" : null
        }`}
      >
        <Link to={"/profile/"}>
          <div className="Header-profile-pic">
            <Avatar
              size="xsmall"
              name={props.name}
              onClick={props.profilePage}
            />
          </div>
        </Link>
        <div className="Header-logo">
          <img src={logo} alt="BlackBird Logo" />
        </div>
      </div>
      <Search
        className="Header-search"
        searchToggle={props.searchToggle}
        openSearch={props.openSearch}
        setQueryString={props.setQueryString}
        querystr={props.querystr}
      />
      {props.children}
    </div>
  );
};

export default Header;
