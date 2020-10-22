import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

import api from "api/reviewapp.instance";
import ReviewCard from "./ReviewCard";

export default function Review({ update,handleOpenEdit,setTargetQuestion }) {
    const { lessonID } = useParams();
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        api.get(`/question/${lessonID}/all`)
            .then((res) => setQuestionList(res.data))
            .catch((err) => console.log(err));
    }, [update, lessonID]);

    return (
        <Grid xs={10} item container spacing={4}>
            {questionList.length
                ? questionList.map((question, count) => (
                      <ReviewCard
                          key={question._id}
                          question={{ ...question, count }}
                          handleOpenEdit={handleOpenEdit}
                          setTargetQuestion={setTargetQuestion}
                      />
                  ))
                : "No Questions Yet"}
        </Grid>
    );
}
