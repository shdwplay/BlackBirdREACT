import React from "react";
import "./Chats.css";
import send from "../assets/send.svg";
import attach from "../assets/attachment.svg";
import HeaderChat from "./HeaderChat";

export default class Chat extends React.Component {
  render() {
    return (
      <div className="Chat-container">
        {/* <HeaderChat
          name={this.state.activeChat[0]}
          status={this.state.activeChat[1]}
        /> */}
        <div className="Chat" id="chat">
          {this.props.messageList.map((el, index) => {
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
              this.props.saveMessage();
            }}
            src={send}
            alt="send message"
          />
        </div>
      </div>
    );
  }
}
