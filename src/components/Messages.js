import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";

class Messages extends React.Component {
  render() {
    return (
      <div className="container">
        <Header
          name={this.props.name}
          openSearch={this.props.openSearch}
          searchToggle={this.props.searchToggle}
          setQueryString={this.props.setQueryString}
        >
          <TabBar
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
            searchToggle={this.props.searchToggle}
          />
        </Header>
        <CardList
          cardList={this.props.cardList}
          displayNames={this.props.displayNames}
          //activeChat={this.props.activeChat}
          selectChat={this.props.selectChat}
          searchToggle={this.props.searchToggle}
        />
      </div>
    );
  }
}

export default Messages;
