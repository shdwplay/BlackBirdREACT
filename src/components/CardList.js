import React, { Component } from 'react'
import Card from './Card'
import './CardList.css';
import pic1 from '../assets/profile1.jpg'
import pic2 from '../assets/profile2.jpg'
import pic3 from '../assets/profile3.jpg'
import configSecond from './listConfigSecond'


class CardList extends Component {
    state = {activeChat:this.props.activeChat, updated:false,
        favouritesActive: false,
        elements:[
            {
                image:pic1,
                name:'Antonio Pellegrini',
                lastMsg:{text:':P',sender:'Edoardo Accivile', date:1553591343},
                lastOpened:'11:01',
                favourite:true,
                silenced:true,
                numUnread:0,
                status: 'away',
            },
            {
                image:pic2,
                name:'Chiara Baroni',
                lastMsg:{text:'Hello!',sender:'Antonio Pellegrini', date:1553573343},
                lastOpened:'4:04',
                favourite:false,
                silenced:true,
                numUnread:7,
                status: 'online',
            },
            {
                image:pic3,
                name:'Luke Skywalker',
                lastMsg:{text:'I\'m Luke Skywalker. I\'m here to rescue you.',sender:'Edoardo Accivile', date:1553418543},
                lastOpened: '4:20',
                favourite:true,
                silenced:false,
                status:'offline',
                numUnread:6,
            }            
        ]}
 
    componentDidMount(){
        setTimeout(()=>{
            this.setState(configSecond)
        },2000)
    }
   
    render () {
        return(
            <div className="CardList">
                {this.state.elements.map((el,index) =>{
                console.log(this.state.elements)
                return <Card
                key={index} 
                favouritesActive={this.props.favouritesActive} 
                isActive = {this.state.activeChat === index}
                onClick={() => {
                        this.setState({activeChat:index})
                        this.props.changeChat([el.name, el.status])
                    }
                }
                data={el}/>})}
            </div>
        )
    }
}

export default CardList 