//react and firebase
import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
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
import { setFavouriteCard } from "./api";
import { setSilenceCard } from "./api";
import { setUnlistedCard } from "./api";
import { toggleAFK } from "./api";

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
    activeChat: "",
    favouritesActive: false,
    searchToggle: false,
    querystr: "",
    highlightedCard: ""
  };
  componentDidMount() {
    setAuthObserver(
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
      },
      () => {
        //unauthenticated user causes login page to display
        this.setState({ isAuthenticated: false, loading: false });
      }
    );
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
        <Switch>
          <Route path="/forgot-password" render={() => <LoginForgotPsw />} />
          <Route
            path="/password-instructions"
            render={() => <LoginPswInstructions />}
          />
          <Route
            render={() => <Login setLoginState={x => this.setState(x)} />}
          />
        </Switch>
      );

    return (
      <div className="optimusPrime">
        {/* <div className="workspace">workspace</div> */}
        <Switch>
          <Route
            exact
            path="/messages"
            render={props => (
              <Messages
                {...props}
                currentUserId={this.state.currentUser}
                name={this.state.name}
                activeTab={this.state.activeTab}
                selectTab={index => this.selectTab(index)}
                collocutors={this.state.collocutors}
                favouritesActive={this.state.favouritesActive}
                toggleFavourites={() => this.toggleFavourites()}
                selectChat={x => this.selectChat(x)}
                activeChat={this.state.activeChat}
                highlightedCard={this.state.highlightedCard}
                setHighlightedCard={x => this.setState({ highlightedCard: x })}
                setFavouriteCard={(x, y, z) => setFavouriteCard(x, y, z)}
                searchToggle={this.state.searchToggle}
                openSearch={() => this.setSearchOpen()}
                querystr={this.state.querystr}
                setQueryString={x => this.setQueryString(x)}
                setSilenceCard={(x, y, z) => setSilenceCard(x, y, z)}
                setUnlistedCard={(x, y, z) => setUnlistedCard(x, y, z)}
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
                toggleAFK={x => toggleAFK(x)}
              />
            )}
          />
          <Route
            path="/messages/:id"
            render={props => {
              const collocutor = this.state.collocutors.find(element => {
                if (element.id === props.match.params.id) {
                  return element.id;
                }
                return null;
              });
              return (
                <Chat
                  {...props}
                  collocutor={collocutor}
                  selectChat={x => this.selectChat(x)}
                  setActive={x => this.setState({ activeChat: x })}
                  activeChat={this.state.activeChat}
                  currentUser={this.state.currentUser}
                  value={this.state.newMessage}
                  newMessage={e => this.newMessage(e)}
                  saveMessage={() => this.saveMessage()}
                  searchToggle={this.state.searchToggle}
                  openSearch={() => this.setSearchOpen()}
                  addMessage={(x, y) => this.addMessage(x, y)}
                  setSilenceCard={(x, y, z) => setSilenceCard(x, y, z)}
                  setFavouriteCard={(x, y, z) => setFavouriteCard(x, y, z)}
                />
              );
            }}
          />
          <Redirect to="/messages" />
        </Switch>
      </div>
    );
  }
}

export default App;
