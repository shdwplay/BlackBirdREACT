import React from 'react'
import './MessageDate.css';
import PropTypes from 'prop-types'
import moment from 'moment'

class MessageDate extends React.Component {
  detectDate(date) {
    date = moment.unix(date)
    let diff = moment().diff(date, 'days')
    return diff;
  }
  render() {
    if(this.detectDate(this.props.date) < 1) {
      return(
        <div className={this.props.context === 'MessageDate' ? 'MessageDate-timestamp' : 'SingleChat-message-time'}>
          {moment.unix(this.props.date).format('kk:mm')}
        </div>
      )
    }
    if(this.detectDate(this.props.date) < 2) {
      return(
        <div className={this.props.context === 'MessageDate' ? 'MessageDate-timestamp' : 'SingleChat-message-time'}>
          Yesterday
        </div>
      )
    }
    return (
      <div className={this.props.context === 'MessageDate' ? 'MessageDate-timestamp' : 'SingleChat-message-time'}>
        {moment.unix(this.props.date).format('DD/MM/YYYY')}
      </div>
    )
  }
}

export default MessageDate;

MessageDate.propTypes = {
  context: PropTypes.oneOf(['MessageDate','SingleChat']),
  date: PropTypes.string.isRequired,
}