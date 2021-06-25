import { requests } from "../connectingServices/connectingMethods";

const GetSingleUserData = "SINGLE_USER_REQUEST";
const ReceiveSingleUserData = "SINGLE_USER_RECEIVE";
const SendUserData = "SEND_MY_USER_DATA";
const ReceiveUserData = "RECEIVE_MY_USER_DATA";
const GetCardTypes = "GET_CARD_TYPES_REQUEST";
const ReceiveCardTypes = "GET_CARD_TYPES_RECEIVE";
const GetPassportData = "GET_PASSPORT_REQUEST";
const GetPassportDataReceive = "GET_PASSPORT_RECEIVE";
const SavePassportData = "SAVE_PASSPORT_REQUEST";
const SavePassportDataReceive = "SAVE_PASSPORT_RECEIVE";
const GetNewCardRequest = "GET_NEW_CARD_REQUEST";
const GetNewCardReceive = "GET_NEW_CARD_RECEIVE";
const DeleteCardReqguest = "DELETE_CARD_REQUEST";
const DeleteCardReceive = "DELETE_CARD_RECEIVE";
const GetCardsRequest = "GET_CARDS_REQUESTS";
const GetCardsReceive = "GET_CARDS_RECEIVE";
const SendTransactionRequest = "ADD_TRANSACTION_REQUEST";
const SendTransactionReceive = "ADD_TRANSACTION_RECEIVE";
const GetAllTransactionsReguest = "GET_ALL_TRANSACTIONS_REQUEST";
const GetAllTransactionsReceive = "GET_ALL_TRANSACTIONS_RECEIVE";
const AddNewCreditRequest = "ADD_CREDIT_REQUEST";
const AddNewCreditReceive = "ADD_CREDIT_RECEIVE";
const GetUserCreditrequest = "GET_MY_CREDITS_REQUEST";
const GetuserCreditreceive = "GET_MY_CREDITS_RECEIVE";

export const getCredits = (id) => async dispatch => {
    
    dispatch({ type: GetUserCreditrequest });

    const url = "/api/Credit/getMyCredits/" + id;
    const response = await requests.doGet(url);

    dispatch({ type: GetuserCreditreceive, response });
}

export const addCredit = (body) => async dispatch => {
    
    dispatch({ type: AddNewCreditRequest });

    const url = "/api/Credit/addCredit";
    const response = await requests.doPost(url, body);

    dispatch({ type: AddNewCreditReceive, response });

    return response;
}

export const getTransactions = (id) => async dispatch => {
    
    dispatch({ type: GetAllTransactionsReguest });

    const url = "/api/Transaction/getalltransactins/" + id;
    const response = await requests.doGet(url);

    dispatch({ type: GetAllTransactionsReceive, response });
}

export const addTransaction = (body) => async dispatch => {
    
    dispatch({ type: SendTransactionRequest });

    const url = "/api/Transaction/addtransaction";
    const response = await requests.doPost(url, body);

    dispatch({ type: SendTransactionReceive, response });

    return response;
}

export const getCards = (userID) => async dispatch => {
    
    dispatch({ type: GetCardsRequest });

    const url = "/api/Card/getcards/" + userID;
    const response = await requests.doGet(url);

    dispatch({ type: GetCardsReceive, response });

}

export const deleteCard = (cardID) => async dispatch => {
    
    dispatch({ type: DeleteCardReqguest });

    const url = "/api/Card/deleteCard/" + cardID;
    const response = await requests.doDelete(url);

    dispatch({ type: DeleteCardReceive, response });

}

export const createNewCard = (body) => async dispatch => {
    
    dispatch({ type: GetNewCardRequest });

    const url = "/api/Card/GetNewCard";
    const response = await requests.doPost(url, body);

    dispatch({ type: GetNewCardReceive, response });

}

export const saveUserPassport = (body) => async dispatch => { 
    
    dispatch({ type: SavePassportData });

    const url = "/api/User/SavePassport";
    const response = await requests.doPost(url, body);

    dispatch({ type: SavePassportDataReceive, response });

    return response;
};

export const getPassportData = (userid) => async dispatch => { 
    
    dispatch({ type: GetPassportData });

    const url = "/api/User/Worker/getuser/" + userid;
    const response = await requests.doGet(url);

    dispatch({ type: GetPassportDataReceive, response });
};

export const getTypes = () => async dispatch => { 
    
    dispatch({ type: GetCardTypes });

    const url = "/api/Card/gettypes";
    const response = await requests.doGet(url);

    dispatch({ type: ReceiveCardTypes, response });
};

export const getUser = (userid) => async dispatch => { 
    
    dispatch({ type: GetSingleUserData });

    const url = "/api/User/getuser/" + userid;
    const response = await requests.doGet(url);

    dispatch({ type: ReceiveSingleUserData, response });
};

export const saveUser = (body) => async dispatch => { 
    
    dispatch({ type: SendUserData });

    const url = "/api/User/editmyuserdata";
    const response = await requests.doPost(url, body);

    dispatch({ type: ReceiveUserData, response });

    return response;
};