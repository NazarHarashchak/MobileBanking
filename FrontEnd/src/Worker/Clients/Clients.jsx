import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions';
import AdditionalInformation from './AdditionalInformation';

function Clients(props) {

    const usersList = useSelector(state => state.workerUsers);
    const dispatch = useDispatch();

    const [showUser, setShowUser] = useState(false);
    const [showUserID, setShowUserID] = useState("");

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <div className="allClients">
            {
                showUser ?
                    <AdditionalInformation id={showUserID} cancelHandler={() => {setShowUser(false); setShowUserID("");}}/>
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
                            Ім'я
                        </td>
                        <td>
                            Емейл
                        </td>
                        <td>
                            Вік
                        </td>
                        <td>
                            Країна
                        </td>
                        <td>
                            Місто
                        </td>
                        <td>
                            Вулиця
                        </td>
                        <td>
                            Будинок
                        </td>
                        <td>
                            Приватний
                        </td>
                        <td>
                            Квартира
                        </td>
                        <td>
                            Активний
                        </td>
                        <td>
                            Додатково
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersList && usersList.result && usersList.result.users && usersList.result.users.length > 0 ?
                            usersList.result.users.sort((a, b) => {
                                if (a.roleID < b.roleID)
                                    return -1;
                                if (a.roleID > b.roleID)
                                    return 1;
                                return 0;
                            }).map((item, key) =>
                                <tr className={"row-" + key} key={"item" + key}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.name + " " + item.secondName}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.age}
                                    </td>
                                    <td>
                                        {item.country}
                                    </td>
                                    <td>
                                        {item.city}
                                    </td>
                                    <td>
                                        {item.street}
                                    </td>
                                    <td>
                                        {item.houseNumber}
                                    </td>
                                    <td>
                                        {item.isPrivateHouse ? "Так" : "Ні"}
                                    </td>
                                    <td>
                                        {item.appartmentsNumber}
                                    </td>
                                    <td>
                                        {item.isActive ? "Так" : "Ні"}
                                    </td>
                                    < td >
                                        <a onClick={() => {
                                            setShowUser(true);
                                            setShowUserID(item.id);
                                        }}>
                                            Переглянути
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

export default Clients;