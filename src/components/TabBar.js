import React from 'react'
import './TabBar.css'
import favouritesIcon from '../assets/favourites.svg';
import messagesIcon from '../assets/messages.svg'
import sendNewIcon from '../assets/new_chat.svg'


import PropTypes from 'prop-types'


export default class TabBar extends React.Component {
    constructor() {
        super();
        this.state = {
            options: [
                {
                    text: 'Favourites',
                    icon: favouritesIcon,
                },
                {
                    text: 'Messages',
                    icon: messagesIcon,
                },
                {
                    text: 'Send New',
                    icon: sendNewIcon,
                },
              ]
            
        }
    }
    render() {
        return (
            <div className='TabBar'>
                {this.state.options.map((el, index) => {
                    return (
                        el.text === this.props.activeTab ?
                            <img className='TabBar-Icon' key={index} src={el.icon} alt={el.text}/> :
                            <span
                                onClick={() => this.props.selectTab(el.text)}
                                key={index}>{el.text}
                            </span>
                    )
                })}
            </div>
        )
    }
}

TabBar.propTypes = {
    
}