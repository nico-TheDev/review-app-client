import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "components/Menu";
import { useAuth } from "contexts/AuthContext";
import { useStyles } from "./styles";

export default function AppBarComponent({ open, handleDrawerOpen }) {
    const classes = useStyles();
    const { authState } = useAuth();
    const { user } = authState;

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.capitalize}>
                    {user.firstName}'s Dashboard
                </Typography>

                <Menu />
            </Toolbar>
        </AppBar>
    );
}
