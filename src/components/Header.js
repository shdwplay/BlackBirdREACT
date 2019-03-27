import React, { Component } from "react";
import "./Header.css";
import logo from "../assets/logo_blackbird.svg";
import Search from "./Search";
import Avatar from "./Avatar";
import pic1 from "../assets/profile1.jpg";

class Header extends Component {
  state = {
    toggleOpen: false
  };
  setSearchOpen() {
    this.setState({
      toggleOpen: !this.state.toggleOpen
    });
  }
  render() {
    return (
      <div className="Header">
        {!this.state.toggleOpen && (
          <div className="Header-profile-pic">
            <Avatar size="xsmall" imgurl={pic1} name="Edoardo Accivile" />
          </div>
        )}
        {!this.state.toggleOpen && (
          <div className="Header-logo">
            <img src={logo} alt="BlackBird Logo" />
          </div>
        )}
        <Search
          className="Header-search"
          toggleOpen={this.state.toggleOpen}
          openSearch={() => this.setSearchOpen()}
        />
      </div>
    );
  }
}

export default Header;
