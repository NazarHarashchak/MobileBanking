import React from 'react';

function ServiceItem (props) {
    return (
        <div className="item col-sm-4">
            <img src={props.image} alt="banner" />
            <h3>
                {props.title}
            </h3>
            <p>
                {props.description}
            </p>
        </div>
    );
}

export default ServiceItem;