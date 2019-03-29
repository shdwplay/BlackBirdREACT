import React, { Component } from "react";
import { search } from "../utils";
import "./HeaderChat.css";
import Search from "./Search";
import Back from "./Back";

const HeaderChat = props => {
  // searchFunction(e) {
  //   this.setState({
  //     string: e.target.value
  //   });
  //   this.setState({
  //     results: search(e.target.value)
  //   });
  // }

  return (
    <div className="headerchat">
      {!props.toggleOpen && (
        <div className="user">
          <div className="name">{props.name}</div>
          <div className="status">{props.status}</div>
        </div>
      )}
      <Search
        searchToggle={props.searchToggle}
        string={props.string}
        //onChange={e => searchFunction(e)}
        openSearch={() => props.setSearchOpen()}
      />
    </div>
  );
};

export default HeaderChat;
