import { requests } from "../connectingServices/connectingMethods";

const GetAllUsers = "GET_USERS_REQUEST";
const ReceiveAllUsers = "GET_USERS_RECEIVE";
const GetUserInformation = "GET_USER_INFO_REQUEST";
const ReceiveUserinformation = "GET_USER_INFO_RECEIVE";
const GetAllCardsRequest = "GET_ALL_CARDS_REQUEST";
const GetAllCardsReceive = "GET_ALL_CARDS_RECEIVE";
const GetAllInactiveCardsRequest = "GET_ALL_INACTIVE_CARDS_REQUEST";
const GetAllIncativeCardsReceive = "GET_ALL_INACTIVE_CARDS_RECEIVE";
const BlockCardRequest = "BLOCK_CARD_REQUEST";
const BlockCardReceive = "BLOCK_CARD_RECEIVE";
const ActivateCardRequest = "ACTIVATE_CARD_REQUEST";
const ActivateCardReceive = "ACTIVATE_CARD_RECEIVE";
const GetAllFeedbacksRequest = "GET_ALL_FEEDBACKS_REQUEST";
const GetAllFeedbacksReceive = "GET_ALL_FEEDBACKS_RECEIVE";
const FindTransactionRequest = "FIND_TRANSACTION_REQUEST";
const FindTransactionReceive = "FIND_TRANSACTION_RECEIVE";

export const findTransaction = (body) => async dispatch => {

    dispatch({ type: FindTransactionRequest });

    const url = "/api/Transaction/findtransaction";
    const response = await requests.doPost(url, body);

    dispatch({ type: FindTransactionReceive, response });
};

export const getFeedbacks = () => async dispatch => {

    dispatch({ type: GetAllFeedbacksRequest });

    const url = "/api/Contact/getall";
    const response = await requests.doGet(url);

    dispatch({ type: GetAllFeedbacksReceive, response });
};

export const activateCard = (body) => async dispatch => {

    dispatch({ type: ActivateCardRequest });

    const url = "/api/Card/ActivateCard";
    const response = await requests.doPost(url, body);

    dispatch({ type: ActivateCardReceive, response });
};

export const blockCard = (body) => async dispatch => {

    dispatch({ type: BlockCardRequest });

    const url = "/api/Card/BlockCards";
    const response = await requests.doPost(url, body);

    dispatch({ type: BlockCardReceive, response });
};

export const getAllInactiveCards = () => async dispatch => {

    dispatch({ type: GetAllInactiveCardsRequest });

    const url = "/api/Card/getinactivecards";
    const response = await requests.doGet(url);

    dispatch({ type: GetAllIncativeCardsReceive, response });
};

export const getAllCards = () => async dispatch => {

    dispatch({ type: GetAllCardsRequest });

    const url = "/api/Card/getallcards";
    const response = await requests.doGet(url);

    dispatch({ type: GetAllCardsReceive, response });
};

export const getUser = (userID) => async dispatch => {

    dispatch({ type: GetUserInformation });

    const url = "/api/User/Worker/getuser/" + userID;
    const response = await requests.doGet(url);

    dispatch({ type: ReceiveUserinformation, response });
};

export const getUsers = () => async dispatch => {

    dispatch({ type: GetAllUsers });

    const url = "/api/User/Worker/getusers";
    const response = await requests.doGet(url);

    dispatch({ type: ReceiveAllUsers, response });
};