import { requests } from "../connectingServices/connectingMethods";

const SendCommentRequset = "SEND_COMMENT_REQUEST";
const SendCommentReceive = "SEND_COMMENT_RECEIVE";

export const sendComment = (body) => async dispatch => { 
    
    dispatch({ type: SendCommentRequset });

    const url = "/api/Contact/send";
    const response = await requests.doPost(url, body);

    dispatch({ type: SendCommentReceive, response });
}