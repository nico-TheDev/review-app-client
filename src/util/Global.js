import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "theme";

export default function Global({ children }) {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </BrowserRouter>
        </>
    );
}
