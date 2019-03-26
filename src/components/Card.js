import React, { Component } from 'react'
import './Card.css'
import Avatar from './Avatar.js'
import MessageDate from './MessageDate'
import dots from '../assets/dots.png'
import notifications from '../assets/notifica_orange-20.svg'
import notifications1 from '../assets/notifica_grey-20.svg'
import PropTypes from 'prop-types'

const dotsF = evt => {
    evt.stopPropagation()
    console.log('highlight card')
}

const showNotifications = (num, silent) => {
    if (num === 0) return
    else {
        if (!silent) {
            return (
                <div className="Card-notification">
                    <img alt='notifications' src={notifications} />
                    <span className="Card-numUnread">{num}</span>
                </div>

            )
        }
        else {
            return (
                <div className="Card-notification">
                    <img alt='notifications' src={notifications1} />
                    <span className="Card-numUnread">{num}</span>
                </div>
            )
        }
    }
}

const getUnread = num => {
    if (num === 0) return 'Card inactive'
    else return 'Card active'
}

class Card extends Component {

    render() {
        if (!this.props.favouritesActive) {
            return (
                <div onClick={this.props.onClick} className={getUnread(this.props.data.numUnread)}>
                    {showNotifications(this.props.data.numUnread, this.props.data.silenced)}
                    <div className="Card-Avatar">
                        <Avatar
                            name={this.props.data.name}
                            imgurl={this.props.data.image} //this.props.data.image
                            size="small"
                            onClick={() => console.log('for use in profile')} />
                    </div>
                    <div className="Card-message-text">
                        <div className="Card-username">{this.props.data.name}</div>
                        <div className="Card-text-preview">{this.props.data.lastMsg.text}</div>
                    </div>
                    <MessageDate date={this.props.data.lastMsg.date} />
                    <div className="Card-dots-area" >
                        <img alt='dots' className="Card-dots" onClick={dotsF} src={dots} />
                    </div>
                </div>
            )
        }
        else {
            if(this.props.data.favourite){
                return (
                    <div onClick={this.props.onClick} className={getUnread(this.props.data.numUnread)}>
                        {showNotifications(this.props.data.numUnread, this.props.data.silenced)}
                        <div className="Card-Avatar">
                            <Avatar
                                name={this.props.data.name}
                                imgurl={this.props.data.image} //this.props.data.image
                                size="small"
                                onClick={() => console.log('for use in profile')} />
                        </div>
                        <div className="Card-message-text">
                            <div className="Card-username">{this.props.data.name}</div>
                            <div className="Card-text-preview">{this.props.data.lastMsg.text}</div>
                        </div>
                        <MessageDate date={this.props.data.lastMsg.date} />
                        <div className="Card-dots-area" >
                            <img alt='dots' className="Card-dots" onClick={dotsF} src={dots} />
                        </div>
                    </div>
                )                
            }
            return null
        }


    }
}

export default Card

Card.propTypes = {
    data: PropTypes.shape(
        {
            name: PropTypes.string.isRequired,
            image: PropTypes.any,
            lastMsg: PropTypes.shape({
                sender: PropTypes.string,
                text: PropTypes.string,
                date: PropTypes.string
            }),
            lastOpened: PropTypes.string.isRequired,
            favourite: PropTypes.bool.isRequired,
            silenced: PropTypes.bool.isRequired,
            onClick: PropTypes.func
        }
    )
}
