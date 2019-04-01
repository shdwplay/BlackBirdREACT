import React from "react";
import "./Avatar.css";
import PropTypes from "prop-types";
import { getCapitals } from "../utils";

const Avatar = props => {
  if (props.imgurl) {
    return (
      <img
        alt={props.name}
        src={props.imgurl}
        className={"Avatar Avatar-" + props.size}
        onClick={props.onClick}
        name={props.name}
      />
    );
  }
  return (
    <div className={"Avatar Avatar-" + props.size}>
      {getCapitals(props.name)}
    </div>
  );
};

export default Avatar;

Avatar.propTypes = {
  imgurl: PropTypes.string,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large"]).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
