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
    this.searchFilter();
    return (
      <div className="container">
        <Header>
          <TabBar
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
          />
        </Header>
        )}
        <CardList
          cardList={this.props.cardList}
          //activeChat={this.props.activeChat}
          selectChat={this.props.selectChat}
        />
      </div>
    );
  }
}

export default Messages;
