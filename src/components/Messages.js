import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";

class Messages extends React.Component {
  render() {
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
          selectChat={x => this.selectChat(x)}
        />
      </div>
    );
  }
}

export default Messages;
