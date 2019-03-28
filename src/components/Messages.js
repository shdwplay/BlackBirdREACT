import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";
//props searchString
class Messages extends React.Component {
  searchFilter(str) {
    let names;
    let filtered;
  }
  render() {
    return (
      <div className="container">
        <Header
          openSearch={this.props.openSearch}
          searchToggle={this.props.searchToggle}
        >
          <TabBar
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
            searchToggle={this.props.searchToggle}
          />
        </Header>
        <CardList
          cardList={this.props.cardList}
          //activeChat={this.props.activeChat}
          selectChat={this.props.selectChat}
          searchToggle={this.props.searchToggle}
        />
      </div>
    );
  }
}

export default Messages;
