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
            displayName={props.displayNames[index]}
            key={index}
            cardNumber={index}
            setHighlightedCard={props.setHighlightedCard}
            highlightedCard={!props.searchToggle ? props.highlightedCard : null}
            highlightedCardOptions={props.highlightedCardOptions}
            silenced={el.silenced}
            favourite={el.favourite}
            //isActive={props.activeChat === index}
            onClick={() => {
              props.selectChat({
                collocutor: el.name,
                status: el.status,
                messages: el.messages
              });
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
