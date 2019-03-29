import React, { Component } from "react";
import Card from "./Card";
import "./CardList.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//props: cardList, activeChat
class CardList extends Component {
  render() {
    return (
      <div
        className={`CardList ${
          this.props.searchToggle ? "CardList-on-top" : ""
        }`}
      >
        {this.props.cardList.map((el, index) => (
          <Link to={"/chat/" + el.id}>
            <Card
              displayName={this.props.displayNames[index]}
              key={index}
              //isActive={this.props.activeChat === index}
              onClick={() => {
                this.props.selectChat({
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
  }
}

export default CardList;

CardList.propTypes = {
  cardList: PropTypes.array,
  activeChat: PropTypes.shape([PropTypes.string, PropTypes.string]),
  selectChat: PropTypes.func
};
