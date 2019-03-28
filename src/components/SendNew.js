import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import ContactList from "./ContactList";
//props searchString
class Messages extends React.Component {
  searchFilter(str) {
    let names;
    let filtered;
  }
  render() {
    this.searchFilter();
    return (
      <div className="container">
        <Header>
          <TabBar
            activeTab={this.props.activeTab}
            selectTab={this.props.selectTab}
          />
        </Header>
        )}
        <ContactList
          contactList={this.props.contactList}
          //activeChat={this.props.activeChat}
          selectChat={this.props.selectChat}
        />
      </div>
    );
  }
}

export default Messages;
