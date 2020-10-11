import React, { createContext, useReducer,useContext } from 'react';
import ModalReducer from 'reducers/ModalReducer'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ModalReducer, {
        isSubjectModalOpen:false,
        isLessonModalOpen:false
    })

    return (
        <ModalContext.Provider value={{state, dispatch}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)