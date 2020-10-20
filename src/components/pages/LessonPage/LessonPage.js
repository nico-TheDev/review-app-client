import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";

import LessonHead from "./LessonHead";
import EditLessonModal from "./EditLessonModal";
import api from "api/reviewapp.instance";
import { useModal } from "contexts/ModalContext";
import { useAuth } from "contexts/AuthContext";
import TextEditor from "./TextEditor";

export default function LessonPage({ match }) {
    const { subjectID, lessonID } = match.params;
    const { state: modalState } = useModal();
    const { authState, authDispatch } = useAuth();
    const [current, setCurrent] = useState("notes");

    const [currentLesson, setCurrentLesson] = useState(null);

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
                {current === "notes" ? <TextEditor /> : "Review Component HERE"}
            </Grid>

            <EditLessonModal editMode={currentLesson} />
        </>
    );
}
