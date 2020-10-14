import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      width: theme.spacing(8),
      height: theme.spacing(8),
  },
  form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
  icon: {
      width: theme.spacing(6),
      height: theme.spacing(6),
  },
}));