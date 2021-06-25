import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultImage from '../../SiteFiles/defaultImage.png';
import { getPassportData, saveUserPassport } from '../actions';

function MyDocuments(props) {

    const dispatch = useDispatch();
    const myDocs = useSelector(state => state.user);

    const [passportCode, setPassportCode] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [taxCode, setTaxCode] = useState("");

    const [firstPageImage, setFirstPageImage] = useState("");
    const [secondPageImage, setSecondPageImage] = useState("");
    const [thirdPageImage, setThirdPageImage] = useState("");
    const [fourthPageImage, setFourthPageImage] = useState("");
    const [taxImage, setTaxImage] = useState("");

    useEffect(() => {
        dispatch(getPassportData(props.id));
    }, []);

    useEffect(() => {
        discard();
    }, [myDocs]);

    function discard() {
        if (myDocs && myDocs.passportData) {
            let data = myDocs.passportData;
            if (data.success) {
                setPassportCode(data.passportCode);
                setPassportNumber(data.passportNumber);
                setTaxCode(data.taxCode);

                setFirstPageImage(data.passportImageFirstPage);
                setSecondPageImage(data.passportImageSecondPage);
                setThirdPageImage(data.passportImageAddressPage1);
                setFourthPageImage(data.passportImageAddressPage2);
                setTaxImage(data.taxCodeImage);
            }
            else {
                console.log(data.message);
            }
        }
    }

    function saveChanges() {
        var body = {
            id: parseInt(props.id),
            passportCode: passportCode,
            passportNumber: passportNumber,
            taxCode: taxCode,
            passportImageAddressPage1: thirdPageImage,
            passportImageAddressPage2: fourthPageImage,
            passportImageFirstPage: firstPageImage,
            passportImageSecondPage: secondPageImage,
            taxCodeImage: taxImage
        }

        dispatch(saveUserPassport(body)).then((result) => {
            if (result.success) {
                window.alert("Збережено!");
            }
            else {
                console.log(result.message);
            }
        });
    }

    return (
        <div className="myDocs">
            <form>
                <div className="form-group">
                    <div className="col-sm-3">
                        <label>
                            Cерія паспорту
                        </label>
                        <input type="text" className="form-control" value={passportCode} onChange={(event) => setPassportCode(event.target.value)} />
                    </div>
                    <div className="col-sm-3">
                        <label>
                            Номер паспорту
                        </label>
                        <input type="text" className="form-control" value={passportNumber} onChange={(event) => setPassportNumber(event.target.value)} />
                    </div>
                    <div className="col-sm-6">
                        <label>
                            Ідентифікаційний код
                        </label>
                        <input type="text" className="form-control" value={taxCode} onChange={(event) => setTaxCode(event.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <h4>
                            Фото документів
                        </h4>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6">
                        <div className="image">
                            <img src={firstPageImage ? firstPageImage : defaultImage} alt="user-image" />
                        </div>
                        <label>
                            Перша сторінка паспорту
                        </label>
                        {
                            myDocs.passportData && myDocs.passportData.isPassportImageFirstPageRight ?
                                <label>
                                    <i className="fa fa-like"></i>
                                    Перевірено
                                </label>
                                :
                                <label>
                                    <i className="fa fa-close"></i>
                                    Не підтверджено
                                </label>
                        }
                        <input onChange={(event) => {
                            let file = event.target.files[0];

                            let reader = new FileReader();
                            reader.onloadend = function () {
                                var result = reader.result;
                                setFirstPageImage(result);
                            }
                            reader.readAsDataURL(file);
                        }}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            placeholder="Завантажити нове фото" />
                    </div>
                    <div className="col-sm-6">
                        <div className="image">
                            <img src={secondPageImage ? secondPageImage : defaultImage} alt="user-image" />
                        </div>
                        <label>
                            Друга сторінка паспорту
                        </label>
                        {
                            myDocs.passportData && myDocs.passportData.isPassportImageSecondPageRight ?
                                <label>
                                    <i className="fa fa-like"></i>
                                    Перевірено
                                </label>
                                :
                                <label>
                                    <i className="fa fa-close"></i>
                                    Не підтверджено
                                </label>
                        }
                        <input onChange={(event) => {
                            let file = event.target.files[0];

                            let reader = new FileReader();
                            reader.onloadend = function () {
                                var result = reader.result;
                                setSecondPageImage(result);
                            }
                            reader.readAsDataURL(file);
                        }}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            placeholder="Завантажити нове фото" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6">
                        <div className="image">
                            <img src={thirdPageImage ? thirdPageImage : defaultImage} alt="user-image" />
                        </div>
                        <label>
                            Третя сторінка паспорту
                        </label>
                        {
                            myDocs.passportData && myDocs.passportData.isPassportImageAddressPage1Right ?
                                <label>
                                    <i className="fa fa-like"></i>
                                    Перевірено
                                </label>
                                :
                                <label>
                                    <i className="fa fa-close"></i>
                                    Не підтверджено
                                </label>
                        }
                        <input onChange={(event) => {
                            let file = event.target.files[0];

                            let reader = new FileReader();
                            reader.onloadend = function () {
                                var result = reader.result;
                                setThirdPageImage(result);
                            }
                            reader.readAsDataURL(file);
                        }}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            placeholder="Завантажити нове фото" />
                    </div>
                    <div className="col-sm-6">
                        <div className="image">
                            <img src={fourthPageImage ? fourthPageImage : defaultImage} alt="user-image" />
                        </div>
                        <label>
                            Четверта сторінка паспорту
                        </label>
                        {
                            myDocs.passportData && myDocs.passportData.isPPassportImageAddressPage2Right ?
                                <label>
                                    <i className="fa fa-like"></i>
                                    Перевірено
                                </label>
                                :
                                <label>
                                    <i className="fa fa-close"></i>
                                    Не підтверджено
                                </label>
                        }
                        <input onChange={(event) => {
                            let file = event.target.files[0];

                            let reader = new FileReader();
                            reader.onloadend = function () {
                                var result = reader.result;
                                setFourthPageImage(result);
                            }
                            reader.readAsDataURL(file);
                        }}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            placeholder="Завантажити нове фото" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6">
                        <div className="image">
                            <img src={taxImage ? taxImage : defaultImage} alt="user-image" />
                        </div>
                        <label>
                            Ідентифікаційний номер
                        </label>
                        {
                            myDocs.passportData && myDocs.passportData.isTaxCodeImageRight ?
                                <label>
                                    <i className="fa fa-like"></i>
                                    Перевірено
                                </label>
                                :
                                <label>
                                    <i className="fa fa-close"></i>
                                    Не підтверджено
                                </label>
                        }
                        <input onChange={(event) => {
                            let file = event.target.files[0];

                            let reader = new FileReader();
                            reader.onloadend = function () {
                                var result = reader.result;
                                setTaxImage(result);
                            }
                            reader.readAsDataURL(file);
                        }}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            placeholder="Завантажити нове фото" />
                    </div>
                </div>
                <div className="form-group buttons">
                    <div className="col-sm-12">
                        <input type="button" value="Зберегти" className="btn linkButton" onClick={saveChanges} />
                        <input type="button" value="Скасувати" className="btn linkButton" onClick={discard} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MyDocuments;