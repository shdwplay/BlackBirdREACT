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
  componentDidMount() {
    setTimeout(() => {
      this.setState(fakeState2);
    }, 2000);
  }

  selectTab(el) {
    this.setState({
      activeTab: el,
      page: el
    });
  }

  profilePage() {
    this.setState({ page: "Profile" });
  }

  // newMessage(e) {
  //   this.setState({
  //     newMessage: e.target.value
  //   });
  //   console.log(messages);
  // }
  // saveMessage() {
  //   messages = messages.concat({
  //     sender: this.state.currentUser,
  //     text: this.state.newMessage
  //   });
  //   this.setState({
  //     messageList: messages,
  //     newMessage: ""
  //   });
  //   console.log(messages);
  // }
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
      ? this.setState({ searchToggle: false, querystr: "" })
      : this.setState({ searchToggle: true });
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route
          path="/messages"
          render={() => (
            <Messages
              name={this.state.name}
              activeTab={this.state.activeTab}
              selectTab={index => this.selectTab(index)}
              favouritesActive={this.state.favouritesActive}
              cardList={this.state.collocutors}
              activeChat={this.state.activeChat}
              selectChat={x => this.selectChat(x)}
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
          path="/profile"
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
      </Switch>
    );
  }
  // {
  //   switch (this.state.page) {
  //     case "Favourites":
  //       return (
  //         <Favourites
  //           activeTab={this.state.activeTab}
  //           selectTab={index => this.selectTab(index)}
  //           cardList={this.state.collocutors}
  //           activeChat={this.state.activeChat}
  //           selectChat={x => this.selectChat}
  //         />
  //       );

  //     case "Send New":
  //       return (
  //         <div className="App">
  //           <div className="megacontainer">
  //             <div className="supercontainer">
  //               <div className="container">
  //                 <Header>
  //                   <TabBar
  //                     activeTab={this.state.activeTab}
  //                     selectTab={index => this.selectTab(index)}
  //                   />
  //                 </Header>
  //                 <ContactList
  //                   activeChat={this.state.activeChat}
  //                   changeChat={x => this.changeChat(x)}
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );

  //     case "Chat":
  //       return (
  //         <div className="App">
  //           <div className="megacontainer">
  //             <HeaderChat
  //               name={this.state.activeChat[0]}
  //               status={this.state.activeChat[1]}
  //             />
  //             <Chat
  // currentUser={this.state.currentUser}
  // collocutor={this.state.activeChat[0]}
  // messageList={this.state.messageList}
  // value={this.state.newMessage}
  // newMessage={e => this.newMessage(e)}
  // saveMessage={() => this.saveMessage()}
  //             />
  //           </div>
  //         </div>
  //       );

  //     case "Messages":
  //       return (
  //         <Messages
  // activeTab={this.state.activeTab}
  // selectTab={index => this.selectTab(index)}
  // cardList={this.state.collocutors}
  // activeChat={this.state.activeChat}
  // selectChat={x => this.selectChat}
  // searchString={this.state.searchSting}
  //         />
  //       );

  //     case "Profile":
  //       return (
  //         <Profile //add back button props when needed
  //           backTo={() => this.backTo("Messages")}
  //         />
  //       );

  //     default:
  //       return <Login function={() => this.selectTab("Messages")} />;
  //   }
  //}
}

export default App;
