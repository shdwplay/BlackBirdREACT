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
            name={el.name}
            key={index}
            cardNumber={index}
            activeChat={props.activeChat}
            querystr={props.querystr}
            setHighlightedCard={props.setHighlightedCard}
            highlightedCard={props.highlightedCard}
            highlightedCardOptions={props.highlightedCardOptions}
            silenced={el.silenced}
            favourite={el.favourite}
            onClick={e => {
              console.log(el);
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
  activeChat: PropTypes.shape([PropTypes.string, PropTypes.string]),
  selectChat: PropTypes.func
};
