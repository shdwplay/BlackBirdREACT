import React, { Component } from "react";
import ChatMenu from "./ChatMenu";
import "./HeaderChat.css";
import Search from "./Search";
import PropTypes from "prop-types";

// import Back from "./Back";

class HeaderChat extends Component {
  render() {
    return (
      <div className="headerchat">
        {!this.props.searchToggle && (
          <div className="user">
            <div className="name">{this.props.name}</div>
            <div className="status">{this.props.status}</div>
          </div>
        )}
        <Search
          searchToggle={this.props.searchToggle}
          openSearch={this.props.openSearch}
          setQueryString={this.props.setQueryString}
        />
        <ChatMenu
          silenced={this.props.silenced}
          favourite={this.props.favourite}
          highlightedCardOptions={this.props.highlightedCardOptions}
          openSearch={this.props.openSearch} />
      </div>
    );
  }
}

HeaderChat.propTypes = {};

export default HeaderChat;
