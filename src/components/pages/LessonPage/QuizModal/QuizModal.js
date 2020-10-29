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
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";

import api from "api/reviewapp.instance";
import shuffle from "util/shuffle";

export default function QuizModal({
    open,
    handleClose,
    isQuestionModalOpen,
    isEditQuestionModalOpen,
}) {
    const classes = useStyles();
    const params = useParams();
    const { lessonID } = params;
    let [counter, setCounter] = useState(0);
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
                const list = shuffle(res.data);
                setQuestionList(list);
                setCurrentQuestion(list[0]);
            })
            .catch((err) => console.log(err));
    }, [lessonID, isQuestionModalOpen, isEditQuestionModalOpen,handleClose]);

    useEffect(() => {
        setStatus({
            correct: 0,
            wrong: 0,
            answered: 0,
        });
        setCounter(0);
        setCurrentQuestion(questionList[0]);
    }, [handleClose]);

    useEffect(() => {
        if (counter) setCurrentQuestion(questionList[counter]);
    }, [counter, questionList]);

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
        setCounter((counter += 1));
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
                        {counter === questionList.length && (
                            <>
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
                            </>
                        )}
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                Answered:{status.answered} /
                                {questionList.length}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.question}>
                            <Typography variant="h6">
                                {questionList.length >= 5 && currentQuestion?.question}
                            </Typography>
                        </Grid>
                        {questionList.length >= 5 && currentQuestion ? (
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
                            })
                        ) : (
                            <Typography
                                variant="h4"
                                style={{ textAlign: "center" }}
                            >
                                {counter === questionList.length
                                    ? `You scored ${status.correct}/${status.answered}`
                                    : "You should have a minimum of 5 questions"}{" "}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
}
