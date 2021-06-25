import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {sendComment} from './actions';

function Contact(props) {

    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const comment = useSelector(state => state.comment);

    useEffect(() => {
        if (comment && comment.result && comment.result !== ""){
            if (comment.result) {
                window.alert("Відгук збережено!");
                window.location.href = '/';
            }
        }
    }, [comment]);

    function sendValues() {
        if (!name || name === "" ||
            !secondName || secondName ==="" ||
            !phoneNumber || phoneNumber === "" ||
            !email || email === "" ||
            !message || message === ""
        ){
            window.alert("Потрібно заповнити всі поля!");
            return;
        }

        let body = {
            name: name,
            secondName: secondName,
            phoneNumber: phoneNumber,
            email: email,
            message: message
        };

        dispatch(sendComment(body));
    }

    return (
        <div className="contactPage">
            <form>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            І'мя
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setName(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Прізвище
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setSecondName(event.target.value)} reguired />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Номер телефону
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setPhoneNumber(event.target.value)} reguired />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Емейл
                        </label>
                        <input type="text" className="form-control" onChange={(event) => setEmail(event.target.value)} reguired />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <label>
                            Коментар
                        </label>
                        <textarea type="text" className="form-control" onChange={(event) => setMessage(event.target.value)} reguired>

                        </textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <input type="button" id="registrateBtn" className="btn btn-primary linkButton" value="Відправити" onClick={sendValues}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Contact;