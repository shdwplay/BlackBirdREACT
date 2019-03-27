import React, { Component } from "react";
import CardList from "./components/CardList";
import HeaderChat from "./components/HeaderChat";
import Header from "./components/Header";
import SingleChat from "./components/SingleChat";
import "./App.css";

import Login from "./components/Login";

class App extends Component {
  state = {
    page: "CardList",
    activeChat: null
  };
  changePage(pageNumber) {
    this.setState({
      page: "SingleChat",
      activeChat: pageNumber
    });
  }
  render() {
    return (
      <div>
        <Login />
      </div>
    );

    switch (this.state.page) {
      case "Favourites":
        break;

      case "New":
        break;

      case "SingleChat":
        return (
          <div className="App">
            <div className="megacontainer">
              <HeaderChat
                name={this.state.activeChat[0]}
                status={this.state.activeChat[1]}
              />
              <SingleChat collocutor={this.state.activeChat[0]} />
            </div>
          </div>
        );

      default:
        return (
          <div className="App">
            <div className="megacontainer">
              <div className="supercontainer">
                <div className="container">
                  <Header />
                  <CardList
                    activeChat={this.state.activeChat}
                    changeChat={x => this.changePage(x)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
    return (
      <div className="App">
        <div className="megacontainer">
          <div className="supercontainer">
            <div className="container">
              <HeaderChat />
              {this.state.page}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
