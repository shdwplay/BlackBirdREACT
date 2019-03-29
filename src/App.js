import React, { Component } from "react";
import CardList from "./components/CardList";
import HeaderChat from "./components/HeaderChat";
import Header from "./components/Header";
import Chat from "./components/Chat";
import packageImg from "./assets/package.jpg";
import SendNew from "./components/SendNew"

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
  name: 'Antonio Pellegrini',
  favouritesActive: false,
  page: "Messages",
  activeChat: { collocutor: "null", status: "null", messages: [] },
  activeTab: "Messages",
  newMessage: "",
  searchToggle: false,
  querystr: "",
  currentCollocutor: null,
  userStatus: "away",
  collocutors: [
    {
      id: "chiarabaroni",
      name: "Chiara Baroni",
      displayName: "*TEST*",
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
      id: "edoardoaccivile",
      name: "Edoardo Accivile",
      displayName: "*TEST*",
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
      id: "lorenzoiacobucci",
      name: "Lorenzo Iacobucci",
      displayName: "*TEST*",
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
  contacts: [
    {
      id: 'alessandraderossi',
      image: '/images/profile_alessandra.jpg',
      name: "Alessandra De Rossi",
      status: "away",
      messages: [],
    },
    {
      id: 'angelastewart',
      image: '/images/profile_angela.png',
      name: "Angela Stewart",
      status: "away",
      messages: [],
    },
    {
      id: 'jamesmcaville',
      image: '/images/profile_james.png',
      name: "James McAville",
      status: "away",
      messages: [],
    },
    {
      id: 'lucilledavis',
      image: '/images/profile_lucille.png',
      name: "Lucille Davis",
      status: "away",
      messages: [],
    },
    {
      id: 'francisscott',
      image: '/images/profile_francis.jpg',
      name: "Francis Scott",
      status: "away",
      messages: [],
    },
    {
      id: 'robertevans',
      image: '/images/profile_robert.jpg',
      name: "Robert Evans",
      status: "away",
      messages: [],
    }
  ],
  userInfo: {
    email: "antoniopellegrini@born2code.com",
    nome: "Antonio Pellegrini",
    password: "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
  }
};

// const searchFilter = (arr, str) => {
//   var reg = new RegExp(str, "gi");
//   let filtered = arr.map(el => {
//     let textHighlight = el.replace(reg, t => {
//       return "<b>" + t + "</b>";
//     });
//     return textHighlight;
//   });
//   return filtered;
// };

class App extends Component {
  state = fakeState;

  // componentDidUpdate() {
  //   if (this.state.searchToggle) {
  //     this.searchFilter();
  //   }
  // }

  // el.replace(reg, t => {
  //   return "<b>" + t + "</b>";

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
              cardList={
                this.state.searchToggle
                  ? this.searchFilter()[0]
                  : this.state.collocutors
              }
              displayNames={this.searchFilter()[1]}
              activeChat={this.state.activeChat}
              selectChat={x => this.selectChat(x)}
              setQueryString={x => this.setQueryString(x)}
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
          path="/send-new"
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
