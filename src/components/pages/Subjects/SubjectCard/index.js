import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    contentStyle: {
        padding: theme.spacing(2),
    },
}));

export default function SubjectCard({ details }) {
    const classes = useStyles();
    const [ random,setRandom] = useState(0);
    
    const { name, code, schedule, professor, lessons } = details;

    useEffect(() =>{
        setRandom(Math.floor(Math.random() * 100))
    },[])

    return (
        <Grid item xs={6} md={3}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`https://source.unsplash.com/random/${random}`}
                        title="Contemplative Reptile"
                        loading='lazy'
                    />
                    <CardContent className={classes.contentStyle}>
                        <Typography
                            gutterBottom
                            component="h2"
                            noWrap
                            width={1}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                        >
                            <Typography variant="body1">Code: {code}</Typography>
                            <Typography variant="body1">
                                Schedule: {schedule}
                            </Typography>
                            <Typography variant="body1">
                                Professor: {professor}
                            </Typography>
                            <Typography variant="body1">
                                Lessons: {lessons.length}
                            </Typography>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="medium"
                        color="primary"
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to='/subject/id'
                    >
                        Open
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
