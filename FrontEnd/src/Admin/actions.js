import { requests } from "../connectingServices/connectingMethods";

const SendUserData = "USER_DATA_SEND_REQUEST";
const ReceiveUserData = "USER_DATA_RECEIVE";
const GetAllUsers = "GET_USERS_REQUEST";
const ReceiveAllUsers = "GET_USERS_RECEIVE";
const BlockUserRequest = "BLOCK_USER_REQUEST";
const BlockUserReceive = "BLOKC_USER_RECEIVE";
const EditUserData = "EDIT_USER_DATA_SEND_REQUEST";
const ReceiveEditUserData = "EDIT_USER_DATA_RECEIVE";

export const editUserData = (body) => async dispatch => { 
    
    dispatch({ type: EditUserData });

    const url = "/api/User/edituser";
    const response = await requests.doPost(url, body);

    dispatch({ type: ReceiveEditUserData, response });

    return response;
};

export const blockUser = (userID) => async dispatch => { 
    
    dispatch({ type: BlockUserRequest });

    const url = "/api/User/blockuser";
    const response = await requests.doPost(url, userID);

    dispatch({ type: BlockUserReceive, response });
};

export const sendUserData = (body) => async dispatch => { 
    
    dispatch({ type: SendUserData });

    const url = "/api/User/saveuser";
    const response = await requests.doPost(url, body);

    dispatch({ type: ReceiveUserData, response });

    return response;
};

export const getUsers = () => async dispatch => { 
    
    dispatch({ type: GetAllUsers });

    const url = "/api/User/getallusers";
    const response = await requests.doGet(url);

    dispatch({ type: ReceiveAllUsers, response });
};