//react and firebase
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//components
import Login from "./components/Login";
import LoginForgotPsw from "./components/LoginForgotPsw";
import LoginPswInstructions from "./components/LoginPswInstructions";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import SendNew from "./components/SendNew";
import Workspace from "./components/Workspace";
import Chat, { newCollocutor } from "./components/Chat";
import "./App.css";
//utility functions
import { showSpinner } from "./utils";

import { getUserDetails } from "./api";
import { addCollocutorToDb } from "./api";
import { listenCollocutorsList } from "./api";
import { setAuthObserver } from "./api";
import { setFavouriteCard } from "./api";
import { setSilenceCard } from "./api";
import { setUnlistedCard } from "./api";
import { toggleAFK } from "./api";
import { findCollocutor } from "./utils";

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
            isAuthenticated: true
          });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 0);
        });
      },
      () => {
        //unauthenticated user causes login page to display
        this.setState({ isAuthenticated: false, loading: false });
      }
    );
  }

  addCollocutor(collocutor) {
    this.setState({ collocutors: [...this.state.collocutors, collocutor] });
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
      activeTab: tab //use switch
    });
    if (tab === "favourites") {
      this.setState({ activeTab: "favourites", favouritesActive: true });
    }
    if (tab === "messages") {
      this.setState({ activeTab: "messages", favouritesActive: false });
    }
    if (tab === "sendNew") {
      this.setState({
        activeTab: "sendNew"
      });
    }
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
        <Workspace
          context="onlytablet"
          name={this.state.name}
          activeTab={this.state.activeTab}
          selectTab={x => this.selectTab(x)}
        />
        <Switch>
          <Route
            path="/messages"
            render={() => (
              <>
                <Route
                  exact={!window.matchMedia("(min-width: 768px)").matches}
                  path="/messages"
                  render={props => (
                    <Messages
                      {...props}
                      currentUserId={this.state.currentUser}
                      name={this.state.name}
                      activeTab={this.state.activeTab}
                      collocutors={this.state.collocutors}
                      favouritesActive={this.state.favouritesActive}
                      toggleFavourites={() => this.toggleFavourites()}
                      selectChat={x => this.selectChat(x)}
                      activeChat={this.state.activeChat}
                      highlightedCard={this.state.highlightedCard}
                      selectTab={x => this.selectTab(x)}
                      setHighlightedCard={x =>
                        this.setState({ highlightedCard: x })
                      }
                      searchToggle={this.state.searchToggle}
                      openSearch={() => this.setSearchOpen()}
                      querystr={this.state.querystr}
                      setQueryString={x => this.setQueryString(x)}
                      setSilenceCard={(x, y, z) => setSilenceCard(x, y, z)}
                      setUnlistedCard={(x, y, z) => setUnlistedCard(x, y, z)}
                      setFavouriteCard={(x, y, z) => setFavouriteCard(x, y, z)}
                    />
                  )}
                />
                <Route
                  path="/messages/:id"
                  render={props => {
                    //mettiamo in
                    function collocutorMatches(element) {
                      console.log(props.match.params.id);
                      return element.id === props.match.params.id;
                    }
                    var collocutor = this.state.collocutors.find(
                      collocutorMatches
                    );
                    console.log(this.state.collocutors.find(collocutorMatches));
                    if (!collocutor) {
                      return <Redirect to="/messages" />;
                    }
                    return (
                      <Chat
                        {...props}
                        collocutor={collocutor}
                        userName={this.state.name}
                        selectChat={x => this.selectChat(x)}
                        setActive={x => this.setState({ activeChat: x })}
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
                        setSilenceCard={(x, y, z) => setSilenceCard(x, y, z)}
                        setUnlistedCard={(x, y, z) => setUnlistedCard(x, y, z)}
                        setFavouriteCard={(x, y, z) =>
                          setFavouriteCard(x, y, z)
                        }
                      />
                    );
                  }}
                />
              </>
            )}
          />
          <Route
            path="/sendnew"
            render={() => (
              <SendNew
                addCollocutor={x => this.addCollocutor(x)}
                currentUser={this.state.currentUser}
                name={this.state.name}
                activeTab={this.state.activeTab}
                selectTab={x => this.selectTab(x)}
                activeChat={this.state.activeChat}
                selectChat={x => this.selectChat(x)}
                searchString={this.state.searchSting}
                setSendNewTab={x => this.setState({ activeTab: x })}
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
          <Redirect to="/messages" />
        </Switch>
      </div>
    );
  }
}

export default App;
