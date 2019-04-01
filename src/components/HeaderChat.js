import React, { Component } from "react";
import ChatMenu from "./ChatMenu";
import "./HeaderChat.css";
// import { search } from "../utils";
// import Search from "./Search";
// import Back from "./Back";

class HeaderChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      string: "",
      results: []
    };
  }

  render() {
    return (
      <div className="headerchat">
        {!this.state.toggleOpen && (
          <div className="user">
            <div className="name">{this.props.name}</div>
            <div className="status">{this.props.status}</div>
          </div>
        )}
        <ChatMenu />
      </div>
    );
  }
}

export default HeaderChat;

// searchFunction(e) {
//   this.setState({
//     string: e.target.value
//   });
//   this.setState({
//     results: search(e.target.value)
//   });
// }
// <Search
// searchToggle={this.props.searchToggle}
// string={this.state.string}
// onChange={e => this.searchFunction(e)}
// openSearch={() => this.props.setSearchOpen()}
// />
