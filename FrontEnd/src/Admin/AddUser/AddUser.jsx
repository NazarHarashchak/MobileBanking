import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendUserData } from '../actions';

function AddUser(props) {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [age, setAge] = useState(18);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [isPrivate, setIsPrivate] = useState("");
    const [appartmentsNumber, setAppartmentsNumber] = useState("0");
    const [roleID, setRoleID] = useState(1);

    function sendValues() {
        if (!name || name === "" ||
            !secondName || secondName === "" ||
            !email || email === "" ||
            !password || password === "" ||
            !phoneNumber || phoneNumber === "" ||
            !country || country === "" ||
            !city || city === "" ||
            !street || street === "" ||
            !houseNumber || houseNumber === "") {
            window.alert("Заповніть всі поля");
            return;
        }
        let body = {
            name: name,
            secondName: secondName,
            age: parseInt(age),
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            roleID: parseInt(roleID),
            country: country,
            city: city,
            street: street,
            houseNumber: houseNumber,
            isPrivateHouse: isPrivate,
            appartmentsNumber: parseInt(appartmentsNumber)
        }
        
        dispatch(sendUserData(body)).then((item) => {
            if (item.success) {
                window.alert("Дані збережено!");
                window.location.href = "/";
            }
            else {
                window.alert(item.message)
            }
        });
    }

    return (
        <div className="adduserPage">
            <form>
                <div className="form-group row">
                    <div className="col-sm-4">
                        <label>
                            І'мя
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setName(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-4">
                        <label>
                            Прізвище
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setSecondName(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-4">
                        <label>
                            Вік
                        </label>
                        <input type="number" min="18" className="form-control" onChange={(event) => setAge(event.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Емейл
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setEmail(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Пароль
                        </label>
                        <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} reguired />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Номер телефону
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setPhoneNumber(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Оберіть роль
                        </label>
                        <select className="form-control" onChange={(event) => setRoleID(event.target.value)} reguired >
                            <option value="1" selected>Адміністратор</option>
                            <option value="2">Працівник</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Країна
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setCountry(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Місто
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setCity(event.target.value)} reguired />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Вулиця
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setStreet(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-2">
                        <label>
                            Номер будинку
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setHouseNumber(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-2 checkboxContainer">
                        <input className="form-check-input" type="checkbox" id="gridCheck1" name="checkbox" onChange={(event) => setIsPrivate(event.target.checked)} />
                        <label>
                            Приватний будинок
                        </label>
                    </div>
                    <div className="col-sm-2">
                        <label>
                            Квартира
                        </label>
                        <input type="number" min="0" className="form-control" onChange={(event) => setAppartmentsNumber(event.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <input type="button" id="registrateBtn" className="btn btn-primary linkButton" value="Відправити" onClick={sendValues} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddUser;