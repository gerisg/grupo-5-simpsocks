import React from 'react';
import PropTypes from 'prop-types'

function SimpleCard(props) {
    return (
        <div className="col-md-4 mb-4">
            <div className={`card border-left-${props.metric.color} shadow h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-${props.metric.color} text-uppercase mb-1`}>
                                {props.metric.name}
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.metric.value}</div>
                        </div>
                        <div className="col-auto">
                            <i className={` ${props.metric.icon} fa-2x text-${props.metric.color}`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SimpleCard.propTypes = {
    metric: PropTypes.shape({
        color: PropTypes.oneOf(['primary', 'success', 'warning']).isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        icon: PropTypes.string.isRequired
    })
};

SimpleCard.defaultProps = {
    metric: {
        color: 'primary',
        name: 'test',
        value: 0,
        icon: ''
    }
};

export default SimpleCard;