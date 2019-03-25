import React, { Component } from 'react';
import Avatar from './components/Avatar';
import TabBar from './components/TabBar';

class Workspace extends Component {
    render() {
        return (
            <div className="workspace">
                <Avatar />
                <TabVerticale />
            </div>
        )
    }
};

export default Workspace;
