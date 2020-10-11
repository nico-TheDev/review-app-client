import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DeleteOutline, Edit } from "@material-ui/icons";

import api from "api/reviewapp.instance";
import { useAlert } from "contexts/AlertContext";

const useStyles = makeStyles((theme) => ({
    head: {
        height: "40vh",
        position: "relative",
        zIndex: 2,
        color: "white",
        textAlign: "center",
        marginBottom: theme.spacing(4),
    },
    backdrop: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url(https://source.unsplash.com/1280x720/?programming,computer/${Math.floor(Math.random() * 100)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
        top: 0,
        left: 0,
    },
    button: {
        marginLeft: theme.spacing(4),
    },
}));

export default function SubjectHead({ details }) {
    const classes = useStyles();
    const { handleAlertOpen } = useAlert();
    const params = useParams();
    const history = useHistory();

    const handleDelete = () => {
        api.delete(`/subject/${params.id}`)
            .then((res) => {
                console.log(res);
                handleAlertOpen('Lesson Deleted','success')
                history.push("/");
            })
            .catch((err) => {
                handleAlertOpen('Lesson not Deleted','error')
                console.error(err)});
    };

    return (
        <Grid
            container
            spacing={2}
            className={classes.head}
            alignContent="center"
            justify="center"
        >
            <div className={classes.backdrop} />
            <Grid item xs={12}>
                <Typography variant={"h4"} component="h2">
                    {details.name}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={"h6"}>
                    Code: <span>{details.code.toUpperCase()}</span>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={"h6"}>
                    Professor: <span>{details.professor}</span>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={"h6"}>
                    Schedule: <span>{details.schedule.toUpperCase()}</span>
                </Typography>
            </Grid>
            <Grid item xs={6} container justify="center">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteOutline />}
                    onClick={handleDelete}
                >
                    Delete Subject
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    className={classes.button}
                >
                    Edit Subject
                </Button>
            </Grid>
        </Grid>
    );
}
