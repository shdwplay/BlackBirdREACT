import React from "react";
import "./Chat.css";
import send from "../assets/send.svg";
import attach from "../assets/attachment.svg";
import HeaderChat from "./HeaderChat";
import MessageDate from "./MessageDate";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.props.selectChat(this.props.match.params.id);
  }

  render() {
    return (
      <div className="Chat-container">
        <HeaderChat
          openSearch={this.props.openSearch}
          searchToggle={this.props.searchToggle}
          name={this.props.collocutor.name}
          status={this.props.collocutor.status}
        />
        <div className="Chat" id="chat">
          {this.props.collocutor.messages.map((el, index) => {
            //console.log(el.id)
            return (
              <div
                key={index}
                className={
                  el.sender === this.props.currentUser
                    ? "Chat-message Chat-message-sent"
                    : "Chat-message Chat-message-received"
                }
              >
                <div className="Chat-message-text">{el.text}</div>
                {/* <div className="Chat-message-time">11:02</div> */}
                <MessageDate context="chat" date={el.time.seconds} />
              </div>
            );
          })}
        </div>
        <div className="input-keyboard">
          <input
            value={this.props.value}
            onChange={e => this.props.newMessage(e)}
            type="textarea"
            id="input-keyboard"
            name="input-keyboard"
            placeholder="Start typing.."
          />
          <img id="attachment-icon" src={attach} alt="attach file" />
          <img
            id="send-icon"
            onClick={() => {
              console.log(this.props.match.params.id);
              console.log(this.props.currentUser);
              //this.props.setActive(this.props.match.params.id)
              this.props.addMessage(
                this.props.match.params.id,
                this.props.currentUser
              );
            }}
            src={send}
            alt="send message"
          />
        </div>
      </div>
    );
  }
}

getMessages(userId, collocutorId){
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
}


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