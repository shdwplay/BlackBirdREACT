import React from 'react'
import './MessageDate.css';
import PropTypes from 'prop-types'
import moment from 'moment'

class MessageDate extends React.Component {
  detectDate(date) {
    console.log(date)
    date = moment.unix(date)
    let diff = moment().diff(date, 'days')
    return diff;
  }
  render() {
    if(this.detectDate(this.props.date) < 1) {
      return(
        <div className='MessageDate-timestamp'>
          {moment.unix(this.props.date).format('kk:mm')}
        </div>
      )
    }
    if(this.detectDate(this.props.date) < 2) {
      return(
        <div className='MessageDate-timestamp'>
          Yesterday
        </div>
      )
    }
    return (
      <div className='MessageDate-timestamp'>
        {moment.unix(this.props.date).format('DD/MM/YYYY')}
      </div>
    )
  }
}

export default MessageDate;

MessageDate.propTypes = {
  date: PropTypes.string.isRequired,
}