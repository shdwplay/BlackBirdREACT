import React, { Component } from "react";
import threeDotsIcon from "../assets/threedots.svg";
import closeIcon from "../assets/ics.svg";
import "./ChatMenu.css";
import PropTypes from "prop-types";
import { setOption } from "../utils";

class ChatMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }
  // toggleFavourite() {
  //   this.setState({
  //     favourite: !this.state.favourite
  //   });
  //   // console.log('favourite: ' +this.state.favourite)
  // }
  // toggleMute() {
  //   this.setState({
  //     muted: !this.state.muted
  //   });
  //   // console.log('muted: ' +this.state.muted)
  // }

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
          <div
            className="option"
            onClick={() => {
              this.props.setFavouriteCard(
                this.props.currentUserId,
                this.props.collocutorId,
                this.props.favourite
              );
            }}
          >
            {this.props.favourite ? (
              <p>Remove from Favourites</p>
            ) : (
              <p>Add Favourite</p>
            )}
          </div>
          <div
            className="option"
            onClick={() => {
              this.props.setSilenceCard(
                this.props.currentUserId,
                this.props.collocutorId,
                this.props.silenced
              );
            }}
          >
            {this.props.silenced ? <p>Unsilenced</p> : <p>Silenced</p>}
          </div>
          <div
            className="option"
            onClick={() => {
              this.toggleShow();
              this.props.openSearch();
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
