import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import ContactList from "./ContactList";
//props searchString
const Messages = props => {
  return (
    <div className="container">
      <Header name={props.name}>
        <TabBar activeTab={props.activeTab} selectTab={props.selectTab} />
      </Header>
      )}
      <ContactList
        addCollocutor={props.addCollocutor}
        currentUser={props.currentUser}
        contactList={props.contactList}
        //activeChat={props.activeChat}
        selectChat={props.selectChat}
      />
    </div>
  );
};

export default Messages;
