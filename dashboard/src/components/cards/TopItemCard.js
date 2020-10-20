import React from 'react';

function TopItemCard(props) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {props.item.name}
            <span className="badge badge-primary badge-pill">{props.item.count}</span>
        </li>
    );
}

export default TopItemCard;