import React from 'react';

function TopbarItemImage(props) {
    return (
        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="/" id={props.id}>
                <span className="mr-2 d-none d-lg-inline small text-primary">{props.value}</span>
                <img className="img-profile rounded-circle" src={props.image} width="60" alt="imagen de perfil" />
            </a>
        </li>
    );
}

export default TopbarItemImage;