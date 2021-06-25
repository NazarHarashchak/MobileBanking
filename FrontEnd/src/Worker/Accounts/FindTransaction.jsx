import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findTransaction } from '../actions';

export default function FindTransaction() {

    const [number, setNumber] = useState("");
    const [transaction, setTransaction] = useState("");
    const [showResults, setShowResults] = useState(false);

    const dispatch = useDispatch();
    const myState = useSelector(state => state.workerUsers);

    useEffect(() => {
        if (myState && myState.transaction) {
            if (myState.transaction.success) {
                setShowResults(true);
                setTransaction(myState.transaction);
            }
            else {
                setShowResults(true);
                setTransaction("");
            }
        }
    }, [myState]);

    function find() {
        if (!number || number === "") {
            window.alert("Введіть значення!");
            return;
        }

        dispatch(findTransaction(number));
    }

    return (
        <div className="allAccounts">
            <div className="title form-group">
                <h4>
                    Введіть номер транзакції
                </h4>
                <input type="text" className="form-control" onChange={(event) => setNumber(event.target.value)} />
                <input type="button" className="btn linkButton" value="Знайти" onClick={() => find()} />
            </div>
            {
                showResults ?
                    <div className="result">
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
                                    transaction ?
                                        <tr>
                                            <td>
                                                {transaction.id}
                                            </td>
                                            <td>
                                                {transaction.cardFromNumber}
                                            </td>
                                            <td>
                                                {transaction.date}
                                            </td>
                                            <td>
                                                {transaction.moneyOnBegining} грн
                                            </td>
                                            <td>
                                                {transaction.moneyOnEnd} грн
                                            </td>
                                            <td>
                                                {transaction.sum} грн
                                            </td>
                                            <td>
                                                {transaction.cardNumberTo}
                                            </td>
                                            <td>
                                                {transaction.transactionType}
                                            </td>
                                        </tr>
                                        :
                                        null
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="noResults"></div>
            }
        </div>
    );
}