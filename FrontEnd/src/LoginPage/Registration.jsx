import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registrateUser } from './actions';

function Registration(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondpassword] = useState('');

    const dispatch = useDispatch();
    const logined = useSelector(state => state.authentificateUser);

    function sendValues() {
        if (!email && email === "") {
            window.alert("Поле емейл не може бути порожнім");
            return;
        }
        if (!password && password === "") {
            window.alert("Поле паролю не може бути порожнім");
            return;
        }
        if (!secondPassword && secondPassword === "") {
            window.alert("Паролі повинні збігатись");
            return;
        }
        let body = {
            login: email,
            password: password
        };
        dispatch(registrateUser(body));
    }

    useEffect(() => {
        if (logined.result && logined.result !== "") {
            let user = logined.result;
            if (user.success) {
                let token = {
                    id: user.id,
                    email: user.login,
                    roleID: user.roleID
                }
                sessionStorage.setItem("BankingUser", JSON.stringify(token));
                
                window.alert("Успіх!");
                window.location.href = "/";
            }
            else {
                window.alert(user.message);
            }
        }
    }, [logined]);

    return (
        <div className="registrationPage">
            <form>
                <div className="form-group row">
                    <label>
                        Емейл
                    </label>
                    <input type="text" className="form-control" onChange={(event) => setEmail(event.target.value)} reguired />
                </div>
                <div className="form-group row">
                    <label>
                        Пароль
                    </label>
                    <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} reguired />
                </div>
                <div className="form-group row">
                    <label>
                        Повторіть пароль
                    </label>
                    <input type="password" className="form-control" onChange={(event) => setSecondpassword(event.target.value)} reguired />
                </div>
                <div className="form-group row">
                    <input type="button" onClick={sendValues} id="registrateBtn" className="btn btn-primary linkButton" value="Зареєструватись"  />
                </div>
            </form>
        </div>
    );
}

export default Registration;