import ActionTypes from "actions/ActionTypes";

export default function AuthReducer(state, action) {
    switch (action.type) {
        case ActionTypes.SIGNUP_USER:
            return state;
        case ActionTypes.LOGIN_USER:
            return state;
        case ActionTypes.LOGOUT_USER:
            return state;
        default:
            return state;
    }
}
