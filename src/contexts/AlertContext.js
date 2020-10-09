import React, { createContext, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alertStatus, setAlertStatus] = useState({
        status: false,
        message: "",
        type: "success",
    });
    const handleAlertOpen = (message, type) => {
        setAlertStatus({
            status: true,
            message,
            type,
        });
    };
    const handleAlertClose = () => {
        setAlertStatus({
            ...alertStatus,
            status: false,
        });
    };

    return (
        <AlertContext.Provider value={{ handleAlertOpen,handleAlertClose }}>
            {children}
            <Snackbar
                open={alertStatus.status}
                autoHideDuration={3000}
                onClose={handleAlertClose}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alertStatus.type}
                    variant="filled"
                    elevation={6}
                >
                    {alertStatus.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};

export const useAlert = () => React.useContext(AlertContext);
