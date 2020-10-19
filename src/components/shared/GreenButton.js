import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[800]),
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
}))(Button);

export default ColorButton;
