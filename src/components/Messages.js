import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";
import { calcCardList } from "../utils";
import PropTypes from "prop-types";

const Messages = props => {
  const filteredCardList = calcCardList(
    props.favouritesActive,
    props.querystr,
    props.collocutors
  );
  return (
    <div className="container">
      <Header
        url={props.match.url}
        name={props.name}
        currentUser={props.currentUser}
        openSearch={props.openSearch}
        searchToggle={props.searchToggle}
        setQueryString={props.setQueryString}
        querystr={props.querystr}
      >
        <TabBar
          activeTab={props.activeTab}
          selectTab={props.selectTab}
          searchToggle={props.searchToggle}
          toggleFavourites={props.toggleFavourites}
        />
      </Header>
      <CardList
        setHighlightedCard={props.setHighlightedCard}
        highlightedCard={props.highlightedCard}
        highlightedCardOptions={props.highlightedCardOptions}
        activeChat={props.activeChat}
        cardList={filteredCardList}
        selectChat={props.selectChat}
        searchToggle={props.searchToggle}
        querystr={props.querystr}
      />
    </div>
  );
};

export default Messages;

Messages.propTypes = {
  name: PropTypes.string,
  openSearch: PropTypes.func,
  searchToggle: PropTypes.bool,
  setQueryString: PropTypes.func,
  querystr: PropTypes.string,
  highlightedCard: PropTypes.number,
  setHighlightedCard: PropTypes.func,
  highlightedCardOptions: PropTypes.func,
  cardList: PropTypes.array
};
