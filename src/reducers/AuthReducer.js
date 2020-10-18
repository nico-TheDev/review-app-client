import ActionTypes from "actions/ActionTypes";

function saveToLocalStorage(token, id) {
    localStorage.setItem("token", token);
    localStorage.setItem("userID", id);
}

export default function AuthReducer(state, action) {
    switch (action.type) {
        case ActionTypes.SET_TOKEN:
            saveToLocalStorage(action.token, action.userID);
            return {
                ...state,
                token: action.token,
                userID: action.userID,
            };
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case ActionTypes.LOGIN_USER:
            return state;
        case ActionTypes.LOGOUT_USER:
            return {
                token: null,
                user: null,
                userID: null,
            };
        default:
            return state;
    }
}
