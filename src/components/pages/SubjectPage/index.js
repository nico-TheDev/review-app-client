import React, { useState, useEffect } from "react";
import { Grid, Typography, Fab } from "@material-ui/core";
import AddNoteIcon from "@material-ui/icons/NoteAdd";

import api from "api/reviewapp.instance";
import useStyles from "components/shared/fabUseStyle";
import SubjectHead from "./SubjectHead";
import LessonCard from "./LessonCard";
import LessonModal from "./LessonModal";
import { useModal } from "contexts/ModalContext";
import ActionTypes from 'actions/ActionTypes'
import SubjectModal from 'components/pages/AllSubjectsPage/SubjectModal'

export default function SubjectPage({ match }) {
    const { id } = match.params;
    const {state, dispatch} = useModal()
    const classes = useStyles(); // Fab Style
    const [currentSubject, setCurrentSubject] = useState(null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        api.get(`/subject/${id}`).then(
            (res) => {
                console.log(res.data);
                setCurrentSubject(res.data);
            },
            (err) => console.error(err)
        );
    }, [id,state.isSubjectModalOpen]);

    useEffect(() => {
        api.get(`/subject/${id}/lesson/all`).then(
            (res) => {
                console.log(res.data);
                setLessons(res.data);
            },
            (err) => console.error(err)
        );
    }, [id,state.isLessonModalOpen]);

    const handleOpen = () => {
        dispatch({type:ActionTypes.OPEN_LESSON_MODAL})
    };

    if (!currentSubject) return "Loading...";

    return (
        <>
            <SubjectHead details={currentSubject} />
            <Grid container spacing={3} justify="center" alignItems="center">
                {lessons.length ? (
                    lessons.map((lesson) => (
                        <LessonCard key={lesson._id} details={lesson} />
                    ))
                ) : (
                    <Grid item xs={12} container justify="center">
                        <Typography variant={"h4"}>No Lessons Yet</Typography>
                    </Grid>
                )}
            </Grid>
            <Fab
                onClick={handleOpen}
                color="primary"
                className={classes.fabStyle}
            >
                <AddNoteIcon />
            </Fab>
            <LessonModal/>
            <SubjectModal editSubject={currentSubject}/>
        </>
    );
}
