import React, { Component } from "react";
import "./Card.css";
import Avatar from "./Avatar.js";
import MessageDate from "./MessageDate";
import dots from "../assets/dots.png";
import PropTypes from "prop-types";

import HighlightedCard from "./HighlightedCard";

import { showNotifications } from "../utils";

const getUnread = num => {
  if (num === 0) return "Card Card-inactive";
  else return "Card Card-active";
};

const getActive = bool => {
  if (bool) return "Card-selected";
  else return null;
};

class Card extends Component {
  state = {
    highlighted: false,
    favourite: this.props.data.favourite,
    silenced: this.props.data.silenced
  };

  dotsF(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ highlighted: true });
    console.log("highlight card");
  }

  setFavourite(evt) {
    evt.stopPropagation();
    this.setState({
      favourite: !this.state.favourite
    });
  }

  setSilenced(evt) {
    evt.stopPropagation();
    this.setState({
      silenced: !this.state.silenced
    });
  }

  setHighlight(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({
      highlighted: !this.state.highlighted
    });
  }

  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={
          getUnread(this.props.data.numUnread) +
          " " +
          getActive(this.props.isActive)
        }
      >
        {showNotifications(this.props.data.numUnread, this.props.data.silenced)}
        <div className="Card-Avatar">
          <Avatar
            name={this.props.data.name}
            imgurl={this.props.data.image}
            size="small"
            onClick={() => console.log("for use in profile")}
          />
        </div>
        <div className="Card-message-text">
          <div className="Card-username">{this.props.data.name}</div>
          <div className="Card-text-preview">
            {this.props.data.lastMessage.text}
          </div>
        </div>
        <MessageDate
          context="MessageDate"
          date={this.props.data.lastMessage.date}
        />
        <div className="Card-dots-area">
          <img
            alt="dots"
            className="Card-dots"
            onClick={evt => this.dotsF(evt)}
            src={dots}
          />
        </div>
        {this.state.highlighted ? (
          <HighlightedCard
            favourite={this.state.favourite}
            silence={this.state.silenced}
            fav={evt => this.setFavourite(evt)}
            sil={evt => this.setSilenced(evt)}
            high={evt => this.setHighlight(evt)}
          />
        ) : null}
      </div>
    );
  }
}

export default Card;

Card.propTypes = {
  data: PropTypes.shape({
    collocutor: PropTypes.string.isRequired,
    image: PropTypes.any,
    lastMessage: PropTypes.shape({
      sender: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string
    }),
    lastOpened: PropTypes.string.isRequired,
    silenced: PropTypes.bool.isRequired,
    numUnread: PropTypes.string,
    onClick: PropTypes.func
  })
};
