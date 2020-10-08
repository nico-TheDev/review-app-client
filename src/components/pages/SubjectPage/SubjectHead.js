import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    head: {
        height: "40vh",
        position: "relative",
        zIndex: 2,
        color: "white",
        textAlign: "center",
        marginBottom:theme.spacing(4)
    },
    backdrop: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.8)), url(https://source.unsplash.com/random/${Math.floor(
            Math.random() * 100
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
        top: 0,
        left: 0,
    },
}));

export default function SubjectHead({ details }) {
    const classes = useStyles();

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
                    Code: <span>{details.code}</span>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={"h6"}>
                    Professor: <span>{details.professor}</span>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={"h6"}>
                    Schedule: <span>{details.schedule}</span>
                </Typography>
            </Grid>
        </Grid>
    );
}
