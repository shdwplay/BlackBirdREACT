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
        newState.currentUser = userName;
        newState.collocutors = collocutors;
        newState.isAuthenticated = true;
        newState.loading = false;
        newState.searchToggle = false;
        newState.querystr = "";
        newState.highlightedCard = null;
        //this.setState(newState);

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

  /* getMessages(userId, collocutorId){
    let db = firebase.firestore();
    let userRef = db.collection("users").doc(userId);
    userRef.collection("collocutors").doc(collocutorId).collection('messages')
    .onSnapshot(function(querySnapshot) {
        var messages = [];
        console.log(querySnapshot)
        querySnapshot.forEach(function(doc) {
            messages.push(doc.data().text);
        });
        console.log("Messaggi tra chiara e antonio: ", messages.join(", "));
    });
  } */

  newMessage(e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  addMessage(collocutorId, currentUserId) {
    var db = firebase.firestore();
    let userRef = db.collection("users").doc(currentUserId);
    let conversations = userRef.collection("collocutors");
    //aggiungo i nuovi messaggi all'utente corrente
    conversations.doc(collocutorId).update({
      lastMsg: {
        text: this.state.newMessage,
        date: new Date(),
        sender: currentUserId
      }
    });
    conversations
      .doc(collocutorId)
      .collection("messages")
      .add({
        text: this.state.newMessage,
        time: new Date(),
        sender: currentUserId
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    this.setState({ newMessage: "" });
    userRef = db.collection("users").doc(collocutorId);
    conversations = userRef.collection("collocutors");
    //aggiungo i nuovi messaggi al collocutor
    conversations.doc(currentUserId).update({
      lastMsg: {
        text: this.state.newMessage,
        date: new Date(),
        sender: currentUserId
      }
    });
    conversations
      .doc(currentUserId)
      .collection("messages")
      .add({
        text: this.state.newMessage,
        time: new Date(),
        sender: currentUserId
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  setActive(activeChat) {
    this.setState({
      activeChat2: activeChat
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
    //invoked with "favourite" | "silenced" | "delete" =
    //when user clicks on corrisponding icon on (highlighted) chat card

    let aux = this.state.collocutors[this.state.highlightedCard];
    console.log(option);
    console.log(aux.favourite);
    //console.log(aux.messages);
    let optionsRef = firebase
      .firestore()
      .collection("users")
      .doc(this.state.currentUser)
      .collection("collocutors");
    if (option === "favourite") {
      optionsRef.doc(aux.id).update({ favourite: !aux.favourite });
    }
    if (option === "silenced") {
      optionsRef.doc(aux.id).update({ silenced: !aux.silenced });
    }
    if (option === "delete") {
      //documents cannot be deleted directly
    }
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
          exact
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
          render={() => (
            <Profile
              currentUser={this.state.currentUser}
              name={this.state.name}
              userStatus={this.state.userStatus}
            />
          )}
        />
        <Route
          path="/messages/:id"
          render={props => {
            const collocutor = this.state.collocutors.find(element => {
              if (element.id === props.match.params.id) return element;
              return null;
            });
            return (
              <Chat
                {...props}
                collocutor={collocutor}
                selectChat={x => this.selectChat(x)}
                setActive={x => this.setActive(x)}
                activeChat={this.state.activeChat}
                currentUser={this.state.currentUser}
                /* collocutor={this.state.activeChat.collocutor}
              messageList={this.state.activeChat.messages} */
                value={this.state.newMessage}
                newMessage={e => this.newMessage(e)}
                saveMessage={() => this.saveMessage()}
                searchToggle={this.state.searchToggle}
                openSearch={() => this.setSearchOpen()}
                addMessage={(x, y) => this.addMessage(x, y)}
                highlightedCardOptions={x => this.highlightedCardOptions(x)}
              />
            );
          }}
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
