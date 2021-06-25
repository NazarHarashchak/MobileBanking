import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, saveUser } from '../actions';
import defaultLogo from '../../SiteFiles/defaultUserpng.png';

function UserInformation(props) {

    const [id, setId] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [age, setAge] = useState(18);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [isPrivate, setIsPrivate] = useState("");
    const [appartmentsNumber, setAppartmentsNumber] = useState("0");

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        let userDB = JSON.parse(localStorage.getItem("BankingUser"));
        if (!userDB) {
            userDB = JSON.parse(sessionStorage.getItem("BankingUser"));
        }
        if (userDB) {
            dispatch(getUser(userDB.id));
        }
    }, []);

    useEffect(() => {
        if (user && user.result) {
            setImage(user.result.image);
            setId(user.result.id);
            setName(user.result.name);
            setSecondName(user.result.secondName);
            setAge(user.result.age);
            setEmail(user.result.email);
            setPhoneNumber(user.result.phoneNumber);
            setCountry(user.result.country);
            setCity(user.result.city);
            setStreet(user.result.street);
            setHouseNumber(user.result.houseNumber);
            setIsPrivate(user.result.isPrivateHouse);
            setAppartmentsNumber(user.result.appartmentsNumber);
        }
    }, [user]);

    function sendValues() {
        let body = {
            id: id,
            name: name,
            secondName: secondName,
            age: parseInt(age),
            email: email,
            phoneNumber: phoneNumber,
            country: country,
            city: city,
            street: street,
            houseNumber: houseNumber,
            isPrivateHouse: isPrivate,
            appartmentsNumber: parseInt(appartmentsNumber),
            image: image
        }

        dispatch(saveUser(body)).then((result) => {
            if (result) {
                if (result.success) {
                    window.alert("Інформацію збережено!");
                }
                else {
                    window.alert(result.message);
                }
            }
        });
    }

    function resetUserInfo() {
        setId(user.result.id);
        setImage(user.result.image);
        setName(user.result.name);
        setSecondName(user.result.secondName);
        setAge(user.result.age);
        setEmail(user.result.email);
        setPhoneNumber(user.result.phoneNumber);
        setCountry(user.result.country);
        setCity(user.result.city);
        setStreet(user.result.street);
        setHouseNumber(user.result.houseNumber);
        setIsPrivate(user.result.isPrivateHouse);
        setAppartmentsNumber(user.result.appartmentsNumber);
    }

    function imageChanged(event) {
        let file = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = function () {
            var result = reader.result;
            setImage(result);
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className="userPage">
            <form>
                <div className="form-group row">
                    <div className="image">
                        <img src={image ? image : defaultLogo} alt="user-image" />
                    </div>
                    <input onChange={(event) => imageChanged(event)} type="file" accept=".png, .jpg, .jpeg" name="image" placeholder="Завантажити нове фото" />
                </div>
                <div className="form-group row">
                    <div className="col-sm-4">
                        <label>
                            І'мя
                        </label>
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="col-sm-4">
                        <label>
                            Прізвище
                        </label>
                        <input type="text" className="form-control" value={secondName} onChange={(event) => setSecondName(event.target.value)} />
                    </div>
                    <div className="col-sm-4">
                        <label>
                            Вік
                        </label>
                        <input type="number" min="18" className="form-control" value={age} onChange={(event) => setAge(event.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Емейл
                        </label>
                        <input type="text" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Номер телефону
                        </label>
                        <input type="text" className="form-control" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Країна
                        </label>
                        <input type="text" className="form-control" value={country} onChange={(event) => setCountry(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Місто
                        </label>
                        <input type="text" className="form-control" value={city} onChange={(event) => setCity(event.target.value)} reguired />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Вулиця
                        </label>
                        <input type="text" className="form-control" value={street} onChange={(event) => setStreet(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-2">
                        <label>
                            Номер будинку
                        </label>
                        <input type="text" className="form-control" value={houseNumber} onChange={(event) => setHouseNumber(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-2 checkboxContainer">
                        <input className="form-check-input" checked={isPrivate} type="checkbox" id="gridCheck1" name="checkbox" onChange={(event) => setIsPrivate(event.target.checked)} />
                        <label>
                            Приватний будинок
                        </label>
                    </div>
                    <div className="col-sm-2">
                        <label>
                            Квартира
                        </label>
                        <input type="number" min="0" className="form-control" value={appartmentsNumber} onChange={(event) => setAppartmentsNumber(event.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <input type="button" id="registrateBtn" className="btn btn-primary linkButton" value="Відправити" onClick={sendValues} />
                        <input type="button" id="registrateBtn" className="btn btn-primary linkButton" value="Скасувати" onClick={() => resetUserInfo()} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserInformation;