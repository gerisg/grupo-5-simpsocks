import React from 'react';
import TopItemCard from './TopItemCard';

function TopCard(props) {
    return (
        <div className="col-lg-4 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Top #5 de { props.name }</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <ul className="list-group">
                                { props.items.map((item, i) => <TopItemCard key={`${i}-item`} item={item} />) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopCard;