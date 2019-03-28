import React, { Component } from "react";
import CardList from "./components/CardList";
import HeaderChat from "./components/HeaderChat";
import Header from "./components/Header";
import Chat from "./components/Chat";
import packageImg from "./assets/package.jpg";

import "./App.css";

import Login from "./components/Login";
import TabBar from "./components/TabBar";
import ContactList from "./components/ContactList";
import Profile from "./components/Profile";
import Back from "./components/Back";
import Favourites from "./components/Favourites";
import Messages from "./components/Messages";
let messages = [
  {
    sender: "antoniopellegrini",
    text: "Hello, have you had a chance to check out the prototype I sent you?"
  },
  {
    sender: "chiarabaroni",
    text:
      "Hey sorry, not yet! I'll do it as soon as I get to the airport! I have a fligth at 5!"
  },
  {
    sender: "antoniopellegrini",
    text: "Ok great, let me know when you are done!"
  },
  {
    sender: "chiarabaroni",
    text: "Sure thing! 😊"
  },
  {
    sender: "chiarabaroni",
    text: "Btw was there a package for me in today's mail?"
  },
  {
    sender: "antoniopellegrini",
    text: "Yep! 😊"
  },
  {
    sender: "antoniopellegrini",
    text: <img className="Chat-message-img" src={packageImg} />
  }
];

class App extends Component {
  state = {
    currentUser: "antoniopellegrini",
    favouritesActive: false,
    page: "Login",
    activeChat: null,
    activeTab: "Messages",
    messageList: messages,
    newMessage: "",
    searchToggle: false
  };
  selectTab(el) {
    this.setState({
      activeTab: el,
      page: el
    });
  }

  profilePage() {
    this.setState({ page: "Profile" });
  }

  newMessage(e) {
    this.setState({
      newMessage: e.target.value
    });
    console.log(messages);
  }
  saveMessage() {
    messages = messages.concat({
      sender: this.state.currentUser,
      text: this.state.newMessage
    });
    this.setState({
      messageList: messages,
      newMessage: ""
    });
    console.log(messages);
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
    this.state.searchToggle
      ? this.setState({ searchToggle: false })
      : this.setState({ searchToggle: true });
  }
  render() {
    switch (this.state.page) {
      case "Favourites":
        return <Favourites />;

      case "Send New":
        return (
          <div className="App">
            <div className="megacontainer">
              <div className="supercontainer">
                <div className="container">
                  <Header>
                    <TabBar
                      activeTab={this.state.activeTab}
                      selectTab={index => this.selectTab(index)}
                    />
                  </Header>
                  <ContactList
                    activeChat={this.state.activeChat}
                    changeChat={x => this.changeChat(x)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "Chat":
        return (
          <div className="App">
            <div className="megacontainer">
              <HeaderChat
                name={this.state.activeChat[0]}
                status={this.state.activeChat[1]}
              />
              <Chat
                currentUser={this.state.currentUser}
                collocutor={this.state.activeChat[0]}
                messageList={this.state.messageList}
                value={this.state.newMessage}
                newMessage={e => this.newMessage(e)}
                saveMessage={() => this.saveMessage()}
              />
            </div>
          </div>
        );

      case "Messages":
        return <Messages />;

      case "Profile":
        return (
          <Profile //add back button props when needed
            backTo={() => this.backTo("Messages")}
          />
        );

      default:
        return <Login function={() => this.selectTab("Messages")} />;
    }
  }
}

export default App;
