import React, { Component } from 'react'
import CardList from './components/CardList'
import './App.css'

import Login from './components/Login'

class App extends Component {
  state={
    page:'CardList',
    activeChat:0,
  }

  render() {
    return(
      <div><Login /></div>
    )

    // switch(this.state.page) {
    //   case 'Favourites':
    //     break;
  
    //   case 'New':
    //     break;
  
    //   default:
    //       return <CardList activeChat={this.state.activeChat}/>
    // }
    // return (
    //   <div className="App">
    //     {this.state.page}
    //   </div>
    // )
  }
}

export default App
