import React, { Component } from "react";
import Card from "./Card";
import "./CardList.css";
import PropTypes from "prop-types";

//props: cardList, activeChat
class CardList extends Component {
<<<<<<< HEAD
 
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
=======
  render() {
    return (
      <div className="CardList">
        {this.props.cardList.map((el, index) => (
          <Card
            key={index}
            //isActive={this.props.activeChat === index}
            onClick={() => {
              this.props.selectChat({
                colluctor: el.colluctor,
                status: el.status,
                messages: el.messages
              });
            }}
            data={el}
          />
        ))}
      </div>
    );
  }
>>>>>>> 413cf73731cf3368c6361360a10db680381d26de
}

export default CardList;

CardList.propTypes = {
  cardList: PropTypes.array,
  activeChat: PropTypes.shape([PropTypes.string, PropTypes.string]),
  selectChat: PropTypes.func
};
