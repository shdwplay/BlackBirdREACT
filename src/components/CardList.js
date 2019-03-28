import React, { Component } from "react";
import Card from "./Card";
import "./CardList.css";
import configSecond from "./listConfigSecond";
import PropTypes from "prop-types";

//props: cardList, activeChat
class CardList extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.setState(configSecond);
    }, 2000);
  }

  render() {
    return (
      <div className="CardList">
        {this.props.cardList.map((el, index) => (
          <Card
            key={index}
            isActive={this.props.activeChat === index}
            onClick={() => {
              this.props.selectChat();
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
