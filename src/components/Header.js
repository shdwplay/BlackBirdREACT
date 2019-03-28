import React, { Component } from "react";
import "./Header.css";
import logo from "../assets/logo_blackbird.svg";
import Search from "./Search";
import Avatar from "./Avatar";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        {!this.props.searchToggle && (
          <div className="Header-profile-pic">
            <Avatar
              size="xsmall"
              name="Edoardo Accivile"
              onClick={this.props.profilePage}
            />
          </div>
        )}
        {!this.props.searchToggle && (
          <div className="Header-logo">
            <img src={logo} alt="BlackBird Logo" />
          </div>
        )}
        <Search
          className="Header-search"
          searchToggle={this.props.searchToggle}
          openSearch={this.props.openSearch}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Header;
