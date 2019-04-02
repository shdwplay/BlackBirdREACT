import React, { Component } from "react";
import threeDotsIcon from "../assets/threedots.svg";
import closeIcon from "../assets/ics.svg";
import "./ChatMenu.css";
import PropTypes from "prop-types";

class ChatMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    };

    toggleShow() {
        this.setState({
            show: !this.state.show,
        })
    };

    render() {
        if (!this.state.show) {
            return (
                <div className="chat-menu">
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
            <div className="chat-menu">
                <img
                    className="close-icon" 
                    src={closeIcon}
                    alt="close"
                    onClick={() => this.toggleShow()}
                />
                <div className="menu">
                    <div
                        className="option"
                        onClick={() => console.log('Add Favorites')}>
                        Add Favorite
                    </div>
                    <div
                        className="option"
                        onClick={() => console.log('Mute')}>
                        Mute
                    </div>
                    <div
                        className="option"
                        onClick={() => console.log('Search')}>
                        Search
                    </div>
                    <div
                        className="option"
                        onClick={() => console.log('Delete Conversation')}>
                        Delete Conversation
                    </div>
                </div>
            </div>
        )
    };
};

export default ChatMenu;

ChatMenu.propTypes = {

}