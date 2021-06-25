import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, createNewCard, deleteCard } from '../actions';
import CardItem from './CardItem';

function AddAccount(props) {

    const [choise, setChoise] = useState(1);

    const dispatch = useDispatch();
    const stateData = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    function discard() {
        debugger
        setChoise(0);
        if (stateData.newCard)
            dispatch(deleteCard(stateData.newCard.id));
        props.cancel();
    }

    function proceed() {
        let body = {
            userID: props.id,
            cardTypeID: choise
        }

        dispatch(createNewCard(body));
    }

    return (
        <div className="addAccount">
            <div className="types">
                <div className="form-group">
                    <div className="co-sm-12">
                        <h4>
                            Оберіть тип картки
                        </h4>
                    </div>
                    <div className="col-sm-6">
                        <select className="form-control" onChange={(event) => { setChoise(parseInt(event.target.value)) }}>
                            {
                                stateData && stateData.cardTypes ?
                                    stateData.cardTypes.cardTypes.map((item, key) =>
                                        <option key={key} value={item.id}>
                                            {item.type}
                                        </option>
                                    )
                                    :
                                    null
                            }
                        </select>
                    </div>
                    <div className="col-sm-6">
                        <input type="button" className="btn linkButton" value="Обрати" onClick={() => proceed()} />
                    </div>
                </div>
            </div>
            {
                stateData && stateData.newCard ?
                    <CardItem card={stateData.newCard} />
                    :
                    null
            }
            <div className="buttons">
                <div className="col-sm-12">
                    <button className="btn linkButton" onClick={() => props.cancel()}>
                        Зберегти
                    </button>
                    <button className="btn linkButton" onClick={() => discard()}>
                        Скасувати
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddAccount;