import React from "react";
import { Link } from "react-router-dom";
import {
    Grid,
    Typography,
    Avatar,
    Paper,
    Button,
    Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import formatDate from "util/formatDate";

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "1rem 2rem",
        color: "black",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        textTransform:'initial'
    },
    avatar: {
        background: blue[500],
        color: theme.palette.getContrastText(blue[500]),
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    details:{
        width:"100%",
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
    }
}));

export default function LessonCard({ details }) {
    const classes = useStyles();

    return (
        <Grid item xs={10}>
            <Paper elevation={4}>
                <Button
                    to={`/lesson/${details._id}`}
                    component={Link}
                    className={classes.card}
                >
                    <Box mr={4}>
                        <Avatar className={classes.avatar}>
                            {details.title[0]}
                        </Avatar>
                    </Box>
                    <Box width={1}>
                        <Typography variant={"h5"} component={"h4"}>
                            {details.title}
                        </Typography>
                        <Box mt={2} className={classes.details}>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Created at: {formatDate(details.createdAt)}
                            </Typography>
                            <Typography variant={"subtitle1"} component={"p"}>
                                Last Updated: {formatDate(details.updatedAt)}
                            </Typography>
                        </Box>
                    </Box>
                </Button>
            </Paper>
        </Grid>
    );
}
