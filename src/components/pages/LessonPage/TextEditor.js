import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { createEditor } from "slate";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import api from "api/reviewapp.instance";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(6),
    },
}));

export default function TextEditor() {
    const classes = useStyles();
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "Start Taking notes" }],
        },
    ]);

    // CREATE A NOTE

    useEffect(() => {}, []);

    return (
        <>
            <Grid item xs={10}>
                <Paper elevation={4} className={classes.paper}>
                    <Slate
                        editor={editor}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    >
                        <Editable />
                    </Slate>
                </Paper>
            </Grid>
            <Grid item container xs={10} spacing={3}>
                <Grid item xs={6}>
                    <Button variant="outlined" color="primary" fullWidth>
                        SAVE
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" color="secondary" fullWidth>
                        CLEAR
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
