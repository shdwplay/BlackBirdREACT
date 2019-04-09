import React from "react";
import "./MessageDate.css";
import PropTypes from "prop-types";
import { detectDate } from "../utils";
import moment from "moment";

const MessageDate = props => {
  if (detectDate(props.date) < 1) {
    return (
      <div
        className={
          props.context === "MessageDate"
            ? "MessageDate-timestamp"
            : "Chat-message-time"
        }
      >
        {moment.unix(props.date).format("kk:mm")}
      </div>
    );
  }
  if (detectDate(props.date) < 2) {
    return (
      <div
        className={
          props.context === "MessageDate"
            ? "MessageDate-timestamp"
            : "Chat-message-time"
        }
      >
        Yesterday
      </div>
    );
  }
  return (
    <div
      className={
        props.context === "MessageDate"
          ? "MessageDate-timestamp"
          : "Chat-message-time"
      }
    >
      {moment.unix(props.date).format("DD/MM/YY")}
    </div>
  );
};

export default MessageDate;

MessageDate.propTypes = {
  context: PropTypes.oneOf(["MessageDate", "SingleChat"]),
  date: PropTypes.number.isRequired
};
