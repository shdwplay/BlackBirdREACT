import React, { Component } from "react";
import Avatar from "./Avatar";
import TabBar from "./TabBar";
//import TabBar from './Tabar';
import "./Workspace.css";
import { Link } from "react-router-dom";

class Workspace extends Component {
  render() {
    return (
      <div className={`workspace ${this.props.context}`}>
        <Link to="/profile">
          <Avatar name={this.props.name} size="medium" />
        </Link>
        <TabBar
          context="onlytablet"
          activeTab={this.props.activeTab}
          selectTab={this.props.selectTab}
          searchToggle={this.props.searchToggle}
          toggleFavourites={this.props.toggleFavourites}
        />
      </div>
    );
  }
}

export default Workspace;
