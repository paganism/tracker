import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 3 + 'em',
  },
  paragraph: {
    fontSize: 35
  }
}));

export default function NotFound() {

const classes = useStyles();

  return (
        <div className={classes.root}>
          <div>
            <h1>404!</h1>
            <p className={classes.paragraph}>Page not found</p>
          </div>
        </div>
  )
};
