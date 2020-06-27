import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TypoGraphy from '@material-ui/core/Typography';


function Copyright() {
    return (
      <TypoGraphy variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Yuriy Belov
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </TypoGraphy>
    );
  }

const useStyles = makeStyles((theme) => ({
footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    marginTop: 50,
    verticalAlign: "bottom"

},
}));

export default function Footer() {
    const classes = useStyles();
  
    return (
        <React.Fragment><footer className={classes.footer}>
                <TypoGraphy variant="subtitle1" align="center" color="textSecondary" component="p" gutterBottom>
                Track Your Tasks. Stay Informed.
                </TypoGraphy>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    )
  }
