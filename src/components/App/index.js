import React,{ useState } from "react";
import {
    Route,
    Switch,
} from "react-router-dom";
import clsx from "clsx";

import { useStyles } from "./styles";
import AppBar from "components/App/AppBar";
import Drawer from "components/App/Drawer";
// ROUTES
import Subjects from "components/pages/Subjects";
import NotFound from "components/pages/404";

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer handleDrawerClose={handleDrawerClose} open={open}/>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                    <Switch>
                        <Route exact path="/" component={Subjects} />
                        <Route component={NotFound} />
                    </Switch>
            </main>
        </div>
    );
}