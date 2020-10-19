import React from "react";
import { Grid, Typography } from "@material-ui/core";
import formatDate from "util/formatDate";

export default function NoteSubhead({ details }) {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="body1" component="p">
                    {details?.description}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" component="p">
                    Created:{details && formatDate(details.createdAt)}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" component="p">
                    Last Updated:{details && formatDate(details.updatedAt)}
                </Typography>
            </Grid>
        </>
    );
}
