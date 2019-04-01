import React from "react";
import PropTypes from "prop-types";
import "./Button.css";
//use CLASSNAMES!!

//props text, function, type
const Button = props => {
  return (
    <div className="Button-area">
      <button className={"Button " + props.type} onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
