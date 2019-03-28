import React, { Component } from 'react'
import Card from './Card'
import './CardList.css';
import pic1 from '../assets/profile1.jpg'
import pic2 from '../assets/profile2.jpg'
import pic3 from '../assets/profile3.jpg'
import configSecond from './listConfigSecond'


class CardList extends Component {
 
    /* componentDidMount(){
        setTimeout(()=>{
            this.setState(configSecond)
        },2000)
    } */
   
    render () {
        return(
            <div className="CardList">
                {console.log(this.props.collocutors)}
                {this.props.collocutors.map((el,index) =>{
                console.log(el.name)
                console.log(el.status)
                return <Card
                key={index} 
                onClick={() => {
                        this.setState({activeChat:index})
                        this.props.selectChat([el.collocutor, el.status])
                    }
                }
                data={el}/>})}
            </div>
        )
    }
}

export default CardList 