import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../actions';
import CardHistoryModal from './CardHistoryModal';
import CardTransactionModal from './CardTransactionModal';

function AccountInformation(props) {

    const dispatch = useDispatch();

    const [showHistory, setShowHistory] = useState(false);
    const [showTransaction, setTransaction] = useState(false);

    function deleteClick() {
        dispatch(deleteCard(props.card.id));
    }

    return (
        <div className="accountInformation">
            {
                showTransaction ?
                    <CardTransactionModal id={props.card.id} card={props.card} discard={() => setTransaction(false)} transactionSuccess={() => { props.transactionSuccess(); setTransaction(false); }} />
                    :
                    null
            }
            {
                showHistory ?
                    <CardHistoryModal id={props.card.id} discard={() => setShowHistory(false)} />
                    :
                    null
            }
            <div className="information">
                <div className="active">
                    {props.card.isActive ? "Активна" : "Неактивна"}
                </div>
                <div className="cardType">
                    Тип картки: {
                        props.card.cardTypeID === 1 ?
                            "Студентська"
                            :
                            props.card.cardTypeID === 2 ?
                                "Зарплатна"
                                :
                                props.card.cardTypeID === 3 ?
                                    "Універсальна"
                                    :
                                    props.card.cardTypeID === 4 ?
                                        "Універсальна Голд"
                                        :
                                        null
                    }
                </div>
                <div className="date">
                    Дата створення: {props.card.dateCreated}
                </div>
                <div className="Money">
                    Грошей: {props.card.money}
                </div>
            </div>
            <div className="buttons">
                <input type="button" value="Історія" className="btn linkButton" onClick={() => setShowHistory(true)} />
                <input type="button" value="Зробити переказ" className="btn linkButton" onClick={() => setTransaction(true)} />
                <input type="button" value="Закрити рахунок" className="btn linkButton" onClick={() => deleteClick()} />
            </div>
        </div>
    );
}

export default AccountInformation;