import React, { Component } from 'react';
import Avatar from './Avatar';
import TabBar from './Tabar';
import './Workspace.css';


class Workspace extends Component {
    render() {
        return (
            <div className="workspace">
                <Avatar />
                <TabBar />
            </div>
        )
    }
};

export default Workspace;