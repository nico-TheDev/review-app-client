import React from "react";
import { Link } from 'react-router-dom';
import { Grid, Typography, Button,Box } from "@material-ui/core";

export default function NotFoundPage() {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Box mb={4}>
                <Typography variant="h3" color="secondary" mb={4}>
                    404 Page Not Found
                </Typography>
            </Box>
            <Button variant="contained" color="secondary" size="large" component={Link} to='/'>
                Go Back
            </Button>
        </Grid>
    );
}
