import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCards, getAllInactiveCards, activateCard, blockCard } from '../actions';
import AdditionalInformation from '../Clients/AdditionalInformation';

function AllAccounts(props) {

    const dispatch = useDispatch();
    const cards = useSelector(state => state.workerUsers);
    const [allCards, setCards] = useState("");

    const [showUser, setShowUser] = useState(false);
    const [showUserID, setShowUserID] = useState("");

    useEffect(() => {
        if (props.active) {
            dispatch(getAllCards());
        }
        else {
            dispatch(getAllInactiveCards());
        }

    }, [props.active]);

    useEffect(() => {
        if (cards && cards.cards && cards.cards.cards) {
            setCards(cards.cards.cards);
        }
    }, [cards]);

    function blockActivateCard(id, choise) {
        let body = {
            id: id
        }
        if (choise) {
            dispatch(blockCard(body));
        }
        else {
            dispatch(activateCard(body));
        }
    }

    return (
        <div className="allAccounts">
            {
                showUser ?
                    <AdditionalInformation id={showUserID} cancelHandler={() => { setShowUser(false); setShowUserID(""); }} />
                    :
                    null
            }
            <table>
                <thead>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            Ім'я власника
                        </td>
                        <td>
                            Тип картки
                        </td>
                        <td>
                            Дата створенння
                        </td>
                        <td>
                            Номер картки
                        </td>
                        <td>
                            Активна
                        </td>
                        {
                            props.active ?
                                <td>
                                    Блокувати
                                </td>
                                :
                                <td>
                                    Активувати
                                </td>
                        }
                        <td>
                            Деталі
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCards.length > 0 ?
                            allCards.map((item, key) =>
                                <tr key={key}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.userFullName}
                                    </td>
                                    <td>
                                        {item.cardTypeID === 1 ?
                                            "Студентська"
                                            :
                                            item.cardTypeID === 2 ?
                                                "Зарплатна"
                                                :
                                                item.cardTypeID === 3 ?
                                                    "Універсальна"
                                                    :
                                                    item.cardTypeID === 4 ?
                                                        "Універсальна Голд"
                                                        :
                                                        null}
                                    </td>
                                    <td>
                                        {item.dateCreated}
                                    </td>
                                    <td>
                                        {item.cardNumber}
                                    </td>
                                    <td>
                                        {item.isActive ? "Так" : "Ні"}
                                    </td>
                                    {
                                        props.active ?
                                            <td>
                                                <a onClick={() => blockActivateCard(item.id, true)}>
                                                    Блокувати
                                                </a>
                                            </td>
                                            :
                                            <td>
                                                <a onClick={() => blockActivateCard(item.id, false)}>
                                                    Активувати
                                                </a>
                                            </td>
                                    }
                                    <td>
                                        <a onClick={() => { setShowUserID(item.userID); setShowUser(true); }}>
                                            Деталі
                                        </a>
                                    </td>
                                </tr>
                            )
                            :
                            null
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AllAccounts;