import React, { Component } from 'react';
import './App.css';
import Avatar from './Avatar';
import MessageDate from './MessageDate';

class App extends Component {
  render() {
    return (
      <div>
        <Avatar imgurl='' name='Edoardo Accivile' size='small'/>
        <MessageDate date={1553531252}/>
      </div>
    );
  }
}

export default App;