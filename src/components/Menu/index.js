import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar } from "@material-ui/core";

import { useAuth } from "contexts/AuthContext";
import ActionTypes from "actions/ActionTypes";

const useStyles = makeStyles({
    avatarStyle: {
        marginLeft: "auto",
    },
});

export default function SimpleMenu() {
    const classes = useStyles();
    const history = useHistory();
    const { authDispatch } = useAuth();
    //state for anchor element
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        authDispatch({ type: ActionTypes.LOGOUT_USER });
        localStorage.clear();
        history.push("/login");
    };

    return (
        <div className={classes.avatarStyle}>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
