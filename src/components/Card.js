import React from "react";
import "./Card.css";
import Avatar from "./Avatar.js";
import MessageDate from "./MessageDate";
import dots from "../assets/dots.png";
import PropTypes from "prop-types";

import HighlightedCard from "./HighlightedCard";

import { showNotifications } from "../utils";

import { dotsOnClick } from "../utils";
import { setOption } from "../utils";

const Card = props => {
  var cardClass = "Card";
  props.data.numUnread > 0
    ? (cardClass += " Card-unread")
    : (cardClass += " Card-read");

  return (
    <div onClick={props.onClick} className={cardClass}>
      {showNotifications(props.data.numUnread, props.data.silenced)}
      <div className="Card-Avatar">
        <Avatar
          name={props.data.name}
          imgurl={props.data.image}
          size="small"
          onClick={() => console.log("for use in profile")}
        />
      </div>
      <div className="Card-message-text">
        <div
          className="Card-username"
          dangerouslySetInnerHTML={{
            __html: props.displayName
          }}
        />
        <div className="Card-text-preview">{props.data.lastMessage.text}</div>
      </div>
      <MessageDate context="MessageDate" date={props.data.lastMessage.date} />
      <div className="Card-dots-area">
        <img
          alt="dots"
          className="Card-dots"
          onClick={evt =>
            dotsOnClick(evt, () => props.setHighlightedCard(props.cardNumber))
          }
          src={dots}
        />
      </div>
      {props.highlightedCard === props.cardNumber ? (
        <HighlightedCard
          setOption={(a, b, c) => setOption(a, b, c)}
          highlightedCardOptions={props.highlightedCardOptions}
          silenced={props.silenced}
          favourite={props.favourite}
          closeHighlightedCard={evt => {
            evt.preventDefault();
            evt.stopPropagation();
            props.setHighlightedCard(null);
          }}
        />
      ) : null}
    </div>
  );
};

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
