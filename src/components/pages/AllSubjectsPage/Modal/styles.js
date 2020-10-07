import { makeStyles } from "@material-ui/core/styles";

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
    close: {
        position: "absolute",
        top: 20,
        right: 20,
    },
}));

export default useStyles;
