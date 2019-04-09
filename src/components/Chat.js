import React from "react";
import "./Chat.css";
import send from "../assets/send.svg";
import attach from "../assets/attachment.svg";
import HeaderChat from "./HeaderChat";
import MessageDate from "./MessageDate";

import { addMessage } from "../api";
import { listenMessages } from "../api";
import { addCollocutorToDb } from "../api";
import { filterMessages } from "../utils";
import PropTypes from "prop-types";
export default class Chat extends React.Component {
  state = {
    newMessage: "",
    messages: [],
    chatQuerystr: "",
    loading: true,
    chatSearchToggle: false
  };

  componentDidMount() {
    //addCollocutor(this.props.currentUser, this.props.match.params.id)
    console.log(this.props.data)

    this.props.setActive(this.props.collocutor.id);

    listenMessages(this.props.collocutor.id, this.props.currentUser, x =>
      this.setState({ messages: x, loading: false })
    );
  }

  newMessage(str) {
    this.setState({ newMessage: str });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    if (this.state.loading) return <div>loading...</div>;
    else {
      return (
        <div className="Chat-container">
          <HeaderChat
            searchToggle={this.state.chatSearchToggle}
            openSearch={() =>
              this.setState({ chatSearchToggle: !this.state.chatSearchToggle })
            }
            setChatQuerystr={str => this.setState({ chatQuerystr: str })}
            name={this.props.collocutor.name}
            status={this.props.collocutor.status}
            silenced={this.props.collocutor.silenced}
            favourite={this.props.collocutor.favourite}
            highlightedCardOptions={this.props.highlightedCardOptions}
            //status={this.props.collocutor.status}
          />
          <div className="Chat" id="chat">
            {filterMessages(this.state.messages, this.state.chatQuerystr).map(
              (el, index) => {
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
                    <MessageDate context="chat" date={el.date.seconds} />
                  </div>
                );
              }
            )}
          </div>
          <div className="input-keyboard">
            <input
              value={this.state.newMessage}
              onChange={e => this.newMessage(e.target.value)}
              type="textarea"
              id="input-keyboard"
              name="input-keyboard"
              placeholder="Start typing.."
            />
            <img id="attachment-icon" src={attach} alt="attach file" />
            <img
              id="send-icon"
              onClick={() => {
                this.setState({ newMessage: "" });
                addMessage(
                  this.props.collocutor.id,
                  this.props.currentUser,
                  this.state.newMessage
                );
                this.state.messages.length <1 || addCollocutorToDb(this.currentUser, this.props.collocutor.id)
              }}
              src={send}
              alt="send message"
            />
          </div>
        </div>
      );
    }
  }
}

Chat.propTypes = {
  searchToggle: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  openSearch: PropTypes.func,
  setQueryString: PropTypes.func,
  messages: PropTypes.array,
  currentUser: PropTypes.string,
  newMessage: PropTypes.func,
  value: PropTypes.string
};


