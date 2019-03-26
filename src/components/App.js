import React, { Component } from 'react';
import './App.css';
import TabBar from './TabBar'
import Chat from './Chat'
import Card from './Card'
import favouritesIcon from '../images/favourites.svg';
import messagesIcon from '../images/messages.svg'
import sendNewIcon from '../images/new_chat.svg'
import packageImg from '../images/package.jpg';

let user = 'antoniopellegrini'
let collocutor = 'chiarabaroni'

const messages = [
  {
    sender: 'antoniopellegrini',
    text: 'Hello, have you had a chance to check out the prototype I sent you?'
  },
  {
    sender: 'chiarabaroni',
    text: 'Hey sorry, not yet! I\'ll do it as soon as I get to the airport! I have a fligth at 5!'
  },
  {
    sender: 'antoniopellegrini',
    text: 'Ok great, let me know when you are done!'
  },
  {
    sender: 'chiarabaroni',
    text: 'Sure thing! 😊'
  },
  {
    sender: 'chiarabaroni',
    text: 'Btw was there a package for me in today\'s mail?'
  },
  {
    sender: 'antoniopellegrini',
    text: 'Yep! 😊'
  },
  {
    sender: 'antoniopellegrini',
    text: <img className='Chat-message-img' src={packageImg} />
  },
]

const options = [
  {
      text: 'FAVOURITES',
      icon: favouritesIcon,
  },
  {
      text: 'MESSAGES',
      icon: messagesIcon,
  },
  {
      text: 'SEND NEW',
      icon: sendNewIcon,
  },
]

class App extends Component {
  constructor() {
    super();
    this.state = {
      active: 1,
      newMessage: '',
      messageList: messages
    }
  }
  selectTab(idx) {
    this.setState({
        active: idx
    })
  }
  newMessage(e) {
    this.setState({
      newMessage: e.target.value
    })
  }
  saveMessage() {
    this.setState({
      messageList: messages.push({
        sender: user,
        text: this.state.newMessage
      }),
      newMessage: '',
    })
    
  }
  render() {
    return (
      <div className="App">
      {/* <TabBar
        options={options}
        active={this.state.active}
        selectTab={(index) => this.selectTab(index)} /> */}
      <Chat
        user={user}
        collocutor={collocutor} 
        messages={messages}
        value={this.state.newMessage}
        newMessage={(e)=>this.newMessage(e)}
        saveMessage={()=>this.saveMessage()}/> 
      </div>
    );
  }
}

export default App;
