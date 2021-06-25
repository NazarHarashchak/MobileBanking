import React from 'react';
import AddCredit from './AddCredit';
import CreditTable from './CreditTable';
import MyCredits from './MyCredits';

export default function Credits (props) {
    return (
        <div className="credits accountsPage">
            <CreditTable />
            <AddCredit />
            <MyCredits />
        </div>
    );
}