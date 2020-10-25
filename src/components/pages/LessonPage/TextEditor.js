import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { createEditor, Node } from "slate";
import { Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import api from "api/reviewapp.instance";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(6),
    },
}));

// Define a serializing function that takes a value and returns a string.
const serialize = (value) => {
    return value.map((n) => Node.string(n)).join("\n");
};

// Define a deserializing function that takes a string and returns a value.
const deserialize = (string) => {
    return string.split("\n").map((line) => {
        return {
            children: [{ text: line }],
        };
    });
};

export default function TextEditor() {
    const { lessonID } = useParams();
    const classes = useStyles();
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "A line of text in a paragraph." }],
        },
    ]);

    // CREATE A NOTE
    useEffect(() => {
        const getNote = async () => {
            try {
                const res = await api.get(`/note/${lessonID}`);
                const value = deserialize(res.data.notes);
                setValue(value);
            } catch (err) {
                console.log(err);
                console.log("ERROR");
            }
        };
        getNote();
    }, [lessonID]);

    const handleSave = async () => {
        try {
            const update = await api.put(`/note/${lessonID}`, {
                data: {
                    notes: serialize(value),
                },
            });
            console.log("Updated", update);
        } catch (err) {
            const newNote = await api.post(`/note/create`, {
                data: {
                    lessonID,
                    notes: serialize(value),
                },
            });
            console.log("created", newNote);
        }
    };

    const handleClear = () => {
        setValue([
            {
                type: "paragraph",
                children: [{ text: "Start writing" }],
            },
        ]);
    };

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
