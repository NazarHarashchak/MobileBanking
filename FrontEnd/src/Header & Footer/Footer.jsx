import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="wrapper">
                <div className="footerZone">
                    <div className="col-sm-4 section">
                        <div className="title">
                            <h2>
                                Про нас
                            </h2>
                        </div>
                        <div className="description">
                            <p>
                                Banking - це новий зручний онлайн банкінг у твоєму місті. Користуйся ним будь те, а також з будь якого девайсу.
                                Запрошуй до нас своїх друзів і користуєтеся разом новим та зручним додатком.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-4 section">
                        <div className="title">
                            <h2>
                                Посилання
                            </h2>
                        </div>
                        <div className="description">
                            <ul className="menu">
                                <li>
                                    <a href="/">
                                        Головна
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact">
                                        Контакти
                                    </a>
                                </li>
                                <li>
                                    <a href="/login">
                                        Вхід
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-4 section">
                        <div className="title">
                            <h2>
                                Підписуйся на нас
                            </h2>
                        </div>
                        <div className="description">
                            <ul className="social">
                                <li>
                                    <a href="www.facebook.com">
                                        <i className="fa fa-facebook">                              
                                        </i>
                                    </a>
                                </li>
                                <li>
                                    <a href="www.instagram.com">
                                        <i className="fa fa-instagram">                              
                                        </i>
                                    </a>
                                </li>
                                <li>
                                    <a href="www.youtube.com">
                                        <i className="fa fa-youtube">                              
                                        </i>
                                    </a>
                                </li>
                                <li>
                                    <a href="www.twitter.com">
                                        <i className="fa fa-twitter">                              
                                        </i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyrightZone">
                    <p>
                        Copyright ©2021 | Banking | All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;