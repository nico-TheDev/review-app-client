import React, { useState, useEffect } from "react";
import { Typography, Grid, Divider, IconButton, Fab } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import CreateIcon from "@material-ui/icons/Create";

import SubjectCard from "./SubjectCard";
import Modal from "./SubjectModal";

import api from "api/reviewapp.instance";
import useStyles from "components/shared/fabUseStyle";
import { useModal } from "contexts/ModalContext";
import { useAuth } from "contexts/AuthContext";
import ActionTypes from "actions/ActionTypes";

export default function Subjects() {
    const classes = useStyles();
    const { state, dispatch } = useModal();
    const { authState } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const { token, userID } = authState;

    useEffect(() => {
        api.get(`/subject/all/${userID}`, {
            params: {
                token,
            },
        })
            .then((res) => {
                console.log(res);
                setSubjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [state.isSubjectModalOpen, token, userID]);

    const handleOpen = () => {
        dispatch({ type: ActionTypes.OPEN_SUBJECT_MODAL });
    };

    return (
        <Grid container spacing={2} className={classes.containerStyle}>
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
                {Array.isArray(subjects) && subjects.length ? (
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
            {state.isSubjectModalOpen && <Modal />}
        </Grid>
    );
}
