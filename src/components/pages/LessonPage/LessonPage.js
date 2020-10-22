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
import EditQuestionModal from "./EditQuestionModal";

export default function LessonPage({ match }) {
    const { subjectID, lessonID } = match.params;
    const classes = useFabStyle();
    const { authState, authDispatch } = useAuth();
    const { state: modalState } = useModal();
    const [current, setCurrent] = useState("notes");
    const [currentLesson, setCurrentLesson] = useState(null);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
    const [targetQuestion, setTargetQuestion] = useState(null);

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

    const handleOpen = () => setIsQuestionModalOpen(true);
    const handleClose = () => setIsQuestionModalOpen(false);
    const handleOpenEdit = () => setIsEditQuestionModalOpen(true);
    const handleCloseEdit = () => setIsEditQuestionModalOpen(false);

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
                {current === "notes" ? (
                    <TextEditor />
                ) : (
                    <Review
                        update={{isQuestionModalOpen,isEditQuestionModalOpen}}
                        setTargetQuestion={setTargetQuestion}
                        handleOpenEdit={handleOpenEdit}
                    />
                )}
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
            <QuestionModal
                open={isQuestionModalOpen}
                handleClose={handleClose}
            />
            <EditQuestionModal
                open={isEditQuestionModalOpen}
                handleClose={handleCloseEdit}
                details={targetQuestion}
            />
        </>
    );
}
