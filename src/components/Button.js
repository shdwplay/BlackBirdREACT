import React from "react";
import "./Button.css";

//props text, function, type
const Button = props => {
  return (
    <div className="Button-area">
      <button className={"Button " + props.type} onClick={props.function}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;
