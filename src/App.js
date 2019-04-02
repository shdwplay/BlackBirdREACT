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
import LoginForm from "./components/LoginForm";
import LoginForgotPsw from "./components/LoginForgotPsw";
import LoginPswInstructions from "./components/LoginPswInstructions";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import logo from "./assets/logo_blackbird.svg";

import firebase from "./firebase";
import { resolve } from "dns";

class App extends Component {
  state = null;
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //could user user.uid instead
        console.log("authenticated:" + user.email.split("@")[0]);
        this.getDatabaseState(user.email.split("@")[0]);
      } else {
        console.log("unauthenticated");
        this.setState({
          isAuthenticated: false
        });
      }
    });
  }
  getDatabaseState(userName) {
    let newState = {};
    let db = firebase.firestore();
    let userRef = db.collection("users").doc(userName);
    userRef.get().then(doc => {
      return new Promise(resolve => {
        userRef
          .collection("collocutors")
          .get()
          .then(data => {
            let collocutors = [];
            newState = doc.data();
            // console.log(doc.data());
            // console.log(data.docs[0].data());
            data.docs.forEach(el => collocutors.push(el.data()));
            newState.collocutors = collocutors;
            newState.isAuthenticated = true;
            this.setState(newState);
          });
      });
    });
  }

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
    //invoke this method "favourites" | "silenced" | "delete "as an argument
    //to provide corrisponding functionality to chat cards
    let aux = [...this.state.collocutors];
    if (option === "delete") {
      aux.splice(this.state.highlightedCard, 1);
      this.setState({ highlightedCard: null });
    } else {
      aux[this.state.highlightedCard][option] = !aux[
        this.state.highlightedCard
      ][option];
    }
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
    console.log("app rendering");
    if (!this.state) {
      console.log("showing loading spinner");
      return (
        <div className="loadingContainer">
          <div className="loadingSpinner">
            <img className="logo" src={logo} alt="blackbird logo" />
            <div className="spinner">
              <div className="cube1" />
              <div className="cube2" />
            </div>
          </div>
        </div>
      );
    }
    if (!this.state.isAuthenticated) {
      return (
        <Login authenticate={() => this.setState({ isAuthenticated: true })} />
      );
    }
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Login
              getDatabaseState={x => this.getDatabaseState(x)}
              authenticate={() =>
                this.setState({ authentificationRequired: false })
              }
            />
          )}
        />
        <Route
          path={"/messages/"}
          render={props => (
            <Messages
              {...props}
              currentUser={this.state.currentUser}
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
          path="/sendnew"
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
          path={"/profile/"}
          render={() => <Profile currentUser={this.state.currentUser} />}
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
        <Route exact path="/" render={() => <LoginForm />} />
        <Route path="/forgot-password" render={() => <LoginForgotPsw />} />
        <Route
          path="/password-instructions"
          render={() => <LoginPswInstructions />}
        />
      </Switch>
    );
  }
}

export default App;
