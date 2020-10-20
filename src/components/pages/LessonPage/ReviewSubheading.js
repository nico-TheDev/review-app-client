import React from "react";
import { Grid, Typography } from "@material-ui/core";
import formatDate from "util/formatDate";

export default function NSubhead({ details }) {
    return (
        <>
            <Grid item xs={6}>
                <Typography variant="body1" component="p">
                Highest Score : None
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" component="p">
                Number of Questions: 0
                </Typography>
            </Grid>
        </>
    );
}
