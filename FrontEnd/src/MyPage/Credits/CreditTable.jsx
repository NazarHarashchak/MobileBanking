import React from 'react';

export default function CreditTable(props) {
    return (
        <div className="creditTable">
            <table>
                <thead>
                    <tr>
                        <td>
                            Тип кредиту
                        </td>
                        <td>
                            Річний відсоток
                        </td>
                        <td>
                            Максимальна сума
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            На житло
                        </td>
                        <td>
                            8
                        </td>
                        <td>
                            1500000
                        </td>
                    </tr>
                    <tr>
                        <td>
                            На машину
                        </td>
                        <td>
                            12
                        </td>
                        <td>
                            1000000
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Готівковий
                        </td>
                        <td>
                            25
                        </td>
                        <td>
                            50000
                        </td>
                    </tr>
                    <tr>
                        <td>
                            На картку
                        </td>
                        <td>
                            22
                        </td>
                        <td>
                            120000
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}