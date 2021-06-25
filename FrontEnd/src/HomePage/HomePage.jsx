import React from 'react';
import ServiceItem from './ServiceItem';
import image1 from '../SiteFiles/001-wallet.svg';
import image2 from '../SiteFiles/002-rich.svg';
import image3 from '../SiteFiles/003-notes.svg';
import image4 from '../SiteFiles/004-cart.svg';
import image5 from '../SiteFiles/005-megaphone.svg';
import image6 from '../SiteFiles/006-credit-card.svg';

function HomePage() {
    return (
        <div className="homePage">
            <div className="servicesZone">
                <div className="title">
                    <h2>
                        Сервіси
                    </h2>
                </div>
                <div className="items">
                    <ServiceItem image={image1} title={"Допомога бізнесу"} description={"Цілодобова підтримка вашого бізнесу"}/>
                    <ServiceItem image={image6} title={"Кредитні картки"} description={"Відкривайте та керуйте своїми картками онлайн"}/>
                    <ServiceItem image={image2} title={"Моніторинг доходу"} description={"Слідкуйте та перевіряйте свої депозити"}/>
                    <ServiceItem image={image3} title={"Допомога в страхуванні"} description={"Допомагаємо в страхуванні вашого життя"}/>
                    <ServiceItem image={image4} title={"Фінансові інвестиції"} description={"З нами ви зможете заробляти в будь який час"}/>
                    <ServiceItem image={image5} title={"Фінансовий менеджмент"} description={"Наші експерти завжди знають що вам порадити"}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;