import React, { Component } from "react";
import threeDotsIcon from "../assets/threedots.svg";
import closeIcon from "../assets/ics.svg";
import PropTypes from "prop-types";
import Modal from "./Modal";
import "./ChatMenu.css";

class ChatMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modal: false
    };
  }

  hideModal() {
    this.setState({ modal: false });
  }

  toggleShow() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    if (!this.state.show) {
      return (
        <div className="chat-menu">
          {this.state.modal && (
            <Modal
              alertTitle={`Delete chat with ${this.props.collocutorId}`}
              buttons={true}
              hide={() => this.hideModal()}
              setUnlistedCard={this.props.setUnlistedCard}
              currentUserId={this.props.currentUserId}
              listed={this.props.listed}
            />
          )}
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
            onClick={evt => {
              this.toggleShow();
              evt.preventDefault();
              evt.stopPropagation();
              console.log("delete chat");
              this.setState({ modal: true });
            }}
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
