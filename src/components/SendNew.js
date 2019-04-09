import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import ContactList from "./ContactList";
//this.props searchString
class sendNew extends React.Component {
  constructor(props) {
    super(props);
    this.props.setSendNewTab("sendNew");
  }
  render() {
    return (
      <div
        className={`Messages-container ${
          this.props.activeChat ? "tabletMessage" : ""
        }`}
      >
        <Header name={this.props.name}>
          <TabBar
            context="onlymobile"
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
            searchToggle={this.props.searchToggle}
          />
        </Header>
        <ContactList
          addCollocutor={this.props.addCollocutor}
          currentUser={this.props.currentUser}
          contactList={this.props.contactList}
          //activeChat={this.props.activeChat}
          selectChat={this.props.selectChat}
        />
      </div>
    );
  }
}

export default sendNew;
