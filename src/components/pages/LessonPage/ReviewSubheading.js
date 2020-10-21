import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function NSubhead({ details }) {
    return (
        <>
            <Grid item xs={3}>
                <Typography variant="body1" component="p">
                Highest Score : None
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1" component="p">
                Number of Tries: 0
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1" component="p">
                Number of Questions: 0
                </Typography>
            </Grid>
        </>
    );
}
