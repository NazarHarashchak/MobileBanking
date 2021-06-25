import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './actions';

function Login(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const logined = useSelector(state => state.authentificateUser);
    const dispatch = useDispatch();

    function sendValues() {
        if (!login || login === "" || !password || password === "") {
            window.alert("You need to feel all fields.");
            return;
        }
        let body = {
            login: login,
            password: password
        }
        dispatch(loginUser(body));
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
                if (remember) {
                    localStorage.setItem("BankingUser", JSON.stringify(token));
                }
                else {
                    sessionStorage.setItem("BankingUser", JSON.stringify(token));
                }
                window.alert("Успіх!");
                window.location.href = "/";
            }
            else {
                window.alert(user.message);
            }
        }
    }, [logined]);

    return (
        <div className="loginPage">
            <form>
                <div className="form-group row">
                    <label>
                        Логін
                    </label>
                    <input type="text" className="form-control" onChange={(event) => setLogin(event.target.value)} reguired/>
                </div>
                <div className="form-group row">
                    <label>
                        Пароль
                    </label>
                    <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} reguired/>
                </div>
                <div className="form-group row">
                    <input className="form-check-input" type="checkbox" id="gridCheck1" name="checkbox" onChange={(event) => setRemember(event.target.checked)} reguired/>
                    <label className="form-check-label" htmlFor="gridCheck1">
                        Запам'ятати
                    </label>
                </div>
                <div className="form-group row">
                    <input type="button" onClick={sendValues} id="registrateBtn" className="btn btn-primary linkButton" value="Увійти"  />
                    <a href="/registration" className="btn btn-primary linkButton">
                        Зараєструватись
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Login;