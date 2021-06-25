import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardItem from './CardItem';
import AccountInformation from './AccountInformation';
import { getCards } from '../actions';

function MyCards(props) {

    const dispatch = useDispatch();
    const cards = useSelector(state => state.user);

    useEffect(() => {

        dispatch(getCards(props.id));
    }, []);

    function transactionSuccess() {
        dispatch(getCards(props.id));
    }

    return (
        <div className="myCards">
            {
                cards && cards.cards ?
                    cards.cards.cards.map((item, key) =>
                        <div className="accountInfo" key={key}>
                            <CardItem card={item} />
                            <AccountInformation card={item} transactionSuccess={() => transactionSuccess()}/>
                        </div>
                    )
                    :
                    null
            }
        </div>
    );
}

export default MyCards;