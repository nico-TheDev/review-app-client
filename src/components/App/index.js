import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import clsx from "clsx";

import { useStyles } from "./styles";
import AppBar from "components/App/AppBar";
import Drawer from "components/App/Drawer";
// ROUTES
import AllSubjects from "components/pages/AllSubjectsPage";
import SubjectPage from "components/pages/SubjectPage";
import SignupPage from "components/pages/SignupPage";
import LoginPage from "components/pages/LoginPage";
import NotFound from "components/pages/404";

// CONTEXT
import { AlertProvider } from "contexts/AlertContext";
import { ModalProvider } from "contexts/ModalContext";

export default function App() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />

            <Route
                path="/dashboard"
                render={({ match: url }) => (
                    <div className={classes.root}>
                        <AppBar
                            open={open}
                            handleDrawerOpen={handleDrawerOpen}
                        />
                        <Drawer
                            handleDrawerClose={handleDrawerClose}
                            open={open}
                        />
                        <main
                            className={clsx(classes.content, {
                                [classes.contentShift]: open,
                            })}
                        >
                            <div className={classes.drawerHeader} />
                            <AlertProvider>
                                <ModalProvider>
                                    <Route path={url} component={AllSubjects} />
                                    <Route
                                        path={`${url}/subject/:id`}
                                        component={SubjectPage}
                                    />
                                </ModalProvider>
                            </AlertProvider>
                        </main>
                    </div>
                )}
            />
            <Route component={NotFound} />
        </Switch>
    );
}
