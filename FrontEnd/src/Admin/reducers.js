const initialState = { result: "", isLoading: false };

const GetAllUsers = "GET_USERS_REQUEST";
const ReceiveAllUsers = "GET_USERS_RECEIVE";
const BlockUserRequest = "BLOCK_USER_REQUEST";
const BlockUserReceive = "BLOKC_USER_RECEIVE";
const EditUserData = "EDIT_USER_DATA_SEND_REQUEST";
const ReceiveEditUserData = "EDIT_USER_DATA_RECEIVE";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case EditUserData:
            return {
                ...state,
                isLoading: true
            };
        case ReceiveEditUserData:
            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        case BlockUserRequest:
            return {
                ...state,
                isLoading: true
            };
        case BlockUserReceive:
            return {
                ...state,
                result: action.response,
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