import React from 'react';

function NavItem(props) {
    return (
        <li className={`nav-item ${props.active ? 'active' : ''}`}>
            <a className="nav-link collapsed" href="/">
                <i className={props.icon}></i>
                <span>{props.name}</span>
            </a>
        </li>
    );
}

export default NavItem;