import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { useAuth } from "contexts/AuthContext";

export default function NotFoundPage() {
    const { authState } = useAuth();
    const { userID } = authState;
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Box mb={4} mt={30}>
                <Typography variant="h3" color="secondary">
                    Feature not Available <span role="img">😅</span>
                </Typography>
                <Typography variant="body2" color="secondary">
                    This is just a prototype so this feature is not implemented!
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to={userID ? "/dashboard" : "/"}
            >
                Go Back
            </Button>
        </Grid>
    );
}
