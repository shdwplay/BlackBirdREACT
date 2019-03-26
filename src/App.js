import React, { Component } from 'react'
import CardList from './components/CardList'
import './App.css'

class App extends Component {
  state={
    page:'CardList',
    activeChat:0,
  }

  render() {
    switch(this.state.page) {
      case 'Favourites':
        break;
  
      case 'New':
        break;
  
      default:
          return <CardList activeChat={this.state.activeChat}/>
    }
    return (
      <div className="App">
        {this.state.page}
      </div>
    )
  }
}

export default App
