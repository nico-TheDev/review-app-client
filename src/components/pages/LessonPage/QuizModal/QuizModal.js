import React, { useState, useEffect } from "react";
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
import shuffle from "util/shuffle";

export default function EditQuestionModal({ open, handleClose, details }) {
    const classes = useStyles();
    const { handleAlertOpen } = useAlert();
    const { authState } = useAuth();
    const { token } = authState;
    const params = useParams();
    const { lessonID } = params;
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionList, setQuestionList] = useState([]);
    const [status, setStatus] = useState({
        correct: 0,
        wrong: 0,
        answered: 0,
    });

    useEffect(() => {
        api.get(`/question/${lessonID}/all`)
            .then((res) => {
                const list = res.data;
                setQuestionList(shuffle(list));
            })
            .catch((err) => console.log(err));
    }, [lessonID]);

    useEffect(() => {
        if (questionList.length) setCurrentQuestion(questionList[0]);
    }, [questionList]);

    useEffect(() => {
        setStatus({
            correct: 0,
            wrong: 0,
            answered: 0,
        });
    }, [handleClose]);

    const handleClick = (e) => {
        const answer = e.target.textContent;

        if (answer === currentQuestion.answer) {
            setStatus({
                ...status,
                correct: (status.correct += 1),
                answered: (status.answered += 1),
            });
        } else {
            setStatus({
                ...status,
                wrong: (status.wrong += 1),
                answered: (status.answered += 1),
            });
        }

        const updatedList = questionList.filter((item) => {
            if (item._id !== currentQuestion._id) {
                return item;
            }
        });

        setQuestionList(updatedList);
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
                            Review Quiz
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
                        component="form"
                        spacing={3}
                    >
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                Correct Answer:{status.correct}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                Wrong Answer:{status.wrong}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                Answered:{status.answered} /5
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.question}>
                            <Typography variant="h6">
                                {currentQuestion?.question}
                            </Typography>
                        </Grid>
                        {currentQuestion &&
                            Object.keys(currentQuestion).map((key, i) => {
                                if (key.includes("choice")) {
                                    return (
                                        <Grid item xs={6} key={i}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                fullWidth
                                                onClick={handleClick}
                                            >
                                                {currentQuestion[key]}
                                            </Button>
                                        </Grid>
                                    );
                                }
                            })}
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
}
