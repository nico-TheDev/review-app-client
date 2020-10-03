import React, { useMemo, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

export default function ListLink({details}) {
    const { icon, label, to } = details;

    const CustomLink = useMemo(
        () =>
            forwardRef((linkProps, ref) => (
                <NavLink ref={ref} to={to} {...linkProps} />
            )),
        [to]
    );

    return (
        <ListItem button component={CustomLink}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItem>
    );
}
