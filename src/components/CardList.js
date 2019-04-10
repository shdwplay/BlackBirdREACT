import React from "react";
import Card from "./Card";
import "./CardList.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//props: cardList, activeChat
const CardList = props => {
  return (
    <div className={`CardList ${props.searchToggle ? "CardList-on-top" : ""}`}>
      {props.cardList.map((el, index) => (
        <Link to={"/messages/" + el.id}>
          <Card
            currentUserId={props.currentUserId}
            name={el.name}
            key={index}
            cardNumber={index}
            activeChat={props.activeChat}
            querystr={props.querystr}
            setHighlightedCard={props.setHighlightedCard}
            highlightedCard={props.highlightedCard}
            highlightedCardOptions={props.highlightedCardOptions}
            setFavouriteCard={props.setFavouriteCard}
            setSilenceCard={props.setSilenceCard}
            setUnlistedCard={props.setUnlistedCard}
            silenced={el.silenced}
            favourite={el.favourite}
            listed={el.listed}
            onClick={e => {
              //console.log(el);
              props.selectChat(el.id);
            }}
            data={el}
          />
        </Link>
      ))}
    </div>
  );
};

export default CardList;

CardList.propTypes = {
  cardList: PropTypes.array,
  activeChat: PropTypes.string,
  selectChat: PropTypes.func
};
