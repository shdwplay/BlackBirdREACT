import React from "react";
import "./Avatar.css";
import PropTypes from "prop-types";

class Avatar extends React.Component {
  getCapitals(string) {
    let name = string.split(" "); //.map s => s.charAt(0).toUpperCase()
    return name[0][0] + name[name.length - 1][0];
  }

  render() {
    if (this.props.imgurl !== "") {
      return (
        <img
          alt={this.props.name}
          src={this.props.imgurl}
          className={"Avatar Avatar-" + this.props.size}
          onClick={this.props.onClick}
          name={this.props.name}
        />
      );
    }
    return (
      <div className={"Avatar Avatar-" + this.props.size}>
        {this.getCapitals(this.props.name)}
      </div>
    );
  }
}

export default Avatar;

Avatar.propTypes = {
  imgurl: PropTypes.string,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large"]).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
