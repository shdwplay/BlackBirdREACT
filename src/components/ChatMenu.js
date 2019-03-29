import React, { Component } from "react";
import "./ChatMenu.css";
import threeDotsIcon from "../assets/threedots.svg";
import closeIcon from "../assets/ics.svg";


class MenuChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    toggleShow() {
        this.setState({
            show: !this.state.show,
        })
    }

    render() {
        if (this.state.show === false) {
            return (
                <div className="">
                    <img
                        className="open-icon" 
                        src={threeDotsIcon}
                        alt="more"
                        onClick={() => this.toggleShow()}
                    />
                </div>
            )
        }
        return (
            <div>
                <div className="">
                    <img
                        className="close-icon" 
                        src={closeIcon}
                        alt="close"
                        onClick={() => this.toggleShow()}
                    />
                </div>
                <div className="">
                    <ul className="menu">
                        <li>Add Favorite</li>
                        <li>Mute</li>
                        <li>Search</li>
                        <li>Delete conversation</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuChat;
