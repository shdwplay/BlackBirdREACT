import React from 'react'
import './TabBar.css'

import PropTypes from 'prop-types'


export default class TabBar extends React.Component {
    render() {
        return (
            <div className='TabBar'>
                {this.props.options.map((el, index) => {
                    return (
                            index === this.props.active ?
                                <img className='TabBar-Icon' key={index} src={el.icon} alt={el.text}></img> :
                                <span
                                    onClick={() => this.props.selectTab(index)}
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