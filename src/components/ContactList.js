import React from "react";
import Contact from "./Contact";
import "./ContactList.css";

export default class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        {
          image: '/images/profile_alessandra.jpg',
          name: "Alessandra De Rossi",
          status: "away"
        },
        {
          image: '/images/profile_angela.png',
          name: "Angela Stewart",
          status: "away"
        },
        {
          image: '/images/profile_james.png',
          name: "James McAville",
          status: "away"
        },
        {
          image: '/images/profile_lucille.png',
          name: "Lucille Davis",
          status: "away"
        },
        {
          image: '/images/profile_francis.jpg',
          name: "Francis Scott",
          status: "away"
        },
        {
          image: '/images/profile_robert.jpg',
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
