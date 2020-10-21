import React, { useEffect, useState } from "react";
import { Grid, Button, Fab } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/CreateNewFolderOutlined";

import LessonHead from "./LessonHead";
import EditLessonModal from "./EditLessonModal";
import api from "api/reviewapp.instance";
import { useModal } from "contexts/ModalContext";
import { useAuth } from "contexts/AuthContext";
import TextEditor from "./TextEditor";
import Review from "./Review";
import useFabStyle from "components/shared/fabUseStyle";
import QuestionModal from "./QuestionModal";

export default function LessonPage({ match }) {
    const { subjectID, lessonID } = match.params;
    const { state: modalState } = useModal();
    const { authState, authDispatch } = useAuth();
    const [current, setCurrent] = useState("notes");
    const classes = useFabStyle();
    const [currentLesson, setCurrentLesson] = useState(null);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

    useEffect(() => {
        api.get(`/subject/${subjectID}/lesson/${lessonID}`)
            .then((res) => {
                console.log(res.data);
                setCurrentLesson(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [lessonID, subjectID, modalState.isLessonModalOpen]);

    const handleOpen = () => setIsQuestionModalOpen(true)
    const handleClose = () => setIsQuestionModalOpen(false)

    return (
        <>
            <LessonHead details={currentLesson} current={current} />
            <Grid container justify="center" alignContent="center" spacing={4}>
                <Grid item xs={3}>
                    <Button
                        variant={current === "notes" ? "contained" : "outlined"}
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={() => setCurrent("notes")}
                    >
                        Notes
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant={
                            current !== "review" ? "outlined" : "contained"
                        }
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={() => setCurrent("review")}
                    >
                        Review
                    </Button>
                </Grid>
                {/* NOTE SECTION */}
                {current === "notes" ? <TextEditor /> : <Review />}
            </Grid>

            {/* MODALS */}
            <Fab
                className={classes.fabStyle}
                color="primary"
                onClick={handleOpen}
                disabled={current !== "review"}
            >
                <CreateIcon />
            </Fab>

            <EditLessonModal editMode={currentLesson} />
            <QuestionModal open={isQuestionModalOpen} handleClose={handleClose}/>
        </>
    );
}
