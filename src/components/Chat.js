import React from 'react'
import './Chats.css'
import send from '../images/send.svg'
import attach from '../images/attachment.svg'

export default class Chat extends React.Component {
    render() {
        return (
            <div className="Chat-container">
                <div className="Chat" id="chat">
                    {this.props.messages.map((el,index) => {
                        return (
                            <div key={index} className={el.sender === this.props.user ? "Chat-message Chat-message-sent" : "Chat-message Chat-message-received"} > 
                                <div className="Chat-message-text">
                                    {el.text}
                                </div>
                                <div className="Chat-message-time">11:02</div>
                            </div>
                        )
                    })}
                </div>
                <div className="input-keyboard">
                    <input value={this.props.value} onChange={(e) => this.props.newMessage(e)} type="textarea" id="input-keyboard" name="input-keyboard" placeholder="Start typing.." />
                    <img id="attachment-icon" src={attach} alt='attach file'/>                    
                    <img id="send-icon" onClick={()=>{
                        this.props.saveMessage();
                        }} src={send} alt='send message'/>
                </div>
            </div>
        )
    }
}