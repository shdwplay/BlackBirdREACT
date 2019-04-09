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
      <div className="container">
        <Header name={this.props.name}>
          <TabBar
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
          />
        </Header>
        )}
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
