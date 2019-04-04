import React, { Component } from "react";
import threeDotsIcon from "../assets/threedots.svg";
import closeIcon from "../assets/ics.svg";
import "./ChatMenu.css";
import PropTypes from "prop-types";

class ChatMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      favourite: false,
      muted: false
    };
  }

  toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }
  toggleFavourite() {
    this.setState({
      favourite: !this.state.favourite
    });
    // console.log('favourite: ' +this.state.favourite)
  }
  toggleMute() {
    this.setState({
      muted: !this.state.muted
    });
    // console.log('muted: ' +this.state.muted)
  }

  render() {
    if (!this.state.show) {
      return (
        <div className="chat-menu">
          <img
            className="open-icon"
            src={threeDotsIcon}
            alt="more"
            onClick={() => this.toggleShow()}
          />
        </div>
      );
    }
    return (
      <div className="chat-menu">
        <img
          className="close-icon"
          src={closeIcon}
          alt="close"
          onClick={() => this.toggleShow()}
        />
        <div className="menu">
          <div className="option" onClick={() => this.toggleFavourite()}>
            {this.state.favourite ? (
              <p>Remove from Favourites</p>
            ) : (
              <p>Add Favourite</p>
            )}
          </div>
          <div className="option" onClick={() => this.toggleMute()}>
            {this.state.muted ? <p>Unmute</p> : <p>Mute</p>}
          </div>
          <div
            className="option"
            onClick={() => {
              this.toggleShow();
              this.props.onClick();
            }}
          >
            Search
          </div>
          <div
            className="option"
            onClick={() => console.log("Delete Conversation")}
          >
            Delete Conversation
          </div>
        </div>
      </div>
    );
  }
}

ChatMenu.propTypes = {};

export default ChatMenu;
