import React from 'react';

function LastUserCard(props) {
    return (
        <div className="col-lg-4 col-md-6 mb-4">	
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                        <b>Nuevo usuario:</b> { props.lastItem.firstname } { props.lastItem.lastname }
                    </h6>
                </div>
                <div className="card-body">
                    <img src={ props.lastItem.image_url } className="img-fluid px-3 px-sm-4 mt-3 mb-4 card-img-top" alt="foto de perfil" />
                    <p className="card-text">Se registró con el correo electrónico <b>{ props.lastItem.email }</b> y teléfono <b>{ props.lastItem.phone }</b> a las <em>{ props.lastItem.created_at }</em></p>
                </div>
            </div>
        </div>
    );
}

export default LastUserCard;