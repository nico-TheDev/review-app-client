import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import api from "api/reviewapp.instance";
import { useAlert } from "contexts/AlertContext";

export default function ReviewSubhead() {
    const { lessonID } = useParams();
    // const [triesCount, setTriesCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const { handleAlertOpen } = useAlert();

    useEffect(() => {
        api.get(`/question/${lessonID}/all`)
            .then((res) => {
                setQuestionCount(res.data.length);
            })
            .catch((err) => console.log(err));
    }, [lessonID, handleAlertOpen]);

    return (
        <>
            {/* <Grid item xs={6}>
                <Typography variant="body1" component="p">
                    Number of Tries: {triesCount}
                </Typography>
            </Grid> */}
            <Grid item xs={6}>
                <Typography variant="body1" component="p">
                    Number of Questions: {questionCount}
                </Typography>
            </Grid>
        </>
    );
}
