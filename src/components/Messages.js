import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";

class Messages extends React.Component {
  render() {
    return (
      <div className="container">
        <Header>
          <TabBar />
        </Header>
        )}
        <CardList
          cardList={[]}
          activeChat={this.props.activeChat}
          selectChat={x => this.changeChat(x)}
        />
      </div>
    );
  }
}

export default Messages;
