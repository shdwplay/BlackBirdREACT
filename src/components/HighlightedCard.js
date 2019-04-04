import React from "react";
import "./HighlightedCard.css";
import silenceIcon from "../assets/silenceIcon.svg";
import unsilenceIcon from "../assets/unsilenceIcon.svg";
import removeFromFavIcon from "../assets/removeFromFavIcon.svg";
import addToFavIcon from "../assets/addToFavIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import closeXW from "../assets/closeXW.svg";
import PropTypes from "prop-types";
import Modal from "./Modal";

class HighlightedCard extends React.Component {
  state = { modal: false };
  hideModal() {
    this.setState({ modal: false });
  }
  render() {
    return (
      <div className="HighlightedCard">
        {this.state.modal && (
          <Modal
            alertTitle={`Delete chat with ${this.props.name}`}
            buttons={true}
            hide={() => this.hideModal()}
          />
        )}
        <div
          className="HighlightedCard-silence"
          onClick={evt =>
            this.props.setOption(
              evt,
              "silenced",
              this.props.highlightedCardOptions
            )
          }
        >
          <img
            src={this.props.silenced ? unsilenceIcon : silenceIcon}
            alt="silence"
          />
          <div className="label">
            {this.props.silenced ? "Unsilence" : "Silence"}
          </div>
        </div>
        <div
          className="HighlightedCard-remove"
          onClick={evt =>
            this.props.setOption(
              evt,
              "favourite",
              this.props.highlightedCardOptions
            )
          }
        >
          <img
            src={this.props.favourite ? removeFromFavIcon : addToFavIcon}
            alt="remove from favourites"
          />
          <div className="HighlightedCard-label">
            {this.props.favourite
              ? "Remove From Favourites"
              : "Add to Favourites"}
          </div>
        </div>
        <div
          className="HighlightedCard-delete"
          onClick={evt => {
            console.log("delete chat");
            this.setState({ modal: true });
            this.props.setOption(
              evt,
              "delete",
              this.props.highlightedCardOptions
            );
          }}
        >
          <img src={deleteIcon} alt="delete" />
          <div className="HighlightedCard-label">Delete</div>
        </div>
        <img
          className="HighlightedCard-close-button"
          onClick={this.props.closeHighlightedCard}
          src={closeXW}
          alt="close button"
        />
      </div>
    );
  }
}

export default HighlightedCard;

HighlightedCard.propTypes = {
  modal: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  favourite: PropTypes.bool.isRequired,
  silenced: PropTypes.bool.isRequired,
  highlightedCardOptions: PropTypes.func,
  closeHighlightedCard: PropTypes.func
};
