import React, { Component } from 'react'
import './Card.css'
import Avatar from './Avatar.js'
import MessageDate from './MessageDate'
import dots from '../assets/dots.png'
import notifications from '../assets/notifica_orange-20.svg'
import notifications1 from '../assets/notifica_grey-20.svg'
import PropTypes from 'prop-types'

import HighlightedCard from './HighlightedCard'

// const dotsF = evt => {
//     evt.stopPropagation()
//     this.setState({highlighted:true})
//     return(
//         <HighlightedCard/>
//     )
//     console.log('highlight card')
// }

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
    state={
        highlighted:false,
        favourite:this.props.data.favourite,
        silenced:this.props.data.silenced
    }

    dotsF(evt) {
        evt.stopPropagation()
        this.setState({highlighted:true})
        console.log('highlight card')
    }

    setFavourite(evt){
        evt.stopPropagation()
        this.state.favourite ? this.setState({favourite:false}) : this.setState({favourite:true})
    }

    
    setSilenced(evt){
        evt.stopPropagation()
        this.state.silenced ? this.setState({silenced:false}) : this.setState({silenced:true})
    }

    setHighlight(evt){
        evt.stopPropagation()
        this.state.highlighted ? this.setState({highlighted:false}) : this.setState({highlighted:true})
    }

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
                        <img alt='dots' className="Card-dots" onClick={evt=>this.dotsF(evt)} src={dots} />
                    </div>
                    {this.state.highlighted ? 
                        <HighlightedCard 
                            favourite={this.state.favourite} 
                            silence={this.state.silenced} 
                            fav={evt=>this.setFavourite(evt)} 
                            sil={evt=>this.setSilenced(evt)} 
                            high={evt => this.setHighlight(evt)}
                        /> :
                        null}
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
                            <img alt='dots' className="Card-dots" onClick={evt=>this.dotsF(evt)} src={dots} />
                        </div>
                        {this.state.highlighted ? 
                    <HighlightedCard favourite={this.props.data.favourite} silence={this.props.data.silenced} fav={()=>this.setFavourite} sil={this.setSilenced}/> :
                    null}                        
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
