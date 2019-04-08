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
import { showDisplayName } from "../utils";
import classNames from "classnames";

const Card = props => {
  var cardClass = classNames({
    Card: true,
    "Card-unread": props.data.numUnread > 0,
    "Card-read": props.data.numUnread === 0,
    "Card-active": props.data.id === props.activeChat
  });

  return (
    <div onClick={props.onClick} className={cardClass}>
      {showNotifications(props.data.numUnread, props.data.silenced)}
      <div className="Card-Avatar">
        <Avatar name={props.data.name} imgurl={props.data.image} size="small" />
      </div>
      <div className="Card-message-text">
        <div
          className="Card-username"
          dangerouslySetInnerHTML={{
            __html: showDisplayName(props.name, props.querystr)
          }}
        />
        <div className="Card-text-preview">{props.data.lastMsg.text}</div>
      </div>
      <MessageDate
        context="MessageDate"
        date={props.data.lastMsg.date.seconds}
      />
      <div className="Card-dots-area">
        <img
          alt="dots"
          className="Card-dots"
          onClick={evt =>
            dotsOnClick(evt, () => props.setHighlightedCard(props.data.id))
          }
          src={dots}
        />
      </div>
      {props.highlightedCard === props.data.id ? (
        <HighlightedCard
          currentUserId={props.currentUserId}
          highlightedCardId={props.data.id}
          setOption={(a, b, c) => setOption(a, b, c)}
          highlightedCardOptions={props.highlightedCardOptions}
          setFavouriteCard={props.setFavouriteCard}
          setSilenceCard={props.setSilenceCard}
          setUnlistedCard={props.setUnlistedCard}
          silenced={props.silenced}
          favourite={props.favourite}
          listed={props.listed}
          name={props.name}
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
    lastMsg: PropTypes.shape({
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
