import React from "react";
import backImage from "../assets/backbutton.svg";
import "./Back.css";
import PropTypes from "prop-types";

const Back = props => {
  return (
    <div className="BackButton">
      <img alt="backbutton" onClick={props.onClick} src={backImage} />
    </div>
  );
};

export default Back;

Back.propTypes = {
  onClick: PropTypes.func.isRequired
};
