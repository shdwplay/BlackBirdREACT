import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CardList from "./CardList";

class Favourites extends React.Component {
  filterByFavourites() {
    //logic to filter cardList by favourites
  }
  render() {
    return (
      <div className="container">
        <Header name={this.props.name}>
          <TabBar
          activeTab={this.props.activeTab}
          selectTab={this.props.selectTab} />
        </Header>
        <CardList
          cardList={[]}
          activeChat={this.props.activeChat}
          selectChat={x => this.selectChat(x)}
        />
      </div>
    );
  }
}

export default Favourites;
