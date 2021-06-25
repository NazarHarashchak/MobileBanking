import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, blockUser, editUserData } from '../actions';
import EditUser from './EditUser';

function Users(props) {

    const [showEdit, setShowEdit] = useState(false);
    const [editUser, setEdituser] = useState("");

    const usersList = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        if (usersList && usersList.result) {
            if (usersList.result.success) {
                console.log("users", usersList.result.users)
            }
            else {
                console.log(usersList.result.message);
            }
        }
    }, [usersList]);

    function blockThisUser(userID) {
        dispatch(blockUser(userID));
    }

    function saveUser(user) {
        dispatch(editUserData(user));
        setShowEdit(false);
        setEdituser("");
    }

    function cancelEdit() {
        setShowEdit(false);
        setEdituser("");
    }

    return (
        <div className="usersPage">
            {
                showEdit ?
                    <EditUser user={editUser} saveHandler={saveUser} cancelHandler={cancelEdit} />
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
                            Роль
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
                            Блокувати
                        </td>
                        <td>
                            Змінити
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
                                        {
                                            item.roleID === 1 ?
                                                "Адміністратор"
                                                :
                                                item.roleID === 2 ?
                                                    "Працівник" :
                                                    item.roleID === 3 ?
                                                        "Клієнт"
                                                        :
                                                        ""
                                        }
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
                                    <td>
                                        <a onClick={() => blockThisUser(item.id)}>
                                            {
                                                item.isActive ?
                                                    "Блокувати"
                                                    :
                                                    "Розблокувати"
                                            }
                                        </a>
                                    </td>
                                    {
                                        item.roleID !== 3 ?
                                            < td >
                                                <a onClick={() => {
                                                    setShowEdit(true);
                                                    setEdituser(item);
                                                }}>
                                                    Змінити
                                                </a>
                                            </td>
                                            :
                                            <td></td>
                                    }
                                </tr>
                            )
                            :
                            null
                    }
                </tbody>
            </table>
        </div >
    );
}

export default Users;