import React, { Component } from "react";
import Avatar from "./Avatar";
//import TabBar from './Tabar';
import "./Workspace.css";

class Workspace extends Component {
  state = {
    elements: [
      {
        image: {},
        name: "Antonio Pellegrini"
      }
    ]
  };
  render() {
    return (
      <div className="workspace">
        <Avatar
          name={this.state.elements.data.name}
          imgurl={this.state.elements.data.image} //this.props.data.image
          size="medium"
          onClick={() => console.log("for use in profile")}
        />
        {/* <TabBar /> */}
      </div>
    );
  }
}

export default Workspace;
