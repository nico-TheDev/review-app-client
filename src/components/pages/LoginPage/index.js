import React,{ useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useStyles } from './styles';
import api from 'api/reviewapp.instance';

export default function SignIn() {
    const classes = useStyles();
    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    })
    const [errorHandler,setErrorHandler] = useState({
        email:{
            hasError:false,
            msg:''
        },
        password:{
            hasError:false,
            msg:''
        }
    })


    const handleChange = (e) => {
        const current = e.target.name;
        const newData = {
            ...loginData,
        };
        newData[current] = e.target.value;

        setLoginData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        let newErrorHandler = { ...errorHandler} 
        if(Object.values(loginData).every(item => item !== "") && regex.test(loginData.email)){
            api.post('/login',{
                data:loginData
            }).then((res) => {
                console.log(res);
            }).catch(err => console.error(err));
        }else{
            Object.values(loginData).forEach(item => {
                if(!regex.test(loginData.email)){
                    newErrorHandler.email = { 
                        hasError:true,
                        msg:'Incorrect Email'
                    }
                }
                else if (loginData.password.length < 6){
                    newErrorHandler.email = { 
                        hasError:true,
                        msg:'Password must be at least 6 characters'
                    }
                }
                else{
                    newErrorHandler.email = { 
                        hasError:true,
                        msg:"Email must not be blank"
                    }
                    newErrorHandler.password = {
                        hasError:true,
                        msg:"Password must not be blank"
                    }
                }

            })
        }

        setErrorHandler(newErrorHandler)
        
    }



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonIcon className={classes.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        type="email"
                        value={loginData.email}
                        helperText={errorHandler.email.msg}
                        error={errorHandler.email.hasError}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={loginData.email}
                        helperText={errorHandler.email.msg}
                        error={errorHandler.email.hasError}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                to="/signup"
                                variant="body2"
                                component={RouterLink}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
