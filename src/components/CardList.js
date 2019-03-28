import React, { Component } from "react";
import Card from "./Card";
import "./CardList.css";
import PropTypes from "prop-types";

//props: cardList, activeChat
class CardList extends Component {
  render() {
    return (
      <div className= {`CardList ${(this.props.searchToggle) ? 'CardList-on-top' : ''}`}>
        {this.props.cardList.map((el, index) => (
          <Card
            key={index}
            //isActive={this.props.activeChat === index}
            onClick={() => {
              this.props.selectChat({
                colluctor: el.colluctor,
                status: el.status,
                messages: el.messages
              });
            }}
            data={el}
          />
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
