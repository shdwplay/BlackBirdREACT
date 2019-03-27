import React from 'react'
import Contact from './Contact'
import './ContactList.css'
import pic1 from '../assets/profile_alessandra.jpg'
import pic2 from '../assets/profile_angela.png'
import pic3 from '../assets/profile_james.png'
import pic4 from '../assets/profile_lucille.png'
import pic5 from '../assets/profile_francis.jpg'
import pic6 from '../assets/profile_robert.jpg'

export default class ContactList extends React.Component {
    constructor(){
        super();
        this.state = {
            contacts:[
                {
                    image:pic1,
                    name:'Alessandra De Rossi',
                    status: 'away',
                },
                {
                    image:pic2,
                    name:'Angela Stewart',
                    status: 'away',
                },
                {
                    image:pic3,
                    name:'James McAville',
                    status: 'away',
                },
                {
                    image:pic4,
                    name:'Lucille Davis',
                    status: 'away',
                },
                {
                    image:pic5,
                    name:'Francis Scott',
                    status: 'away',
                },
                {
                    image:pic6,
                    name:'Robert Evans',
                    status: 'away',
                },
            ]
        }
    }
    render() {
        return (
            <div className='ContactList'>
                {this.state.contacts.map((el, index)=> <Contact 
                key={index}
                name={el.name}
                image={el.image}
                onClick={() => {
                    this.setState({activeChat:index})
                    this.props.changeChat([el.name, el.status])
                }
            }
                />
                )}
            </div>
        )
    }
}