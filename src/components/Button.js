import React from "react";
import "./Button.css";

//props text, function, type
class Button extends React.Component {
  render() {
    return (
      <div className="Button-area">
        <button
          className={"Button " + this.props.type}
          onClick={this.props.function}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default Button;
