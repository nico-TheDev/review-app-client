import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import api from "api/reviewapp.instance";
import { useStyles } from "./styles";

export default function SignIn() {
    const classes = useStyles();
    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordTwo: "",
    });
    const [errorHandler, setErrorHandler] = useState({
        firstName: { hasError: false, msg: "" },
        lastName: { hasError: false, msg: "" },
        email: { hasError: false, msg: "" },
        password: { hasError: false, msg: "" },
        passwordTwo: { hasError: false, msg: "" },
    });

    const handleChange = (e) => {
        const current = e.target.name;
        const newData = {
            ...signupData,
        };
        newData[current] = e.target.value;

        setSignupData(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if (
            Object.values(signupData).every((item) => item !== "") &&
            signupData.password === signupData.passwordTwo && regex.test(signupData.email)
        ) {
            api.post("/signup", {
                data: signupData,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.error(err));
        } else {
            const keys = Object.keys(signupData);
            let newErrorState = { ...errorHandler };
            Object.values(signupData).forEach((val, i) => {
                if (val === "") {
                    newErrorState[keys[i]] = {
                        hasError: true,
                        msg: "Cannot be empty",
                    };
                } else if (!regex.test(signupData.email)) {
                    newErrorState.email = {
                        hasError: true,
                        msg: "Incorrect Email",
                    };
                } else if (signupData.password.length < 6) {
                    newErrorState.password = {
                        hasError: true,
                        msg: "Password minimum of 6 characters",
                    };
                } else if (signupData.password !== signupData.passwordTwo) {
                    newErrorState.passwordTwo = {
                        hasError: true,
                        msg: "Password should be the same",
                    };
                } else {
                    newErrorState[keys[i]] = { hasError: false, msg: "" };
                }
            });
            setErrorHandler(newErrorState);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonIcon className={classes.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={signupData.firstName}
                        autoFocus
                        onChange={handleChange}
                        error={errorHandler.firstName.hasError}
                        helperText={errorHandler.firstName.msg}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={signupData.lastName}
                        autoFocus
                        error={errorHandler.lastName.hasError}
                        helperText={errorHandler.lastName.msg}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={signupData.email}
                        autoFocus
                        type="email"
                        error={errorHandler.email.hasError}
                        helperText={errorHandler.email.msg}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={errorHandler.password.hasError}
                        helperText={errorHandler.password.msg}
                        value={signupData.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="passwordTwo"
                        label="Re-enter Password"
                        type="password"
                        id="passwordTwo"
                        error={errorHandler.passwordTwo.hasError}
                        helperText={errorHandler.passwordTwo.msg}
                        value={signupData.passwordTwo}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </Container>
    );
}
