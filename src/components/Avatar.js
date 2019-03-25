import React from 'react'
import './Avatar.css'
import PropTypes from 'prop-types'

class Avatar extends React.Component {
  getCapitals(string) {
    let name = string.split(' ');
    return name[0][0]+name[name.length-1][0]
  }
  
  render() {
    console.log(this.props)
    if(this.props.imgurl !== '') {
      return (
        <img
          alt={this.props.name}
          src={this.props.imgurl}
          className={'Avatar avatar-'+this.props.size}
          onClick={this.props.onClick}
          name={this.props.name}
        />
      )
    } else {
      return (
        <div className='Avatar' id='avatar-capitals'>
          {this.getCapitals(this.props.name)}
        </div>
      )
    }
  }
}

export default Avatar;

Avatar.propTypes = {
  imgurl: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
}