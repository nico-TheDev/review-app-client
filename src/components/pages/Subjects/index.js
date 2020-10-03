import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, IconButton, Fab } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import CreateIcon from "@material-ui/icons/Create";

import SubjectCard from "./SubjectCard";
import Modal from "./Modal";

const useStyles = makeStyles({
    fabStyle: {
        position: "fixed",
        bottom: 20,
        right: 20,
    },
    containerStyle: {
        position: "relative",
    },
});

const SAMPLE = [
    {
        name: "Mathematics",
        code: "GE-2345",
        schedule: ["Mon", "Wed", "Fri"],
        professor: "Mr. Sample Name",
        lessons: Math.floor(Math.random() * 10), //Array at the db
    },
    {
        name: "Programming Logic and Design",
        code: "GE-2345",
        schedule: ["Mon", "Wed", "Fri"],
        professor: "Mr. Sample Name",
        lessons: Math.floor(Math.random() * 10), //Array at the db
    },
    {
        name: "Calculus",
        code: "GE-2345",
        schedule: ["Mon", "Wed", "Fri"],
        professor: "Mr. Sample Name",
        lessons: Math.floor(Math.random() * 10), //Array at the db
    },
    {
        name: "Machine Learning",
        code: "GE-2345",
        schedule: ["Mon", "Wed", "Fri"],
        professor: "Mr. Sample Name",
        lessons: Math.floor(Math.random() * 10), //Array at the db
    },
    {
        name: "Mathematics",
        code: "GE-2345",
        schedule: ["Mon", "Wed", "Fri"],
        professor: "Mr. Sample Name",
        lessons: Math.floor(Math.random() * 10), //Array at the db
    },
];

export default function Subjects() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={2} className={classes.containerStyle}>
            <Grid item xs={12} container justify="space-between">
                <Typography variant="h4" color="primary">
                    Subjects
                </Typography>
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item container xs={12} spacing={2} wrap="wrap">
                {SAMPLE.map((item, index) => (
                    <SubjectCard key={index} details={item} />
                ))}
            </Grid>
            <Fab
                className={classes.fabStyle}
                color="primary"
                onClick={handleOpen}
            >
                <CreateIcon />
            </Fab>
            {open && <Modal open={open} handleClose={handleClose} />}
        </Grid>
    );
}
