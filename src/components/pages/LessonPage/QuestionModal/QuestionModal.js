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
import { useAuth } from "contexts/AuthContext";
import ActionTypes from "actions/ActionTypes";

export default function QuestionModal({ open, handleClose }) {
    const classes = useStyles();
    const { handleAlertOpen } = useAlert();
    const { authState } = useAuth();
    const { token } = authState;
    const params = useParams();
    const { lessonID } = params;
    const [questionData, setQuestionData] = useState({
        lessonID,
        question: "",
        choiceOne: "",
        choiceTwo: "",
        choiceThree: "",
        choiceFour: "",
        answer: "",
        isAnswered:false
    });

    const handleChange = (e) => {
        const current = e.target.name;
        const newData = {
            ...questionData,
        };
        newData[current] = e.target.value;

        setQuestionData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(questionData).every((item) => item !== "")) {
            api.post("/question/new", {
                data: {
                    ...questionData,
                },
                params: {
                    token,
                },
            })
                .then((_) => {
                    setQuestionData({
                        lessonID,
                        question: "",
                        choiceOne: "",
                        choiceTwo: "",
                        choiceThree: "",
                        choiceFour: "",
                        answer: "",
                        isAnswered:false
                    });
                    setTimeout(handleClose, 500);
                    handleAlertOpen("Question Added", "success");
                })
                .catch((err) => {
                    handleAlertOpen("Question not Added!", "error");
                    console.error(err);
                });
        } else {
            handleAlertOpen("Please fill the text fields", "error");
        }
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
                            New Question Item
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
                                id="question"
                                label="Question"
                                className={classes.form}
                                name="question"
                                onChange={handleChange}
                                value={questionData.question}
                            />
                        </Grid>
                        <Grid item container xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    id="choiceOne"
                                    label="Choice A"
                                    className={classes.form}
                                    name="choiceOne"
                                    onChange={handleChange}
                                    value={questionData.choiceOne}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="choiceTwo"
                                    label="Choice B"
                                    className={classes.form}
                                    name="choiceTwo"
                                    onChange={handleChange}
                                    value={questionData.choiceTwo}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="choiceThree"
                                    label="Choice C"
                                    className={classes.form}
                                    name="choiceThree"
                                    onChange={handleChange}
                                    value={questionData.choiceThree}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="choiceFour"
                                    label="Choice D"
                                    className={classes.form}
                                    name="choiceFour"
                                    onChange={handleChange}
                                    value={questionData.choiceFour}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="answer"
                                label="Answer"
                                className={classes.form}
                                name="answer"
                                onChange={handleChange}
                                value={questionData.answer}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Add Question
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
}
