//react and firebase
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import firebase from "firebase";
//components
import Login from "./components/Login";
import LoginForm from "./components/LoginForm";
import LoginForgotPsw from "./components/LoginForgotPsw";
import LoginPswInstructions from "./components/LoginPswInstructions";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import SendNew from "./components/SendNew";
import Chat from "./components/Chat";
import "./App.css";
//utility functions
import { showSpinner } from "./utils";
import { searchFilter } from "./utils";
import { filterFavourites } from "./utils";

class App extends Component {
  state = null;
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //could user user.uid instead
        console.log("authenticated user:" + user.email.split("@")[0]);
        this.setState({
          loading: false,
          searchToggle: false,
          querystr: "",
          highlightedCard: null,
          favouritesActive: false,
          activeTab: "messages"
        });
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
    userRef.onSnapshot(doc => {
      newState = doc.data();
      userRef.collection("collocutors").onSnapshot(snapshot => {
        let collocutors = [];
        snapshot.docs.forEach(el => {
          let aux = el.data();
          aux.id = el.id;
          collocutors.push(aux);
        });
        newState.currentUser = userName;
        newState.collocutors = collocutors;
        newState.favourites = filterFavourites(collocutors);
        newState.isAuthenticated = true;
        newState.loading = false;
        this.setState(newState); // triggers landing page display

        userRef.collection("collocutors").onSnapshot(x => {
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
                this.setState(newState);
              });
          }
        });
      });
    });
  }

  setQueryString(str) {
    this.setState({ querystr: str, highlightedCard: null });
  }

  highlightedCardOptions(option) {
    //invoked with "favourite" | "silenced" | "delete" =
    //when user clicks on corrisponding icon on (highlighted) chat card
    let aux = [];
    if (this.state.favouritesActive)
      aux = this.state.favourites[this.state.highlightedCard];
    else aux = this.state.collocutors[this.state.highlightedCard];
    console.log(aux);
    let optionsRef = firebase
      .firestore()
      .collection("users")
      .doc(this.state.currentUser)
      .collection("collocutors");
    if (option === "delete") {
      //in progress
    } else {
      console.log("entered");
      console.log(aux[option]);
      optionsRef.doc(aux.id).update({ [option]: !aux[option] });
      this.setState({ highlightedCard: null });
    }
  }

  selectTab(tab) {
    this.setState({
      activeTab: tab
    });
  }
  toggleFavourites() {
    this.setState({
      favouritesActive: !this.state.favouritesActive,
      highlightedCard: null
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
              toggleFavourites={() => this.toggleFavourites()}
              cardList={
                this.state.favouritesActive
                  ? searchFilter(this.state.favourites, this.state.querystr)[0]
                  : searchFilter(this.state.collocutors, this.state.querystr)[0]
              }
              displayNames={
                this.state.favouritesActive
                  ? searchFilter(this.state.favourites, this.state.querystr)[1]
                  : searchFilter(this.state.collocutors, this.state.querystr)[1]
              }
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
          render={() => (
            <Profile
              currentUser={this.state.currentUser}
              name={this.state.name}
              userStatus={this.state.userStatus}
            />
          )}
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
