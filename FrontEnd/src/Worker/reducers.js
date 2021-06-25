const initialState = { result: "", isLoading: false };

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

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case FindTransactionRequest:
            return {
                ...state,
                isLoading: true
            };
        case FindTransactionReceive:
            return {
                ...state,
                transaction: action.response,
                isLoading: false
            };
        case GetAllFeedbacksRequest:
            return {
                ...state,
                isLoading: true
            };
        case GetAllFeedbacksReceive:
            return {
                ...state,
                feedbacks: action.response,
                isLoading: false
            };
        case ActivateCardRequest:
            return {
                ...state,
                isLoading: true
            };
        case ActivateCardReceive:
            return {
                ...state,
                cards: action.response,
                isLoading: false
            };
        case BlockCardRequest:
            return {
                ...state,
                isLoading: true
            };
        case BlockCardReceive:
            return {
                ...state,
                cards: action.response,
                isLoading: false
            };
        case GetAllInactiveCardsRequest:
            return {
                ...state,
                isLoading: true
            };
        case GetAllIncativeCardsReceive:
            return {
                ...state,
                cards: action.response,
                isLoading: false
            };
        case GetAllCardsRequest:
            return {
                ...state,
                isLoading: true
            };
        case GetAllCardsReceive:
            return {
                ...state,
                cards: action.response,
                isLoading: false
            };
        case GetUserInformation:
            return {
                ...state,
                isLoading: true
            };
        case ReceiveUserinformation:
            return {
                ...state,
                customerData: action.response,
                isLoading: false
            };
        case GetAllUsers:
            return {
                ...state,
                isLoading: true
            };
        case ReceiveAllUsers:
            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}
