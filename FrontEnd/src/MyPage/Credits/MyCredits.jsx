import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCredits } from '../actions';

export default function MyCredits(props) {

    const dispatch = useDispatch();
    const credits = useSelector(state => state.user);

    useEffect(() => {
        let userDB = JSON.parse(localStorage.getItem("BankingUser"));
        if (!userDB) {
            userDB = JSON.parse(sessionStorage.getItem("BankingUser"));
        }
        dispatch(getCredits(userDB.id));
    }, []);

    useEffect(() => {
        console.log(credits);
    }, [credits]);

    return (
        <div className="myCredits">
            <table>
                <thead>
                    <tr>
                        <td>
                            Номер рахунку
                        </td>
                        <td>
                            Тип кредиту
                        </td>
                        <td>
                            Дата створення
                        </td>
                        <td>
                            Дата завершення
                        </td>
                        <td>
                            Активний
                        </td>
                        <td>
                            Залишок
                        </td>
                        <td>
                            Мінімальний внесок
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        credits && credits.credits && credits.credits.credits ?
                            credits.credits.credits.map((item, key) =>
                                <tr key={key}>
                                    <td>
                                        {item.accountNumber}
                                    </td>
                                    <td>
                                        {item.creditType}
                                    </td>
                                    <td>
                                        {item.dateCreated}
                                    </td>
                                    <td>
                                        {item.dateEnd}
                                    </td>
                                    <td>
                                        {item.isActive ? "Так" : "Ні"}
                                    </td>
                                    <td>
                                        {item.moneyLeft}
                                    </td>
                                    <td>
                                        {item.minDraft}
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