import React, { useState, useEffect } from 'react';
import UserInformation from './UserInformation/UserInformation';
import Accounts from './Accounts/Accounts';
import MyDocuments from './MyDocuments/MyDocuments';
import Credits from './Credits/Credits';

function MyPage(props) {

    const [categoryID, setCategoryID] = useState("");
    const [userID, setUserID] = useState(0);

    useEffect(() => {
        let saved = sessionStorage.getItem("MyPageCategory");

        if (!saved) {
            saved = "myInformation";
        }

        let element = document.querySelector(".mypage .categories .categoryItem." + saved);

        element.classList.add("active");

        setCategoryID(saved);

        let userDB = JSON.parse(localStorage.getItem("BankingUser"));
        if (!userDB) {
            userDB = JSON.parse(sessionStorage.getItem("BankingUser"));
        }

        setUserID(userDB.id);
    }, []);

    function setCategory(event) {
        if (!event) return;
        let elements = document.querySelectorAll(".mypage .categories .categoryItem");

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
        }

        event.target.parentElement.classList.add("active");

        setCategoryID(event.target.name);

        sessionStorage.setItem("MyPageCategory", event.target.name)
    }

    return (
        <div className="mypage">
            <div className="title">
                <h2>
                    Мої дані
                </h2>
            </div>
            <div className="categories">
                <div className="categoryItem myInformation">
                    <a className="btn linkButton" onClick={setCategory} name="myInformation">
                        Моя інформація
                    </a>
                </div>
                <div className="categoryItem myDocuments">
                    <a className="btn linkButton" onClick={setCategory} name="myDocuments">
                        Мої документи
                    </a>
                </div>
                <div className="categoryItem myAccount">
                    <a className="btn linkButton" onClick={setCategory} name="myAccount">
                        Мої рахунки
                    </a>
                </div>
                <div className="categoryItem myCredits">
                    <a className="btn linkButton" onClick={setCategory} name="myCredits">
                        Кредити
                    </a>
                </div>
            </div>
            <div className="items">
                {
                    categoryID === "myInformation" ?
                        <UserInformation />
                        :
                        categoryID === "myAccount" ?
                            <Accounts id={userID} />
                            :
                            categoryID === "myCredits" ?
                                <Credits />
                                :
                                categoryID === "myDocuments" ?
                                    <MyDocuments id={userID} />
                                    :
                                    null
                }
            </div>
        </div>
    );
}

export default MyPage;