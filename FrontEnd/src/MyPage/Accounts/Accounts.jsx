import React, { useState, useEffect } from 'react';
import AddAccount from './AddAccount';
import MyCards from './MyCards';

function Accounts(props) {

    const [showAdd, setShowAdd] = useState(false);

    return (
        <div className="accountsPage page">
            <div className="addNew">
                <button className="btn linkButton" onClick={() => setShowAdd(true)}>
                    <i className="fa fa-plus"></i>
                    <span> Додати</span>
                </button>
                {
                    showAdd ?
                        <AddAccount cancel={() => setShowAdd(false)} id={props.id}/>
                        :
                        null
                }
            </div>
            <div className="">
                <MyCards id={props.id} />
            </div>
        </div>
    );
}

export default Accounts;