import React, { useEffect, useState } from 'react';

function EditUser(props) {

    const [id, setId] = useState("");
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
    const [roleID, setRoleID] = useState(1);

    useEffect(() => {
        setId(props.user.id);
        setName(props.user.name);
        setSecondName(props.user.secondName);
        setAge(props.user.age);
        setEmail(props.user.email);
        setPhoneNumber(props.user.phoneNumber);
        setCountry(props.user.country);
        setCity(props.user.city);
        setStreet(props.user.street);
        setHouseNumber(props.user.houseNumber);
        setIsPrivate(props.user.isPrivateHouse);
        setAppartmentsNumber(props.user.appartmentsNumber);
        setRoleID(props.user.roleID);
    }, [])

    function sendValues() {
        let body = {
            id: id,
            name: name,
            secondName: secondName,
            age: parseInt(age),
            email: email,
            phoneNumber: phoneNumber,
            roleID: parseInt(roleID),
            country: country,
            city: city,
            street: street,
            houseNumber: houseNumber,
            isPrivateHouse: isPrivate,
            appartmentsNumber: parseInt(appartmentsNumber)
        }

        props.saveHandler(body);
    }

    return (
        <div className="editUserModal">
            <form>
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
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Номер телефону
                        </label>
                        <input type="text" className="form-control" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Оберіть роль
                        </label>
                        <select className="form-control" value={roleID} onChange={(event) => setRoleID(event.target.value)} >
                            <option value="1">Адміністратор</option>
                            <option value="2">Працівник</option>
                        </select>
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
                        <input type="button" id="registrateBtn" className="btn btn-primary linkButton" value="Скасувати" onClick={props.cancelHandler} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditUser;