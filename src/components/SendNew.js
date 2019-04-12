import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import ContactList from "./ContactList";
//this.props searchString
class sendNew extends React.Component {
  constructor(props) {
    super(props);
    this.props.selectTab("sendNew");
  }

  render() {
    return (
      <div
        className={`Messages-container ${
          this.props.activeChat ? "tabletMessage" : ""
        }`}
      >
        <Header
          name={this.props.name}
          openSearch={this.props.openSearch}
          searchToggle={this.props.searchToggle}
          setQueryString={this.props.setQueryString}
          querystr={this.props.querystr}
        >
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
          selectChat={this.props.selectChat}
          querystr={this.props.querystr}
          searchToggle={this.props.searchToggle}
        />
      </div>
    );
  }
}

export default sendNew;
