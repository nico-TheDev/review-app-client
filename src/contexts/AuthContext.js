import React, { useReducer, useEffect, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "api/reviewapp.instance";
import AuthReducer from "reducers/AuthReducer";
import ActionTypes from "actions/ActionTypes";
const AuthContext = createContext();

const initialState = () => {
    if (localStorage.getItem("token"))
        return {
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("user")),
            userID: localStorage.getItem("userID"),
        };

    return {
        token: null,
        user: null,
        userID: null,
    };
};

export const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(AuthReducer, {}, initialState);
    const history = useHistory();
    // GET USER DETAILS
    useEffect(() => {
        if (authState.token && !authState.user) {
            api.get(`/user/${authState.userID}`, {
                params: { token: authState.token },
            })
                .then((res) => {
                    authDispatch({
                        type: ActionTypes.SET_USER,
                        user: res.data.user,
                    });
                    history.push("/dashboard");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [authState, history]);

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
