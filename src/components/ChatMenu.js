import React, { Component } from "react";
import { search } from "../utils";
import "./MenuChat.css";
import Search from "./Search";
import threeDotsIcon from "../assets/threedots.svg";


class MenuChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  toggleShow() {
      this.setState({
          show: !show,
      })
  }

  render() {
      if (this.state.show === false) {
        return (
            <div className="">
                <img
                    className="" 
                    src={threeDotsIcon}
                    alt="menu"
                    onClick={() => toggleShow()}
                />
            </div>
        )
      }
      return (
          <div className="">
              <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
              </ul>
          </div>
      )
  }

//   searchFunction(e) {
//     this.setState({
//       string: e.target.value
//     });
//     this.setState({
//       results: search(e.target.value)
//     });
//   }

//   render() {
//     return (
//       <div className="headerchat">
//         {!this.state.toggleOpen && (
//           <div className="user">
//             <div className="name">{this.props.name}</div>
//             <div className="status">{this.props.status}</div>
//           </div>
//         )}
//         <Search
//           searchToggle={this.props.searchToggle}
//           string={this.state.string}
//           onChange={e => this.searchFunction(e)}
//           openSearch={() => this.props.setSearchOpen()}
//         />
//       </div>
//     );
//   }
// }

export default MenuChat;
