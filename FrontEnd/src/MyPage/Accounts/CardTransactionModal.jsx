import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../actions';

function CardTransactionModal(props) {

    const [sum, setSum] = useState("");
    const [type, setType] = useState(2);
    const [number, setNumber] = useState(0);

    const dispatch = useDispatch();

    function proceed() {
        if (!sum || sum === ""
            || !type || type === ""
            || !number || number === "") {
            window.alert("Заповність всі поля!");
            return;
        }

        if (sum > props.card.money) {
            window.alert("Недостатньо грошей на рахунку!");
            return;
        }

        let body = {
            transactionTypeID: type,
            cardFromID: props.card.id,
            cardFromNumber: props.card.cardNumber,
            sum: sum,
            cardNumberTo: number
        }

        dispatch(addTransaction(body)).then((result) => {
            if (result.success) {
                window.alert("Переказ успішний!");
                props.transactionSuccess();
            }
            else {
                window.alert("Переказ невдалий! Спробуйте пізніше!");
                props.discard();
            }
        })
    }

    return (
        <div className="modalWindow">
            <div className="title">
                <h2>
                    Зробити переказ
                </h2>
                <a onClick={props.discard}>
                    <i className="fa fa-close"></i>
                </a>
            </div>
            <div className="modalBody">
                <div className="section">
                    <div className="title">
                        <h4>
                            З картки
                        </h4>
                    </div>
                    <div className="description">
                        <div>
                            Номер картки: {props.card.cardNumber}
                        </div>
                        <div>
                            Залишок: {props.card.money} грн
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="title">
                        <h4>
                            Сума
                        </h4>
                    </div>
                    <div className="description form-group">
                        <div>
                            <input type="text" className="form-control" placeholder="Введіть суму" onChange={(event) => setSum(parseFloat(event.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="title">
                        <h4>
                            Оберіть призначення
                        </h4>
                    </div>
                    <div className="description form-group">
                        <div>
                            <select className="form-control" onChange={(event) => setType(parseInt(event.target.value))}>
                                <option value="2">Переказ на картку</option>
                                <option value="4">Переказ по IBAN</option>
                                <option value="5">Погашення кредиту</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="title">
                        <h4>
                            Введіть номер рахунку / карки
                        </h4>
                    </div>
                    <div className="description form-group">
                        <div>
                            <input type="text" className="form-control" placeholder="Введіть номер" onChange={(event) => setNumber((event.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <input type="button" value="Надіслати" className="btn linkButton" onClick={() => proceed()} />
                </div>
            </div>
        </div>
    );
}

export default CardTransactionModal;