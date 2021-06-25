import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions';

function AdditionalInformation(props) {

    const user = useSelector(state => state.workerUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(props.id));
    }, []);

    return (
        <div className="modalWindow">
            <div className="title">
                <h2>
                    Інформація про клієнта
                </h2>
                <a onClick={props.cancelHandler}>
                    <i className="fa fa-close"></i>
                </a>
            </div>
            {
                user && user.customerData ?
                    <div className="modalBody">
                        <div className="general section">
                            <div className="title">
                                <h4>
                                    Загальна інформація
                                </h4>
                            </div>
                            <div className="description">
                                <div className="image">
                                    <img src={user.customerData.image} alt="userlogo" />
                                </div>
                                <div className="text">
                                    <table>
                                        <tr>
                                            <td>
                                                Номер рахунку
                                            </td>
                                            <td>
                                                {user.customerData.id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Ім'я і прізвище
                                            </td>
                                            <td>
                                                {user.customerData.name + " " + user.customerData.secondName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Вік
                                            </td>
                                            <td>
                                                {user.customerData.age}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Емейл
                                            </td>
                                            <td>
                                                {user.customerData.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Номер телефону
                                            </td>
                                            <td>
                                                {user.customerData.phoneNumber}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Країна
                                            </td>
                                            <td>
                                                {user.customerData.country}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Місто
                                            </td>
                                            <td>
                                                {user.customerData.city}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Вулиця
                                            </td>
                                            <td>
                                                {user.customerData.street}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Номер будинку
                                            </td>
                                            <td>
                                                {user.customerData.houseNumber}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Квартира
                                            </td>
                                            <td>
                                                {user.customerData.appartmentsNumber}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="additional section">
                            <div className="title">
                                <h4>
                                    Документи
                                </h4>
                            </div>
                            <div className="description">
                                <div className="images">
                                    <div className="imageItem">
                                        <img src={user.customerData.passportImageFirstPage} alt="userlogo" />
                                        <div>
                                            <input className="form-check-input" type="checkbox" checked={user.customerData.isPassportImageFirstPageRight} />
                                            <label>
                                                Підтверджено
                                            </label>
                                        </div>
                                    </div>
                                    <div className="imageItem">
                                        <img src={user.customerData.passportImageSecondPage} alt="userlogo" />
                                        <div>
                                            <input className="form-check-input" type="checkbox" checked={user.customerData.isPassportImageSecondPageRight} />
                                            <label>
                                                Підтверджено
                                            </label>
                                        </div>
                                    </div>
                                    <div className="imageItem">
                                        <img src={user.customerData.passportImageAddressPage1} alt="userlogo" />
                                        <div>
                                            <input className="form-check-input" type="checkbox" checked={user.customerData.isPassportImageAddressPage1Right} />
                                            <label>
                                                Підтверджено
                                            </label>
                                        </div>
                                    </div>
                                    <div className="imageItem">
                                        <img src={user.customerData.passportImageAddressPage2} alt="userlogo" />
                                        <div>
                                            <input className="form-check-input" type="checkbox" checked={user.customerData.isPPassportImageAddressPage2Right} />
                                            <label>
                                                Підтверджено
                                            </label>
                                        </div>
                                    </div>
                                    <div className="imageItem">
                                        <img src={user.customerData.taxCodeImage} alt="userlogo" />
                                        <div>
                                            <input className="form-check-input" type="checkbox" checked={user.customerData.isTaxCodeImageRight} />
                                            <label>
                                                Підтверджено
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text">
                                    <table>
                                        <tr>
                                            <td>
                                                Серія то номер паспорту
                                            </td>
                                            <td>
                                                {user.customerData.passportCode + user.customerData.passportNumber}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Податковий номер
                                            </td>
                                            <td>
                                                {user.customerData.taxCode}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default AdditionalInformation;