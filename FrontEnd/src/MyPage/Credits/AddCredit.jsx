import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCredit } from '../actions';

export default function AddCredit(props) {

    const [showCard, setShowCard] = useState(false);
    const [showSaveButton, setShowSave] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [type, setType] = useState(1);
    const [monthes, setMonthes] = useState(6);
    const [sum, setSum] = useState(0);
    const [fullSum, setFullSum] = useState(0);
    const [monthPay, setMonthPay] = useState(0);
    const [cardNumber, setCardNumber] = useState("");

    const dispatch = useDispatch();

    function discard() {
        setShowCard(false);
        setShowAdd(false);
        setShowSave(false);
        setType(1);
        setMonthes(6);
        setSum(0);
        setFullSum(0);
        setMonthPay(0);
        setCardNumber("");
    }

    function proceed() {
        if (!type || type === ""
            || !monthes || monthes === ""
            || !sum || sum === "") {
            window.alert("Потрібно заповнити всі поля!");
            return;
        }

        switch (type) {
            case 1:
                if (sum > 1500000) {
                    window.alert("Сума перевищує максимально дозволену!");
                    return;
                }
                break;
            case 2:
                if (sum > 1000000) {
                    window.alert("Сума перевищує максимально дозволену!");
                    return;
                }
                break;
            case 3:
                if (sum > 50000) {
                    window.alert("Сума перевищує максимально дозволену!");
                    return;
                }
                break;
            case 4:
                if (sum > 120000) {
                    window.alert("Сума перевищує максимально дозволену!");
                    return;
                }
                break;
            default: return;
        }

        setShowSave(true);

        let lastSum = 0;

        switch (type) {
            case 1:
                lastSum = sum * Math.pow((1 + 8 / 100), monthes / 12);
                setFullSum(lastSum);
                setMonthPay(lastSum / monthes);
                break;
            case 2:
                lastSum = sum * Math.pow((1 + 12 / 100), monthes / 12);
                setFullSum(lastSum);
                setMonthPay(lastSum / monthes);
                break;
            case 3:
                lastSum = sum * Math.pow((1 + 25 / 100), monthes / 12);
                setFullSum(lastSum);
                setMonthPay(lastSum / monthes);
                break;
            case 4:
                lastSum = sum * Math.pow((1 + 22 / 100), monthes / 12);
                setFullSum(lastSum);
                setMonthPay(lastSum / monthes);
                setShowCard(true)
                break;
            default: return;
        }
    }

    function save() {
        let userDB = JSON.parse(localStorage.getItem("BankingUser"));
        if (!userDB) {
            userDB = JSON.parse(sessionStorage.getItem("BankingUser"));
        }
        let body = {
            creditTypeID: type,
            userID: userDB.id,
            monthCount: monthes,
            moneyLeft: fullSum,
            minDraft: monthPay,
            cardNumber: cardNumber,
            creditSum: sum
        }

        dispatch(addCredit(body)).then((result) => {
            if (result.success) {
                window.alert("Успішно створено!");
                discard();
            }
            else {
                window.alert(result.message);
            }
        });
    }

    return (
        <div className="addCredit">
            <div className="addButton">
                <button className="btn linkButton" onClick={() => setShowAdd(true)}>
                    <i className="fa fa-plus"></i>
                    <span> Додати</span>
                </button>
            </div>
            {
                showAdd ?
                    <div className="addBody">
                        <div className="form-group row">
                            <div className="col-sm-4">
                                <label>
                                    Тип кредиту
                                </label>
                                <select className="form-control"
                                    onChange={(event) => { setType(parseInt(event.target.value)); setShowSave(false); setShowCard(false); }}>
                                    <option value="1">На житло</option>
                                    <option value="2">На машину</option>
                                    <option value="3">Готівковий</option>
                                    <option value="4">На картку</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label>
                                    Строк в місяцях
                                </label>
                                <select className="form-control"
                                    onChange={(event) => { setMonthes(parseInt(event.target.value)); setShowSave(false); setShowCard(false); }}>
                                    <option value="6">6 місяців</option>
                                    <option value="12">12 місяців</option>
                                    <option value="18">18 місяців</option>
                                    <option value="24">24 місяців</option>
                                    <option value="48">48 місяців</option>
                                    <option value="96">96 місяців</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label>
                                    Сума (грн)
                                </label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { setSum(parseFloat(event.target.value)); setShowSave(false); setShowCard(false); }} />
                            </div>
                        </div>
                        {
                            !showSaveButton ?
                                <div className="form-group buttons row">
                                    <div className="col-sm-12">
                                        <input type="button" value="Продовжити" className="btn linkButton" onClick={() => proceed()} />
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            showCard ?
                                <div className="form-group buttons row">
                                    <div className="col-sm-12">
                                        <label>
                                            Введіть номер картки
                                        </label>
                                        <input type="text" className="form-control"
                                            onChange={(event) => { setCardNumber(event.target.value) }} />
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            showSaveButton ?
                                <div className="form-group buttons row">
                                    <div className="col-sm-4">
                                        <label>
                                            Загальна сума кредиту
                                        </label>
                                        <input type="text" defaultValue={fullSum} className="form-control" disabled />
                                    </div>
                                    <div className="col-sm-4">
                                        <label>
                                            Щомісячний платіж
                                        </label>
                                        <input type="text" defaultValue={monthPay} className="form-control" disabled />
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="button" value="Зберегти" className="btn linkButton" onClick={() => save()} />
                                    </div>
                                </div>
                                :
                                null
                        }
                        <div className="form-group buttons row">
                            <div className="col-sm-12">
                                <input type="button" value="Скасувати" className="btn linkButton" onClick={() => discard()} />
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
}