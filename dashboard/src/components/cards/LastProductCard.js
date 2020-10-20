import React from 'react';

function LastProductCard(props) {

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        <b>Último producto:</b> {props.lastItem.name}
                    </h6>
                </div>
                <div className="card-body">
                    <img src={props.lastItem.images ? props.lastItem.images[0].url : ''} className="rounded-circle img-fluid px-3 px-sm-4 mt-3 mb-4 card-img-top" alt="imagen de producto" />
                    <p className="card-text">{props.lastItem.description}</p>
                </div>
                {props.lastItem.skus ?
                    <div className="card-footer">
                        {props.lastItem.skus.map((sku, i) =>
                            <div className="sku-props" key={`sku-${i}`}>
                                <div>{sku.properties.map((property, j) => <span key={`sku-prop-${i}-${j}`} className="sku-prop">{property.name}</span>)}</div>
                                {sku.stock > 10 ? <span className="badge badge-pill badge-success">{sku.stock}</span> : <span className="badge badge-pill badge-danger">{sku.stock}</span>}
                            </div>
                        )}
                    </div>
                    : ''
                }
                <div className="card-footer border-info">
                    <b>Categorías: </b>{props.lastItem.categories ? props.lastItem.categories.map((cat, i) => <span key={`${i}-prod-cat`} className="badge badge-info">{cat.name}</span>) : ''}
                </div>
            </div>
        </div>
    );
}

export default LastProductCard;