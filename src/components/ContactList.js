import React from "react";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import "./ContactList.css";
import { getContacts } from "../api";
import {newCollocutor} from "../utils";
export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
  }
  componentDidMount() {
    getContacts(this.props.currentUser, x =>
      this.setState({ contacts: x, loading: false })
    );
  }
  render() {
    
    return (
      <div className="ContactList">
        {this.state.contacts.map((el, index) => (
          <Link
            to={{
              pathname: "/messages/" + el.id,
              /* search: "?sort=name",
              hash: "#the-hash", */
              /* state: { 
                name: el.name,
                status: el.userStatus
              } */
            }}
          >
            <Contact
              key={index}
              data={el}
              onClick={() => {
                this.props.selectChat(el.id);
                this.props.addCollocutor(newCollocutor(el.id, el.name, el.userStatus))
              }}
            />
          </Link>
        ))}
      </div>
    );
  }
}
