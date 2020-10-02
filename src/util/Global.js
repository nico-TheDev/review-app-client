import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function Global({ children }) {
    return (
        <>
            <CssBaseline />
            {children}
        </>
    );
}
