import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
//ROUTE ICONS
import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SettingsIcon from "@material-ui/icons/Settings";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";

import { useStyles } from "./styles";
import ListItemLink from "components/App/ListItem";

const ROUTES = [
    {
        label: "Home",
        to: "/dashboard",
        icon: <HomeIcon />,
    },
    {
        label: "Lessons",
        to: "/not-available",
        icon: <LibraryBooksIcon />,
    },
    {
        label: "Settings",
        to: "/not-available",
        icon: <SettingsIcon />,
    },
    {
        label: "Theme",
        to: "/not-available",
        icon: <FormatPaintIcon />,
    },
];

export default function DrawerComponent({ handleDrawerClose, open }) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <Typography variant="h6" color="primary">
                    ReviewMe
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </div>
            <Divider />
            <List>
                {ROUTES.map((item, i) => (
                    <ListItemLink details={item} key={i} primary="primary" />
                ))}
            </List>
        </Drawer>
    );
}
