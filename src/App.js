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
import { showSpinner } from "./utils";
import "./spinner.css";

import firebase from "firebase";

class App extends Component {
  state = null;
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //could user user.uid instead
        console.log("authenticated user:" + user.email.split("@")[0]);
        this.getDatabaseState(user.email.split("@")[0]);
      } else {
        console.log("unauthenticated user");
        this.setState({
          isAuthenticated: false
        });
      }
    });
  }

  getDatabaseState(userName) {
    this.setState({ loading: true }); //shows spinner while waiting for response from db
    let newState = {};
    let db = firebase.firestore();
    let userRef = db.collection("users").doc(userName);
    userRef.get().then(doc => {
      //console.log(snapshot.data());
      newState = doc.data();
      userRef.collection("collocutors").onSnapshot(snapshot => {
        let collocutors = [];
        snapshot.docs.forEach(el => {
          let aux = el.data();
          aux.id = el.id;
          //aux.displayName = el.name;
          collocutors.push(aux);
        });
        newState.collocutors = collocutors;
        newState.isAuthenticated = true;
        newState.loading = false;
        newState.searchToggle = false;
        newState.querystr = "";
        newState.highlightedCard = null;
        this.setState(newState);
        console.log(newState);

        userRef
          .collection("collocutors")
          .get()
          .then(x => {
            for (let i = 0; i < x.docs.length; i++) {
              newState.collocutors[i].messages = [];
              userRef
                .collection("collocutors")
                .doc(x.docs[i].id)
                .collection("messages")
                .get()
                .then(x => {
                  for (let j = 0; j < x.docs.length; j++) {
                    newState.collocutors[i].messages.push(x.docs[j].data());
                  }
                });
            }
          })
          .then(() => this.setState(newState));
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
    this.setState({ querystr: str, highlightedCard: null });
  }

  highlightedCardOptions(option) {
    //invoked with "favourites" | "silenced" | "delete" =
    //when user clicks on corrisponding icon on (highlighted) chat card
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
      activeTab: el
    });
  }

  selectChat(clickedCard) {
    this.setState({
      activeChat: clickedCard
    });
  }

  setSearchOpen() {
    this.setState({
      searchToggle: !this.state.searchToggle,
      querystr: "",
      highlightedCard: null //deselects current card to diplay list properly
    });
  }

  render() {
    console.log("app rendering");
    if (this.state === null) return showSpinner();
    if (this.state.loading === true) return showSpinner();
    if (!this.state.isAuthenticated)
      return <Login getDatabaseState={x => this.getDatabaseState(x)} />;

    return (
      <Switch>
        <Route
          path="/messages"
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
          path="/profile/"
          render={() => <Profile currentUser={this.state.name} />}
        />
        <Route
          exact
          path={"/messages/:id"}
          render={() => (
            <Chat
              activeChat={this.state.activeChat}
              currentUser={this.state.currentUser}
              /* collocutor={this.state.activeChat.collocutor}
              messageList={this.state.activeChat.messages} */
              value={this.state.newMessage}
              newMessage={e => this.newMessage(e)}
              saveMessage={() => this.saveMessage()}
              searchToggle={this.state.searchToggle}
              openSearch={() => this.setSearchOpen()}
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
