import pic1 from '../assets/profile1.jpg'
import pic2 from '../assets/profile2.jpg'
import pic3 from '../assets/profile3.jpg'

let configFirst = {
    updated:false,
    favouritesActive: false,
    elements:[
        {
            image:pic1,
            name:'Antonio Pellegrini',
            lastMsg:{text:':P',sender:'Edoardo Accivile', date:1553591343},
            lastOpened:'11:01',
            favourite:true,
            silenced:true,
            numUnread:0
        },
        {
            image:pic2,
            name:'Chiara Baroni',
            lastMsg:{text:'Hello!',sender:'Antonio Pellegrini', date:1553573343},
            lastOpened:'4:04',
            favourite:false,
            silenced:true,
            numUnread:7
        },
        {
            image:pic3,
            name:'Luke Skywalker',
            lastMsg:{text:'I\'m Luke Skywalker. I\'m here to rescue you.',sender:'Edoardo Accivile', date:1553418543},
            lastOpened:'4:20',
            favourite:true,
            silenced:false,
            numUnread:6
        }            
    ]
}

export default configFirst