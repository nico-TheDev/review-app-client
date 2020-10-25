import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Grid, Paper, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import api from "api/reviewapp.instance";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(6),
    },
}));

export default function TextEditor() {
    const { lessonID } = useParams();
    const classes = useStyles();
    const [value, setValue] = useState("");

    useEffect(() => {
        api.get(`/note/${lessonID}`)
            .then((res) => {
                console.log(res)
                setValue(res.data.notes);
            })
            .catch((err) => console.log(err));
    }, [lessonID]);

    const handleSave = async () => {
        try {
            const getRes = await api.get(`/note/${lessonID}`);
            if (getRes.data.notes) {
                const update = await api.put(`note/${lessonID}`, {
                    data: {
                        lessonID,
                        notes: value,
                    },
                });
            } else {
                const create = await api.post(`note/$create`, {
                    data: {
                        lessonID,
                        notes: value,
                    },
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleClear = () => {
        setValue("");
    };

    return (
        <>
            <Grid item xs={10}>
                <Paper elevation={4} className={classes.paper}>
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Start taking notes"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                </Paper>
            </Grid>
            <Grid item container xs={10} spacing={3}>
                <Grid item xs={6}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleSave}
                    >
                        SAVE
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleClear}
                    >
                        CLEAR
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
