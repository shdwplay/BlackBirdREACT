//react and firebase
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import firebase from "./firebase";
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

import { getUserDetails } from "./api";
import { listenCollocutorsList } from "./api";
import { setAuthObserver } from "./api";
class App extends Component {
  state = {
    loading: true,
    isAuthenticated: null, //bool
    currentUser: null,
    name: "",
    userStatus: "",
    collocutors: [],
    favourites: [],
    activeTab: "messages",
    favouritesActive: false,
    searchToggle: false,
    querystr: "",
    highlightedCard: null
  };
  componentDidMount() {
    setAuthObserver(
      () => {
        //unauthenticated user causes login page to display
        this.setState({ isAuthenticated: false, loading: false });
      },
      //authenticated user fetch information
      async user => {
        this.setState({ loading: true });
        let userName = user.email.split("@")[0];
        const userDetails = await getUserDetails(userName);
        this.setState({
          currentUser: userName,
          userStatus: userDetails.userStatus,
          name: userDetails.name
        });

        listenCollocutorsList(userName, collocutors => {
          let favourites = collocutors.filter(el => el.favourite);
          this.setState({
            collocutors: collocutors,
            favourites: favourites,
            isAuthenticated: true,
            loading: false
          });
        });
      }
    );
  }

  setActive(activeChat) {
    this.setState({
      activeChat2: activeChat
    });
  }

  toggleFavourites() {
    this.setState({
      favouritesActive: !this.state.favouritesActive,
      highlightedCard: null
    });
  }

  setSearchOpen() {
    this.setState({
      searchToggle: !this.state.searchToggle,
      querystr: "",
      highlightedCard: null //deselects current card to diplay list properly
    });
  }

  setQueryString(str) {
    this.setState({ querystr: str, highlightedCard: null });
  }
  searchFilter() {
    let filtered = this.state.collocutors.filter(el =>
      el.name.toLowerCase().includes(this.state.querystr)
    );

    return filtered;
  }
  highlightedCardOptions(option) {
    //invoked with "favourite" | "silenced" | "delete" =
    //when user clicks on corrisponding icon on (highlighted) chat card
    let aux = [];
    if (this.state.favouritesActive)
      aux = this.state.favourites[this.state.highlightedCard];
    else aux = this.state.collocutors[this.state.highlightedCard];
    let optionsRef = firebase
      .firestore()
      .collection("users")
      .doc(this.state.currentUser)
      .collection("collocutors");
    if (option === "delete") {
    } else {
      optionsRef.doc(aux.id).update({ [option]: !aux[option] });
      this.setState({ highlightedCard: null });
    }
  }

  selectTab(tab) {
    this.setState({
      activeTab: tab
    });
  }

  selectChat(clickedCard) {
    this.setState({
      activeChat: clickedCard
    });
  }

  render() {
    console.log("app rendering");
    if (this.state.loading) return showSpinner();
    if (!this.state.isAuthenticated)
      return (
        <Login
          setLoginState={x => this.setState(x)}
          //setAuthenticated={() => this.setState({ isAuthenticated: true })}
        />
      );

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
              toggleFavourites={() => this.toggleFavourites()}
              collocutors={this.state.collocutors}
              //cardList={this.state.collocutors}
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
              if (element.id === props.match.params.id) return element.id;
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
