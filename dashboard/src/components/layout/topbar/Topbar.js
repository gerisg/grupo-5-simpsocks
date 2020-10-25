import React from 'react';
import TopbarItemIcon from './TopbarItemIcon';
import TopbarItemImage from './TopbarItemImage';
import './Topbar.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-light bg-warning topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
            <ul className="navbar-nav ml-auto">
                <TopbarItemIcon id='home' url='/' icon='fas fa-store-alt' />
                <TopbarItemIcon id='alertsDropdown' icon='fas fa-bell fa-fw' value='3' />
                <TopbarItemIcon id='messagesDropdown' icon='fas fa-envelope fa-fw' value='8' />
                <div className="topbar-divider d-none d-sm-block"></div>
                <TopbarItemImage id='userDropdown' image='images/dummy-avatar.png' value='Admin' />
            </ul>
        </nav>
    );
}

export default Navbar;