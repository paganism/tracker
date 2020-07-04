import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SideBar from '../Side';


const useStyles = makeStyles({
  root: {
    minWidth: 220,
    maxWidth: 220,
    marginTop: 50,
    marginLeft: 15 + 'em',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProjectList() {
  const classes = useStyles();

  return (
    <div>
      <SideBar/>
      <Card className={classes.root}>
        <CardContent>

          <Typography variant="h5" component="h2">
            projectName
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            shord description of project
            <br />
            {'"this proj about"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    </div>
  );
}