import React, { Component } from 'react';
import { search } from '../utils';
import './HeaderChat.css';
import Search from './Search'

class HeaderChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            string: '',
            results: [],
            toggleOpen: false
        }
    }

    searchFunction(e) {
        this.setState({
            string: e.target.value
        })
        this.setState({
            results: search(e.target.value)
        })
    }

    setSearchOpen() {
        this.setState({
            toggleOpen: !this.state.toggleOpen,
        })
    }

    render() {
        return (
            <div className="headerchat">
                {!this.state.toggleOpen && <div className="user">
                    <div className="name">
                        {this.props.name}
                    </div>
                    <div className="status">
                        {this.props.status}
                    </div>
                </div>}
                <Search toggleOpen={this.state.toggleOpen} string={this.state.string} onChange={e => this.searchFunction(e)} openSearch={()=>this.setSearchOpen()}/>
            </div>
        )
    }
};

export default HeaderChat;