import React, { Component } from 'react';
import Avatar from './Avatar.js'

class Card extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'Ellen Pots',
            textPreview:'hello, what time are you coming?',
            notifications:0,
        }
    }

    render() {
      return (
        <div className="Card">
            <Avatar 
                name={this.state.name} 
                src='./images/profile.jpg' 
                className="small" 
                onClick={()=>console.log('wtf')}/>
            <div class="message-card-text">
                    <div class="message-card-username">{this.state.name}</div>
                    <div class="message-card-preview">{this.state.textPreview}</div>
                </div>
                <div class="timestamp">11:12</div>
                <div class="tap-threedots" >
                    <img class="dots" src="images/threedots.svg" />
                </div>
        </div>
      );
    }
  }
  
  export default Card;