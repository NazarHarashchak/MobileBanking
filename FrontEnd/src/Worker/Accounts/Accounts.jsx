import React, { useState, useEffect } from 'react';
import AllAccounts from './AllAccounts';
import Feedbacks from './Feedbacks';
import FindTransaction from './FindTransaction';

function Accounts(props) {

    const [categoryID, setCategoryID] = useState("");

    useEffect(() => {
        let saved = sessionStorage.getItem("MyPageCategory");

        if (!saved) {
            saved = "myInformation";
        }

        let element = document.querySelector(".accountsPage .categories .categoryItem." + saved);

        element.classList.add("active");

        setCategoryID(saved);
    }, []);

    function setCategory(event) {
        if (!event) return;

        let elements = document.querySelectorAll(".accountsPage .categories .categoryItem");

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
        }

        event.target.parentElement.classList.add("active");

        setCategoryID(event.target.name);

        sessionStorage.setItem("MyPageCategory", event.target.name);
    }

    return (
        <div className="accountsPage">
            <div className="categories">
                <div className="categoryItem myInformation">
                    <a className="btn linkButton" onClick={setCategory} name="myInformation">
                        Всі рахунки
                    </a>
                </div>
                <div className="categoryItem myAccount">
                    <a className="btn linkButton" onClick={setCategory} name="myAccount">
                        Рахунки на підтвердження
                    </a>
                </div>
                <div className="categoryItem myCredit">
                    <a className="btn linkButton" onClick={setCategory} name="myCredit">
                        Кредити
                    </a>
                </div>
                <div className="categoryItem feedbacks">
                    <a className="btn linkButton" onClick={setCategory} name="feedbacks">
                        Відгуки
                    </a>
                </div>
                <div className="categoryItem transactions">
                    <a className="btn linkButton" onClick={setCategory} name="transactions">
                        Знайти транзакцію
                    </a>
                </div>
            </div>
            <div className="items">
                {
                    categoryID === "myInformation" ?
                        <AllAccounts active={true} />
                        :
                        categoryID === "myAccount" ?
                            <AllAccounts active={false} />
                            :
                            categoryID === "myCredit" ?
                                ""
                                :
                                categoryID === "feedbacks" ?
                                    <Feedbacks />
                                    :
                                    categoryID === "transactions" ?
                                        <FindTransaction />
                                        :
                                        null
                }
            </div>
        </div>
    );
}

export default Accounts;