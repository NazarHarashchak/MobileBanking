import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacks } from '../actions';

export default function Feedbacks(props) {

    const dispatch = useDispatch();
    const feedbacks = useSelector(state => state.workerUsers);
    const [comments, setComments] = useState("");

    useEffect(() => {
        dispatch(getFeedbacks());
    }, []);

    useEffect(() => {
        if (feedbacks && feedbacks.feedbacks && feedbacks.feedbacks.comments)
            setComments(feedbacks.feedbacks.comments);
    }, [feedbacks]);

    return (
        <div className="allAccounts">
            <table>
                <thead>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            Дата
                        </td>
                        <td>
                            Ім'я
                        </td>
                        <td>
                            Емейл
                        </td>
                        <td>
                            Номер телефону
                        </td>
                        <td>
                            Повідомлення
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        comments.length > 0 ?
                            comments.sort((a, b) => {
                                if (a.dateCreated < b.dateCreated)
                                    return 1;
                                if (a.dateCreated > b.dateCreated)
                                    return -1;
                                return 0;
                            }).map((item, key) =>
                                <tr key={key}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.dateCreated}
                                    </td>
                                    <td>
                                        {item.name} {item.secondName}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.phoneNumber}
                                    </td>
                                    <td>
                                        {item.message}
                                    </td>
                                </tr>
                            )
                            :
                            null
                    }
                </tbody>
            </table>
        </div>
    );
}