import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";

const Messages = props => {
  return (
    <div className="container">
      <Header
        name={props.name}
        openSearch={props.openSearch}
        searchToggle={props.searchToggle}
        setQueryString={props.setQueryString}
        querystr={props.querystr}
      >
        <TabBar
          activeTab={props.activeTab}
          selectTab={props.selectTab}
          searchToggle={props.searchToggle}
        />
      </Header>
      <CardList
        setHighlightedCard={props.setHighlightedCard}
        highlightedCard={props.highlightedCard}
        cardList={props.cardList}
        displayNames={props.displayNames}
        //activeChat={props.activeChat}
        selectChat={props.selectChat}
        searchToggle={props.searchToggle}
      />
    </div>
  );
};

export default Messages;
