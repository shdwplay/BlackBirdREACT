import React, { Component } from 'react';
import { search } from '../utils';
import './HeaderChat.css';

const lorenzo = {
    name: 'Lorenzo',
    status: 'online',
};

class HeaderChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            string: '',
            results: [],
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

    render() {
        return (
            <div className="headerchat">
                <div className="user">
                    <div className="name">
                        {lorenzo.name}
                    </div>
                    <div className="status">
                        {lorenzo.status}
                    </div>
                </div>
                <div className="search-button">
                    <img src="search.svg" alt="search" />
                    <input
                        value={this.state.string}
                        type="search"
                        onChange={e => this.searchFunction(e)}
                    />
                </div>
                <div>
                    <ul>
                        {this.state.results.map((val, idx) =>
                            <li onClick={() => this.state.onClick(val)} key={idx}>{val}</li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
};

export default HeaderChat;