import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "theme";

import { AuthProvider } from "contexts/AuthContext";

export default function Global({ children }) {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <AuthProvider>{children}</AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}
