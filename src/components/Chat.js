import React from "react";
import "./Chat.css";
import send from "../assets/send.svg";
import attach from "../assets/attachment.svg";
import HeaderChat from "./HeaderChat";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.props.setActive(this.props.match.params.id)
  }
  render() {
    
    return (
      
      <div className="Chat-container">
        <HeaderChat
          name={this.props.activeChat.collocutor}
          status={this.props.activeChat.status}
        />
        <div className="Chat" id="chat">
          {this.props.activeChat.messages.map((el, index) => {
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
                <div className="Chat-message-time">11:02</div>
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
              console.log(this.props.match.params.id)
              console.log(this.props.currentUser)
              //this.props.setActive(this.props.match.params.id) 
              this.props.addMessage(this.props.match.params.id, this.props.currentUser);
            }}
            src={send}
            alt="send message"
          />
        </div>
      </div>
    );
  }
}
