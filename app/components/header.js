import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
    render() {
        return(
            <div className="components-header row">
                <img className="-col-auto" src="/static/images/logo.png" width="40" alt=""/>
                <h1 className="caption">React Music Player</h1>
            </div>
        )
    }
}

export default Header;
