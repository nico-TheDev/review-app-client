import React, { useCallback, useMemo, useState } from "react";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { createEditor } from "slate";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(6),
    },
}));

export default function TextEditor() {
    const classes = useStyles();
    const editor = useMemo(() => withReact(createEditor()), []);
    // Add the initial value when setting up our state.
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "Start Taking notes" }],
        },
    ]);

    return (
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
    );
}
