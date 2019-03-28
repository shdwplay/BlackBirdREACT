import React from "react";
import Contact from "./Contact";
import "./ContactList.css";

export default class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        {
          image: {},
          name: "Alessandra De Rossi",
          status: "away"
        },
        {
          image: {},
          name: "Angela Stewart",
          status: "away"
        },
        {
          image: {},
          name: "James McAville",
          status: "away"
        },
        {
          image: {},
          name: "Lucille Davis",
          status: "away"
        },
        {
          image: {},
          name: "Francis Scott",
          status: "away"
        },
        {
          image: {},
          name: "Robert Evans",
          status: "away"
        }
      ]
    };
  }
  render() {
    return (
      <div className="ContactList">
        {this.state.contacts.map((el, index) => (
          <Contact
            key={index}
            name={el.name}
            image={el.image}
            onClick={() => {
              this.setState({ activeChat: index });
              this.props.changeChat([el.name, el.status]);
            }}
          />
        ))}
      </div>
    );
  }
}
