import React from 'react';
import logo from '../../SiteFiles/MasterCard_Logo.png';

function CardItem(props) {
    return (
        <div className="cardItem">
            <div className="cardNumber">
                {props.card.cardNumber}
            </div>
            <div className="secondZone">
                <div className="date">
                    End date {props.card.endMonth} / {props.card.endYear}
                </div>
                <div className="cvv">
                    CVV {props.card.cvv}
                </div>
            </div>
            <div className="logo">
                <div className="company">
                    <h4>Banking
                        <span className="red">.</span>
                    </h4>
                </div>
                <div className="masterCard">
                    <img src={logo} alt="mastercard" />
                </div>
            </div>
        </div>
    );
}

export default CardItem