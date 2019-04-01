import React, { Component } from "react";
import "./Header.css";
import logo from "../assets/logo_blackbird.svg";
import Search from "./Search";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div
          className={`Header-pic-and-logo ${
            this.props.searchToggle ? "Header-hidden" : null
          }`}
        >
          <Link to="/profile">
            <div className="Header-profile-pic">
              <Avatar
                size="xsmall"
                name={this.props.name}
                onClick={this.props.profilePage}
              />
            </div>
          </Link>
          <div className="Header-logo">
            <img src={logo} alt="BlackBird Logo" />
          </div>
        </div>
        <Search
          className="Header-search"
          searchToggle={this.props.searchToggle}
          openSearch={this.props.openSearch}
          setQueryString={this.props.setQueryString}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Header;
