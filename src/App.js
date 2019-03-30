import React, { Component } from "react";
import CardList from "./components/CardList";
import HeaderChat from "./components/HeaderChat";
import Header from "./components/Header";
import Chat from "./components/Chat";
import packageImg from "./assets/package.jpg";
import SendNew from "./components/SendNew";

import "./App.css";

import Login from "./components/Login";
import TabBar from "./components/TabBar";
import ContactList from "./components/ContactList";
import Profile from "./components/Profile";
import Back from "./components/Back";
import Favourites from "./components/Favourites";
import Messages from "./components/Messages";
import { Route, Switch } from "react-router-dom";

import { fakeState1 } from "./fakeStates";
import { fakeState2 } from "./fakeStates";
class App extends Component {
  state = fakeState1;

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState(fakeState2);
  //   }, 2000);
  // }

  searchFilter() {
    var reg = new RegExp(this.state.querystr, "gi");
    let filtered = this.state.collocutors.filter(el =>
      el.name.toLowerCase().includes(this.state.querystr)
    );
    let display = filtered.map(el =>
      el.name.replace(
        reg,
        str => "<b style='background:#fc0fc0'>" + str + "</b>"
      )
    );
    return [filtered, display];
  }
  setQueryString(str) {
    this.setState({ querystr: str });
  }

  highlightedCardOptions(option) {
    //invoking this method with "favourites" or "silenced" as an argument
    //will toggle the corresponding boolean value on the current highlighted chat card
    let aux = [...this.state.collocutors];
    aux[this.state.highlightedCard][option] = !aux[this.state.highlightedCard][
      option
    ];
    this.setState({ collocutors: aux });
  }
  selectTab(el) {
    this.setState({
      activeTab: el,
      page: el
    });
  }

  selectChat(clickedCard) {
    this.setState({
      page: "Chat",
      activeChat: clickedCard
    });
  }

  backTo(prevPage) {
    this.setState({ page: prevPage });
  }
  setSearchOpen() {
    this.setState({ searchToggle: !this.state.searchToggle, querystr: "" });
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route
          path="/messages"
          render={() => (
            <Messages
              setHighlightedCard={x => this.setState({ highlightedCard: x })}
              highlightedCard={this.state.highlightedCard}
              highlightedCardOptions={x => this.highlightedCardOptions(x)}
              name={this.state.name}
              activeTab={this.state.activeTab}
              selectTab={index => this.selectTab(index)}
              favouritesActive={this.state.favouritesActive}
              cardList={
                this.state.searchToggle
                  ? this.searchFilter()[0]
                  : this.state.collocutors
              }
              displayNames={this.searchFilter()[1]}
              activeChat={this.state.activeChat}
              selectChat={x => this.selectChat(x)}
              setQueryString={x => this.setQueryString(x)}
              querystr={this.state.querystr}
              searchToggle={this.state.searchToggle}
              openSearch={() => this.setSearchOpen()}
            />
          )}
        />
        <Route
          path="/favourites"
          render={() => (
            <Favourites
              name={this.state.name}
              activeTab={this.state.activeTab}
              selectTab={index => this.selectTab(index)}
              cardList={this.state.collocutors}
              activeChat={this.state.activeChat}
              selectChat={x => this.selectChat(x)}
              searchString={this.state.searchSting}
            />
          )}
        />
        <Route
          path="/send-new"
          render={() => (
            <SendNew
              name={this.state.name}
              activeTab={this.state.activeTab}
              selectTab={index => this.selectTab(index)}
              contactList={this.state.contacts}
              activeChat={this.state.activeChat}
              selectChat={x => this.selectChat(x)}
              searchString={this.state.searchSting}
            />
          )}
        />
        {/* <Route path="/send-new" render={()=><SendNew} /> */}
        <Route
          path="/profile"
          render={() => <Profile currentUser={this.state.name} />}
        />
        <Route
          path="/chat"
          render={() => (
            <Chat
              activeChat={this.state.activeChat}
              currentUser={this.state.currentUser}
              /* collocutor={this.state.activeChat.collocutor}
              messageList={this.state.activeChat.messages} */
              value={this.state.newMessage}
              newMessage={e => this.newMessage(e)}
              saveMessage={() => this.saveMessage()}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
