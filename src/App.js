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
import { Route, Switch } from "react-router-dom";

// import pic1 from "./assets/profile_james.png";
// import pic2 from "./assets/profile_lucille.png";
// import pic3 from "./assets/profile_francis.jpg";

const fakeState = {
  currentUser: "antoniopellegrini",
  favouritesActive: false,
  page: "Messages",
  activeChat: { collocutor: "null", status: "null", messages: [] },
  activeTab: "Messages",
  newMessage: "",
  searchToggle: false,
  currentCollocutor: null,
  userStatus: "away",
  collocutors: [
    {
      collocutor: "chiarabaroni",
      status: "online",
      favourite: true,
      silenced: false,
      lastOpened: 1553573343,
      lastMessage: { text: ":P", sender: "chiarabaroni", date: 1553591343 },
      numUnread: 7,
      image: "/images/profile_james.png",
      messages: [
        {
          sender: "antoniopellegrini",
          text:
            "Hello, have you had a chance to check out the prototype I sent you?"
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
      ]
    },
    {
      collocutor: "edoardoaccivile",
      status: "online",
      favourite: true,
      silenced: true,
      lastOpened: 1553573343,
      lastMessage: { text: ":P", sender: "edoardoaccivile", date: 1553591343 },
      numUnread: 5,
      image: "/images/profile_james.png",
      messages: [
        {
          sender: "antoniopellegrini",
          text: "Are you coming to the office tomorrow?"
        },
        {
          sender: "edoardoaccivile",
          text: "Dunno man"
        }
      ]
    },
    {
      collocutor: "lorenzoiacobucci",
      status: "away",
      favourite: true,
      silenced: false,
      lastOpened: 1553573343,
      numUnread: 0,
      image: "/images/profile_james.png",
      lastMessage: {
        text: ":P",
        sender: "antoniopellegrini",
        date: 1553591343
      },
      messages: [
        {
          sender: "antoniopellegrini",
          text: "Is the presentation ready?"
        },
        {
          sender: "lorenzoiacobucci",
          text: "Not yet"
        },
        {
          sender: "lorenzoiacobucci",
          text: "It will be done by tomorrow, is that ok?"
        },
        {
          sender: "antoniopellegrini",
          text: "Perfect!"
        }
      ]
    }
  ],
  userInfo: {
    email: "antoniopellegrini@born2code.com",
    nome: "Antonio Pellegrini",
    password: "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
  }
};

class App extends Component {
  state = fakeState;
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
      ? this.setState({ searchToggle: false })
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
          path="/favourites"
          render={() => (
            <Favourites
              activeTab={this.state.activeTab}
              selectTab={index => this.selectTab(index)}
              cardList={this.state.collocutors}
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
              currentUser={this.state.currentUser}
              collocutor={this.state.activeChat.collocutor}
              messageList={this.state.activeChat.messages}
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
