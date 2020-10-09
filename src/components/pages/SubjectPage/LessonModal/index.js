import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
    Modal,
    Backdrop,
    Fade,
    Grid,
    Typography,
    Divider,
    Button,
    TextField,
    IconButton,
} from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";

import api from "api/reviewapp.instance";
import { useAlert } from "contexts/AlertContext";

export default function LessonModal({ open, handleClose }) {
    const classes = useStyles();
    const params = useParams();
    const { handleAlertOpen } = useAlert();
    const [lessonData, setLessonData] = useState({
        subjectID: params.id,
        title: "",
        count: "",
        description: "",
    });

    const handleChange = (e) => {
        const current = e.target.name;
        const newData = {
            ...lessonData,
        };
        newData[current] = e.target.value;

        setLessonData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post(`/subject/${params.id}/lesson/new`, {
            data: lessonData,
        })
            .then((_) => {
                setLessonData({
                    subjectID: params.id,
                    title: "",
                    count: "",
                    description: "",
                });
                setTimeout(handleClose, 500);
                handleAlertOpen("Lesson Added!", "success");
            })
            .catch((err) => {
                handleAlertOpen("Lesson not Added", "error");
                console.error(err);
            });
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Grid
                    container
                    className={classes.paper}
                    alignContent="flex-start"
                    spacing={2}
                >
                    {/* Close */}
                    <IconButton className={classes.close} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>

                    <Grid item xs={12}>
                        <Typography
                            component={"h2"}
                            variant="h4"
                            className={classes.title}
                        >
                            <NoteAddIcon fontSize="large" />
                            New Lesson
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid
                        action="#"
                        xs={12}
                        item
                        container
                        className={classes.form}
                        onSubmit={handleSubmit}
                        component="form"
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <TextField
                                id="title"
                                label="Lesson Name"
                                className={classes.form}
                                name="title"
                                onChange={handleChange}
                                value={lessonData.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="count"
                                label="Lesson Count"
                                className={classes.form}
                                name="count"
                                onChange={handleChange}
                                value={lessonData.number}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="description"
                                label="Lesson Description"
                                className={classes.form}
                                name="description"
                                onChange={handleChange}
                                value={lessonData.description}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                {" "}
                                Add Lesson
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
}
