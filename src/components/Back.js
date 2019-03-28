import React from "react";
import backImage from "../assets/backbutton.svg";

class Back extends React.Component {
  render() {
    return (
      <div>
        <img onClick={this.props.onClick} src={backImage} />
      </div>
    );
  }
}

export default Back;
