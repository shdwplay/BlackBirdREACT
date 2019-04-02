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
import { Route, Switch, Redirect } from "react-router-dom";
import logo from "./assets/logo_blackbird.svg";

import { fakeState1 } from "./fakeStates";
// import { fakeState2 } from "./fakeStates";
//import { fakeDatabase } from "./fakeDatabase";
import firebase from "./firebase";
class App extends Component {
  state = fakeState1;
  /* componentDidMount() {
    this.authenticateUser().then(
      user => this.getDatabaseState(user),
      err => this.setState({ authentificationRequired: true })
    );
  }
  // componentDidUpdate(prevState) {
  //   console.log(prevState);
  //   this.setState({ authentificationRequired: false });
  //   // console.log(prevState);
  // }
  authenticateUser() {
    return new Promise((resolve, reject) => {
      console.log("authenticating user...");
      setTimeout(() => {
        //authenticate user
        const user = "antoniopellegrini";
        user ? resolve(user) : reject("redirect to login");
      }, 500);
    });
  }
  // redirectToLogin() {
  //   console.log("setting login redirect");
  //   if(this.state.authentificationRequired){return <Redirect to="/" />
  // }

  getDatabaseState(user) {
    let aux;
    var db = firebase.firestore();
    let userRef = db.collection("users").doc(user);
    let conversations = userRef.collection("collocutors");

    userRef.onSnapshot(doc => {
      var newState = {};

      console.log(newState);
      newState = doc.data();
      conversations.onSnapshot(data => {
        newState.collocutors = [];
        data.forEach((el, index) => {
          let collocutorId = el.id;
          let last = el.data().lastOpened.seconds;
          console.log("lastOpened with " + el.id + " at " + last);
          conversations
            .doc(collocutorId)
            .collection("messages")
            //.where("sender", "==", "chiarabaroni");
            //.where(el.data().date.seconds, ">", el.data().lastOpened.seconds);
            .onSnapshot(snapshot => {
              let counter = 0;
              aux = {};
              snapshot.forEach(el => {
                if (el.data().date.seconds > last) {
                  counter++;
                }
              });
              aux = el.data();
              aux.numUnread = counter;
              console.log(aux);
            });

          newState.collocutors.push(el.data());
        });
        this.setState(newState);
        console.log(newState);
      });
    });
  }*/

  newMessage(e) {
    this.setState({
      newMessage: e.target.value
    })
  }

  addMessage() {
    let collocutorId='chiarabaroni'
    var db = firebase.firestore();
    let userRef = db.collection("users").doc('antoniopellegrini');
    let conversations = userRef.collection("collocutors")
    conversations.doc(collocutorId).collection('messages').add({
      text: this.state.newMessage,
      time: new Date()
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  this.setState({newMessage: ''})    
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
    //invoking this method with "favourites" or "silenced" as an argument
    //will toggle the corresponding boolean value on the current highlighted chat card
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
    if (this.state.authentificationRequired) {
      //this.setState({ authentificationRequired: false }); //bad
      return <Redirect to="/" />;
    }
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Login setCredentials={x => this.setCredentials(x)} />}
        />
        <Route
          path={"/messages/" + this.state.currentUser}
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
          path={"/profile/:currentUser"}
          render={props => (
            <Profile
              currentUser={props.match.params}
              currentUser={this.state.currentUser}
              prevPage={"test"}
            />
          )}
        />
        <Route
          path="/messages/:id"
          render={(props) => {
            console.log(props)
            return (
            <Chat
              activeChat={this.state.activeChat}
              currentUser={this.state.currentUser}
              /* collocutor={this.state.activeChat.collocutor}
              messageList={this.state.activeChat.messages} */
              value={this.state.newMessage}
              newMessage={e => this.newMessage(e)}
              addMessage={() => this.addMessage()}
            />
          )}}
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
