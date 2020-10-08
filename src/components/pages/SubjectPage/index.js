import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import api from "api/reviewapp.instance";
import SubjectHead from "./SubjectHead";
import LessonCard from "./LessonCard";

export default function SubjectPage({ match }) {
    const { id } = match.params;
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
    }, [id]);

    useEffect(() => {
        api.get(`/subject/${id}/lesson/all`).then(
            (res) => {
                console.log(res.data);
                setLessons(res.data);
            },
            (err) => console.error(err)
        );
    }, [id]);

    if (!currentSubject) return "Loading...";

    return (
        <>
            <SubjectHead details={currentSubject} />
            <Grid container spacing={3} justify="center" alignItems="center">
                {lessons.map((lesson) => (
                    <LessonCard key={lesson._id} details={lesson} />
                ))}
            </Grid>
        </>
    );
}
