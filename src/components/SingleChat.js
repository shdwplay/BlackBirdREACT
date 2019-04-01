import React from "react";
import MessageDate from "./MessageDate";
import "./SingleChat.css";

const SingleChat = props => {
  return (
    <div class="SingleChat">
      <div class="SingleChat-message SingleChat-message-received">
        <div class="SingleChat-message-text">
          I’ve been working on this wireframing template for UI designers. It’s
          going to be wicked awesome.
        </div>
        <MessageDate context="SingleChat" date={1553591343} />
      </div>
      <div class="SingleChat-message SingleChat-message-sent">
        <div class="SingleChat-message-text">Skype?</div>
        <MessageDate context="SingleChat" date={1553591343} />
      </div>
    </div>
  );
};

export default SingleChat;
