import React from "react";
import { Paper, Grid, Typography, IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/EditRounded";
import blue from "@material-ui/core/colors/blue";
import api from "api/reviewapp.instance";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
    avatar: {
        background: blue[500],
        color: theme.palette.getContrastText(blue[500]),
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

export default function ReviewCard({
    question,
    setTargetQuestion,
    handleOpenEdit,
}) {
    const classes = useStyles();

    const handleEdit = () => {
        api.get(`/question/${question._id}`)
            .then((res) => {
                setTargetQuestion(res.data);
                handleOpenEdit();
            })
            .catch((err) => console.log(err));
    };
    const handleDelete = () => {
        api.delete(`/question/${question._id}`)
            .then((res) => {
                console.log("Question Deleted");
            })
            .catch((err) => console.log(err));
    };

    return (
        <Grid xs={12} item>
            <Paper elevation={4} className={classes.paper}>
                <Grid
                    spacing={3}
                    item
                    container
                    xs={12}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={1}>
                        <Avatar className={classes.avatar}>
                            {question.count + 1}
                        </Avatar>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" component="h5">
                            {question.question}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton color="primary" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton color="secondary" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
