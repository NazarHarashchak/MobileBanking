import React from 'react';

function Banner(props) {
    return (
        <div className="banner">
            <div className="bannerImage">
                <img src={props.image} alt="image" />
            </div>
            <div className="description">
                <h2>
                    {props.title}
                </h2>
                <p>
                    {props.description}
                </p>
            </div>
        </div>
    );
}

export default Banner;