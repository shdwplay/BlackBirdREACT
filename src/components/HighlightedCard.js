import React, { Component } from "react";
import "./HighlightedCard.css";
import silenceIcon from "../assets/silenceIcon.svg";
import unsilenceIcon from "../assets/unsilenceIcon.svg";
import removeFromFavIcon from "../assets/removeFromFavIcon.svg";
import addToFavIcon from "../assets/addToFavIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import closeXW from "../assets/closeXW.svg";
import PropTypes from "prop-types";

const HighlightedCard = props => {
  return (
    <div className="HighlightedCard">
      <div
        className="HighlightedCard-silence"
        onClick={evt =>
          props.setOption(evt, "silenced", props.highlightedCardOptions)
        }
      >
        <img src={props.silenced ? unsilenceIcon : silenceIcon} alt="silence" />
        <div className="label">{props.silenced ? "Unsilence" : "Silence"}</div>
      </div>
      <div
        className="HighlightedCard-remove"
        onClick={evt =>
          props.setOption(evt, "favourite", props.highlightedCardOptions)
        }
      >
        <img
          src={props.favourite ? removeFromFavIcon : addToFavIcon}
          alt="remove from favourites"
        />
        <div className="HighlightedCard-label">
          {props.favourite ? "Remove From Favourites" : "Add to Favourites"}
        </div>
      </div>
      <div
        className="HighlightedCard-delete"
        onClick={() => console.log("delete chat")}
      >
        <img src={deleteIcon} alt="delete" />
        <div className="HighlightedCard-label">Delete</div>
      </div>
      <img
        className="HighlightedCard-close-button"
        onClick={props.closeHighlightedCard}
        src={closeXW}
        alt="close button"
      />
    </div>
  );
};

export default HighlightedCard;

HighlightedCard.propTypes = {
  favourite: PropTypes.bool.isRequired,
  silence: PropTypes.bool.isRequired
};
