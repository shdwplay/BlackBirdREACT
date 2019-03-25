import React, { Component } from 'react';
import Avatar from './Avatar';
import './Workspace.css';


class Workspace extends Component {
    render() {
        return (
            <div className="workspace">
                <Avatar />
            </div>
        )
    }
};

export default Workspace;