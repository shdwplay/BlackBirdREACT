import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import Workspace from "./Workspace";
import CardList from "./CardList";
import { calcCardList } from "../utils";
import PropTypes from "prop-types";
import "./Messages.css";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.props.selectTab("messages");
  }

  render() {
    const filteredCardList = calcCardList(
      this.props.favouritesActive,
      this.props.querystr,
      this.props.collocutors
    );
    return (
      <div
        className={`Messages-container ${
          this.props.activeChat ? "tabletMessage" : ""
        }`}
      >
        <Header
          url={this.props.match.url}
          name={this.props.name}
          openSearch={this.props.openSearch}
          searchToggle={this.props.searchToggle}
          setQueryString={this.props.setQueryString}
          querystr={this.props.querystr}
        >
          <TabBar
            context="onlymobile"
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
            searchToggle={this.props.searchToggle}
            toggleFavourites={this.props.toggleFavourites}
          />
        </Header>
        <CardList
          currentUserId={this.props.currentUserId}
          cardList={filteredCardList}
          activeChat={this.props.activeChat}
          selectChat={this.props.selectChat}
          searchToggle={this.props.searchToggle}
          querystr={this.props.querystr}
          setHighlightedCard={this.props.setHighlightedCard}
          highlightedCard={this.props.highlightedCard}
          highlightedCardOptions={this.props.highlightedCardOptions}
          setFavouriteCard={this.props.setFavouriteCard}
          setSilenceCard={this.props.setSilenceCard}
          setUnlistedCard={this.props.setUnlistedCard}
        />
      </div>
    );
  }
}

export default Messages;

Messages.propTypes = {
  name: PropTypes.string,
  openSearch: PropTypes.func,
  searchToggle: PropTypes.bool,
  setQueryString: PropTypes.func,
  querystr: PropTypes.string,
  highlightedCard: PropTypes.string,
  setHighlightedCard: PropTypes.func,
  highlightedCardOptions: PropTypes.func,
  cardList: PropTypes.array
};
