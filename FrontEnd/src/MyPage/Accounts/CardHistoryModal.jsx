import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../actions';

function CardHistoryModal(props) {

    const dispatch = useDispatch();
    const transaction = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getTransactions(props.id));
    }, []);

    return (
        <div className="modalWindow">
            <div className="title">
                <h2>
                    Всі транзакції
                </h2>
                <a onClick={props.discard}>
                    <i className="fa fa-close"></i>
                </a>
            </div>
            <div className="description">
                <table>
                    <thead>
                        <tr>
                            <td>
                                ID
                            </td>
                            <td>
                                Номер картки
                            </td>
                            <td>
                                Дата
                            </td>
                            <td>
                                Початковий баланс
                            </td>
                            <td>
                                Кінцевий баланс
                            </td>
                            <td>
                                Сума переказу
                            </td>
                            <td>
                                Номер рахунку
                            </td>
                            <td>
                                Тип переказу
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transaction && transaction.transactions ?
                                transaction.transactions.transactions.sort((a, b) => {
                                    if (a.date < b.date)
                                        return 1;
                                    if (a.date > b.date)
                                        return -1;
                                    return 0;
                                }).map((item, key) =>
                                    <tr key={key}>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            {item.cardFromNumber}
                                        </td>
                                        <td>
                                            {item.date}
                                        </td>
                                        <td>
                                            {item.moneyOnBegining} грн
                                        </td>
                                        <td>
                                            {item.moneyOnEnd} грн
                                        </td>
                                        <td>
                                            {item.sum} грн
                                        </td>
                                        <td>
                                            {item.cardNumberTo}
                                        </td>
                                        <td>
                                            {item.transactionType}
                                        </td>
                                    </tr>
                                )
                                :
                                null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CardHistoryModal;