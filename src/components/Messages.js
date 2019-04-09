import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import Workspace from "./Workspace";
import CardList from "./CardList";
import { calcCardList } from "../utils";
import PropTypes from "prop-types";
import "./Messages.css";
const Messages = props => {
  const filteredCardList = calcCardList(
    props.favouritesActive,
    props.querystr,
    props.collocutors
  );
  return (
    <div
      className={`Messages-container ${
        props.activeChat ? "tabletMessage" : ""
      }`}
    >
      <Header
        url={props.match.url}
        name={props.name}
        openSearch={props.openSearch}
        searchToggle={props.searchToggle}
        setQueryString={props.setQueryString}
        querystr={props.querystr}
      >
        <TabBar
          context="onlymobile"
          activeTab={props.activeTab}
          selectTab={props.selectTab}
          searchToggle={props.searchToggle}
          toggleFavourites={props.toggleFavourites}
        />
      </Header>
      <CardList
        currentUserId={props.currentUserId}
        cardList={filteredCardList}
        activeChat={props.activeChat}
        selectChat={props.selectChat}
        searchToggle={props.searchToggle}
        querystr={props.querystr}
        setHighlightedCard={props.setHighlightedCard}
        highlightedCard={props.highlightedCard}
        highlightedCardOptions={props.highlightedCardOptions}
        setFavouriteCard={props.setFavouriteCard}
        setSilenceCard={props.setSilenceCard}
        setUnlistedCard={props.setUnlistedCard}
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
