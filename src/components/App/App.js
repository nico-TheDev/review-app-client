import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import clsx from "clsx";

import { useStyles } from "./styles";
import AppBar from "components/App/AppBar";
import Drawer from "components/App/Drawer";
// ROUTES
import AllSubjects from "components/pages/DashboardPage";
import SubjectPage from "components/pages/SubjectPage";
import SignupPage from "components/pages/SignupPage";
import LoginPage from "components/pages/LoginPage";
import NotFound from "components/pages/NotFoundPage";

// CONTEXT
import { AlertProvider } from "contexts/AlertContext";
import { ModalProvider } from "contexts/ModalContext";
import { useAuth } from "contexts/AuthContext";

export default function App() {
    const classes = useStyles();
    const { authState } = useAuth();
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
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />

            {authState.user ? (
                <Route
                    path="/dashboard"
                    render={({ match }) => (
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
                                        <Route
                                            exact
                                            path={match.url}
                                            component={AllSubjects}
                                        />
                                        <Route
                                            exact
                                            path={`${match.url}/subject/:id`}
                                            component={SubjectPage}
                                        />
                                    </ModalProvider>
                                </AlertProvider>
                            </main>
                        </div>
                    )}
                />
            ) : (
                <Redirect to="/login" />
            )}
            <Route component={NotFound} />
        </Switch>
    );
}
