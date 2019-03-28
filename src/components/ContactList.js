import React from "react";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import "./ContactList.css";

export default class ContactList extends React.Component {
  render() {
    return (
      <div className="ContactList">
        {this.props.contactList.map((el, index) => (
        <Link to={"/chat/" + el.collocutor}>
          <Contact
            data={el}
            onClick={() => {
              this.props.selectChat({
                collocutor: el.collocutor,
                status: el.status,
                messages: el.messages
              });
            }}
          />
        </Link>
        ))}
      </div>
    );
  }
}
