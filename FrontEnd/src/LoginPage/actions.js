import { requests } from "../connectingServices/connectingMethods";

const LoginUserRequset = "LOGIN_REQUEST";
const LoginUserReceive = "LOGIN_RECEIVE";
const RegisterUserRequset = "REGISTER_REQUEST";
const RegisterUserReceive = "REGISTER_RECEIVE";

export const loginUser = (body) => async dispatch => { 
    
        dispatch({ type: LoginUserRequset });

        const url = "/api/Authentification/authentificate";
        const response = await requests.doPost(url, body);

        dispatch({ type: LoginUserReceive, response });
}

export const registrateUser = (body) => async dispatch => { 
    
    dispatch({ type: RegisterUserRequset });

    const url = "/api/Authentification/registrate";
    const response = await requests.doPost(url, body);

    dispatch({ type: RegisterUserReceive, response });
}