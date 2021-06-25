import React, { useEffect, useState } from 'react';

function scroll() {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector("header").classList.add("stick");
    }
    else {
        document.querySelector("header").classList.remove("stick");
    }
}

function Header() {
    const [user, setUser] = useState("");

    useEffect(() => {
        window.onscroll = scroll;
    }, []);

    useEffect(() => {
        let href = document.location.href;
        let elements = document.querySelectorAll("header .menu li a");
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].href === href) {
                elements[i].parentElement.classList.add("active");
            }
            else {
                elements[i].parentElement.classList.remove("active");
            }
        }
    });

    useEffect(() => {
        let userDB = localStorage.getItem("BankingUser");
        if (!userDB) {
            userDB = sessionStorage.getItem("BankingUser");
        }
        if (!user && userDB)
            setUser(JSON.parse(userDB));
    });

    function endSession() {
        localStorage.removeItem("BankingUser");
        sessionStorage.removeItem("BankingUser");

        sessionStorage.removeItem("MyPageCategory");

        window.alert("Успіх");
        window.location.href = "/";
    }

    return (
        <header>
            <div className="wrapper">
                <div className="logoZone">
                    <h1>
                        <a href="/">
                            Banking
                            <span className="redDot">.</span>
                        </a>
                    </h1>
                </div>
                <div className="menu">
                    <ul className="menu">
                        <li>
                            <a href="/">
                                Головна
                            </a>
                        </li>

                        {
                            user && user !== "" && user.roleID === 3 ?
                                <li>
                                    <a href="/mypage">
                                        Мої рахунки
                                    </a>
                                </li>
                                :
                                null
                        }


                        {
                            user && user !== "" && user.roleID === 2 ?
                                <li>
                                    <a href="/allclients">
                                        Переглянути клієнтів
                                    </a>
                                </li>
                                :
                                null
                        }
                        {
                            user && user !== "" && user.roleID === 2 ?
                                <li>
                                    <a href="/allaccounts">
                                        Перевірити рахунки
                                    </a>
                                </li>
                                :
                                null
                        }

                        {
                            user && user !== "" && user.roleID === 1 ?
                                <li>
                                    <a href="/adduser">
                                        Додати користувача
                                    </a>
                                </li>
                                :
                                null
                        }
                        {
                            user && user !== "" && user.roleID === 1 ?
                                <li>
                                    <a href="/users">
                                        Всі користувачі
                                    </a>
                                </li>
                                :
                                null
                        }
                        <li>
                            <a href="/contact">
                                Контакти
                            </a>
                        </li>
                        {
                            !user && user === "" ?
                                <li>
                                    <a href="/login">
                                        Вхід
                                    </a>
                                </li>
                                :
                                <li>
                                    <a onClick={endSession} href="#">
                                        Вихід
                                    </a>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;