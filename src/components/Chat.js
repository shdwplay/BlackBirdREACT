import React from "react";
import "./Chat.css";
import send from "../assets/send.svg";
import attach from "../assets/attachment.svg";
import HeaderChat from "./HeaderChat";
import MessageDate from "./MessageDate";

import { addMessage } from "../api";
import { listenMessages } from "../api";
export default class Chat extends React.Component {
  state = {
    newMessage: "",
    messages: []
  };
  //export const listenMessages = (collocutorId, currentUserId, cb) => {

  componentDidMount() {
    listenMessages(this.props.collocutor, this.props.currentUser, x =>
      this.setState({ messages: x })
    );
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
          {this.props.state.messages.map((el, index) => {
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
            onChange={e => this.state.newMessage(e)}
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
              addMessage(
                this.props.collocutor,
                this.props.currentUser,
                this.state.newMessage
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
