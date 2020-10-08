import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Grid,
    Divider,
    IconButton,
    Fab,
    Snackbar,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Alert from "@material-ui/lab/Alert";
import CreateIcon from "@material-ui/icons/Create";

import SubjectCard from "./SubjectCard";
import Modal from "./SubjectModal";

import api from "api/reviewapp.instance";

const useStyles = makeStyles({
    fabStyle: {
        position: "fixed",
        bottom: 20,
        right: 20,
    },
    containerStyle: {
        position: "relative",
        padding:'1.5rem'
    },
});

export default function Subjects() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState({
        status: false,
        message: "",
        type:'success'
    });
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        api.get("/subject/all")
            .then((res) => {
                setSubjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [open, setOpen]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertOpen = (message,type) => {
        setIsAlertOpen({
            status: true,
            message,
            type
        });
    };
    const handleAlertClose = () => {
        setIsAlertOpen({
            status: false,
            message: "",
            type:'success'
        });
    };

    return (
        <Grid container spacing={2} className={classes.containerStyle}>
            {/* ALERT MESSAGE */}
            <Snackbar
                open={isAlertOpen.status}
                autoHideDuration={3000}
                onClose={handleAlertClose}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={isAlertOpen.type}
                    variant="filled"
                    elevation={6}
                >
                    Subject Added!
                </Alert>
            </Snackbar>
            {/* ALERT MESSAGE */}

            <Grid item xs={12} container justify="space-between">
                <Typography variant="h4" color="primary">
                    Subjects
                </Typography>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item container xs={12} spacing={2} wrap="wrap">
                {subjects.length ? (
                    subjects.map((item, index) => (
                        <SubjectCard key={index} details={item} />
                    ))
                ) : (
                    <Typography color="secondary" variant="h3">
                        No Subjects Yet
                    </Typography>
                )}
            </Grid>
            <Fab
                className={classes.fabStyle}
                color="primary"
                onClick={handleOpen}
            >
                <CreateIcon />
            </Fab>
            {open && (
                <Modal
                    open={open}
                    handleClose={handleClose}
                    handleAlertOpen={handleAlertOpen}
                />
            )}
        </Grid>
    );
}
