import React, { Component } from 'react'
import Card from './Card'

import configFirst from './listConfigFirst'
import configSecond from './listConfigSecond'


class CardList extends Component {
    state = configFirst
 
    // componentDidMount(){
    //     setTimeout(()=>{
    //         this.setState(configSecond)
    //     },2000)
    // }
    
    render () {
        return(
            <div>
                {this.state.elements.map(el =><Card favouritesActive={this.state.favouritesActive} onClick={evt =>console.log('open chat with '+el.name)} data={el}/>)}
            </div>
        )
    }
}

export default CardList 