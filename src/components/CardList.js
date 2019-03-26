import React, { Component } from 'react'
import Card from './Card'

import pic1 from '../assets/profile1.jpg'
import pic2 from '../assets/profile2.jpg'
import pic3 from '../assets/profile3.jpg'
class CardList extends Component {
    state = {
        elements:[
            {
                image:pic1,
                name:'Antonio Pellegrini',
                lastMsg:{text:':P',sender:'Edoardo Accivile', date:"11:59"},
                lastOpened:'11:01',
                favourite:true,
                silenced:true,
                numUnread:0
            },
            {
                image:pic2,
                name:'Chiara Baroni',
                lastMsg:{text:'Hello!',sender:'Antonio Pellegrini', date:"1:00"},
                lastOpened:'4:04',
                favourite:false,
                silenced:true,
                numUnread:7
            },
            {
                image:pic3,
                name:'Luke Skywalker',
                lastMsg:{text:'I\'m Luke Skywalker. I\'m here to rescue you.',sender:'Edoardo Accivile', date:"3:00"},
                lastOpened:'4:20',
                favourite:true,
                silenced:false,
                numUnread:6
            }            
        ]
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                elements:[
                    {
                        image:pic2,
                        name:'Chiara Baroni',
                        lastMsg:{text:'What\'s up?',sender:'Antonio Pellegrini', date:"1:05"},
                        lastOpened:'4:04',
                        favourite:false,
                        silenced:true,
                        numUnread:8
                    },
                    {
                        image:pic1,
                        name:'Antonio Pellegrini',
                        lastMsg:{text:':P',sender:'Edoardo Accivile', date:"11:59"},
                        lastOpened:'11:01',
                        favourite:true,
                        silenced:true,
                        numUnread:0
                    },
                    {
                        image:pic3,
                        name:'Luke Skywalker',
                        lastMsg:{text:'I\'m Luke Skywalker. I\'m here to rescue you.',sender:'Edoardo Accivile', date:"3:00"},
                        lastOpened:'4:20',
                        favourite:true,
                        silenced:false,
                        numUnread:6
                    }
                ]

            })
        },2000)
    }
    
    render () {
        return(
            <div>
                {this.state.elements.map(el =><Card onClick={evt =>console.log('open chat with '+el.name)} data={el}/>)}
            </div>
        )
    }
}

export default CardList 