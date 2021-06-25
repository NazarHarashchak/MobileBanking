const initialState = { result: "", isLoading: false };

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
const GetAllTransactionsReguest = "GET_ALL_TRANSACTIONS_REQUEST";
const GetAllTransactionsReceive = "GET_ALL_TRANSACTIONS_RECEIVE";
const AddNewCreditRequest = "ADD_CREDIT_REQUEST";
const AddNewCreditReceive = "ADD_CREDIT_RECEIVE";
const GetUserCreditrequest = "GET_MY_CREDITS_REQUEST";
const GetuserCreditreceive = "GET_MY_CREDITS_RECEIVE";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case GetUserCreditrequest:
            return {
                ...state,
                isLoading: true
            };
        case GetuserCreditreceive:
            return {
                ...state,
                credits: action.response,
                isLoading: false
            };
        case AddNewCreditRequest:
            return {
                ...state,
                isLoading: true
            };
        case AddNewCreditReceive:
            return {
                ...state,
                credits: action.response,
                isLoading: false
            };
        case GetAllTransactionsReguest:
            return {
                ...state,
                isLoading: true
            };
        case GetAllTransactionsReceive:
            return {
                ...state,
                transactions: action.response,
                isLoading: false
            };
        case GetCardsRequest:
            return {
                ...state,
                isLoading: true
            };
        case GetCardsReceive:
            return {
                ...state,
                cards: action.response,
                isLoading: false
            };
        case DeleteCardReqguest:
            return {
                ...state,
                isLoading: true
            };
        case DeleteCardReceive:
            return {
                ...state,
                cards: action.response,
                isLoading: false
            };
        case GetNewCardRequest:
            return {
                ...state,
                isLoading: true
            };
        case GetNewCardReceive:
            return {
                ...state,
                newCard: action.response,
                isLoading: false
            };
        case SavePassportData:
            return {
                ...state,
                isLoading: true
            };
        case SavePassportDataReceive:
            return {
                ...state,
                passportData: action.response,
                isLoading: false
            };
        case GetPassportData:
            return {
                ...state,
                isLoading: true
            };
        case GetPassportDataReceive:
            return {
                ...state,
                passportData: action.response,
                isLoading: false
            };
        case GetCardTypes:
            return {
                ...state,
                isLoading: true
            };
        case ReceiveCardTypes:
            return {
                ...state,
                cardTypes: action.response,
                isLoading: false
            };
        case SendUserData:
            return {
                ...state,
                isLoading: true
            };
        case ReceiveUserData:
            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        case GetSingleUserData:
            return {
                ...state,
                isLoading: true
            };
        case ReceiveSingleUserData:
            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}