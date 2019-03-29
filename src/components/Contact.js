import React from 'react'
import Avatar from './Avatar'
import './Contact.css'

export default class Contact extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick} className='Contact'>
                <div className='contact-pic-area'>
                    <Avatar
                        name={this.props.data.name}
                        imgurl={this.props.data.image} //this.props.data.image
                        size="small"
                    />
                </div>
                <div className='contact-name'>{this.props.data.name}</div>
            </div>
        )
    }
}