const initialState = { result: "", isLoading: false };

const SendCommentRequset = "SEND_COMMENT_REQUEST";
const SendCommentReceive = "SEND_COMMENT_RECEIVE";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case SendCommentRequset:
            return {
                ...state,
                isLoading: true
            };
        case SendCommentReceive:

            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}