import React from "react";
import backImage from "../assets/backbutton.svg";
import './Back.css'

class Back extends React.Component {
  render() {
    return (
      <div className="BackButton">
        <img alt="backbutton" onClick={this.props.onClick} src={backImage} />
      </div>
    );
  }
}

export default Back;
