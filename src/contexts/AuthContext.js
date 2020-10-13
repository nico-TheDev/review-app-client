import React, { useReducer, useEffect, createContext, useContext } from "react";
import Cookie from "js-cookie";

import AuthReducer from "reducers/AuthReducer";

const AuthContext = createContext();

const initialState = () => {
    if (Cookie.get("jwt"))
        return {
            token: Cookie.get("jwt"),
            user: null,
        };

    return {
        token: null,
        user: null,
    };
};

export const AuthProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(AuthReducer, {}, initialState);

    useEffect(() => {
        if (authState.token && !authState.user) {
        }
    }, [authState, authDispatch]);

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
