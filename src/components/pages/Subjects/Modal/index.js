import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Modal,
    Backdrop,
    Fade,
    Grid,
    Typography,
    Divider,
    Button,
    TextField,
    IconButton
} from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "80%",
        height: "80vh",
        position: "relative",
    },
    title: {
        display: "flex",
        alignItems: "center",
    },
    form: {
        width: "100%",
    },
    close:{
        position:'absolute',
        top:20,
        right:20
    }
}));

export default function TransitionsModal({ open, handleClose }) {
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitted!");
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Grid
                    container
                    className={classes.paper}
                    alignContent="flex-start"
                    spacing={2}
                >
                {/* Close */}
                <IconButton className={classes.close} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>

                    <Grid item xs={12}>
                        <Typography
                            component={"h2"}
                            variant="h4"
                            className={classes.title}
                        >
                            <NoteAddIcon fontSize="large" />
                            New Subject
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid
                        action="#"
                        xs={12}
                        item
                        container
                        className={classes.form}
                        onSubmit={handleSubmit}
                        component="form"
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                label="Subject Name"
                                className={classes.form}
                                name="name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="code"
                                label="Subject Code"
                                className={classes.form}
                                name="code"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="professor"
                                label="Subject Professor"
                                className={classes.form}
                                name="professor"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="days"
                                label="Subject Schedule"
                                className={classes.form}
                                name="days"
                                helperText="Mon/Wed/Thu separate by slash"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                {" "}
                                Add Subject
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    );
}
