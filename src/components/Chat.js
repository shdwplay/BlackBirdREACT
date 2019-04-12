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
import { setReadMessages } from "../api";
import PropTypes from "prop-types";
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: "",
      messages: [],
      chatQuerystr: "",
      loading: true,
      chatSearchToggle: false
    };
  }

  componentDidMount() {
    this.unsub = this.getMessagesUpdates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.collocutor.id !== this.props.collocutor.id) {
      this.unsub();
      this.unsub = this.getMessagesUpdates();
      this.props.setActive(this.props.collocutor.id);
    }
  }

  getMessagesUpdates() {
    return listenMessages(
      this.props.currentUser,
      this.props.collocutor.id,
      newMessages => {
        this.setState({
          messages: newMessages,
          loading: false
        });
        let unreadMessages = newMessages
          .filter(el => !el.read)
          .map(el => el.id);
        setReadMessages(
          this.props.currentUser,
          this.props.collocutor.id,
          unreadMessages
        );
      }
    );
  }

  newMessage(str) {
    this.setState({ newMessage: str });
  }

  render() {
    if (this.state.loading)
      return (
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
      );
    else {
      return (
        <div className="Chat-container">
          <HeaderChat
            searchToggle={this.state.chatSearchToggle}
            openSearch={() =>
              this.setState({ chatSearchToggle: !this.state.chatSearchToggle })
            }
            setChatQuerystr={str => this.setState({ chatQuerystr: str })}
            currentUserId={this.props.currentUser}
            name={this.props.collocutor.name}
            collocutorId={this.props.collocutor.id}
            status={this.props.collocutor.status}
            silenced={this.props.collocutor.silenced}
            favourite={this.props.collocutor.favourite}
            setFavouriteCard={this.props.setFavouriteCard}
            setSilenceCard={this.props.setSilenceCard}
            setUnlistedCard={this.props.setUnlistedCard}
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
                this.state.newMessage !== "" &&
                  addMessage(
                    this.props.collocutor.id,
                    this.props.currentUser,
                    this.state.newMessage
                  );
                this.setState({ newMessage: "" });
                if (this.state.messages.length < 1) {
                  addCollocutorToDb(
                    this.props.currentUser,
                    this.props.collocutor.id,
                    this.props.collocutor.name,
                    this.state.newMessage,
                    this.props.currentUser
                  );
                  addCollocutorToDb(
                    this.props.collocutor.id,
                    this.props.currentUser,
                    this.props.userName,
                    this.state.newMessage,
                    this.props.currentUser
                  );
                }
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
