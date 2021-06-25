const initialState = { result: "", isLoading: false };

const LoginUserRequset = "LOGIN_REQUEST";
const LoginUserReceive = "LOGIN_RECEIVE";
const RegisterUserRequset = "REGISTER_REQUEST";
const RegisterUserReceive = "REGISTER_RECEIVE";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case LoginUserRequset:
            return {
                ...state,
                isLoading: true
            };
        case LoginUserReceive:

            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        case RegisterUserRequset:
            return {
                ...state,
                isLoading: true
            };
        case RegisterUserReceive:

            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}