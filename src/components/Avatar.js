import React, { Component } from 'react'
import './Avatar.css'
import PropTypes from 'prop-types'

class Avatar extends Component {
  render() {
    return (
      <img
        alt={this.props.name}
        src={this.props.imgurl}
        className={'avatar '+this.props.size}
        onClick={this.props.onClick}
        name={this.props.name}
      />
    )
  }
}

export default Avatar;

Avatar.propTypes = {
  imgurl: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
}