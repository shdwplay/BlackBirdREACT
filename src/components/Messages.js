import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";

class Messages extends React.Component {
  render() {
    return (
      <div className="container">
        <Header
          url={this.props.match.url}
          name={this.props.name}
          currentUser={this.props.currentUser}
          openSearch={this.props.openSearch}
          searchToggle={this.props.searchToggle}
          setQueryString={this.props.setQueryString}
          querystr={this.props.querystr}
        >
          <TabBar
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
            searchToggle={this.props.searchToggle}
          />
        </Header>
        <CardList
          setHighlightedCard={this.props.setHighlightedCard}
          highlightedCard={this.props.highlightedCard}
          highlightedCardOptions={this.props.highlightedCardOptions}
          cardList={this.props.cardList}
          displayNames={this.props.displayNames}
          selectChat={this.props.selectChat}
          searchToggle={this.props.searchToggle}
        />
      </div>
    );
  }
}

export default Messages;
