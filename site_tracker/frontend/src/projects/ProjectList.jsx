import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SideBar from '../Side';
import IssuesService from '../IssuesService';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const issuesService = new IssuesService();

const useStyles = makeStyles({
  root: {
    minWidth: 220,
    maxWidth: 220,
    marginTop: 50,
    marginLeft: 15 + 'em',
  },
  title: {
    fontSize: 14,
  },
  search: {
    marginLeft: 15 + 'em',
    marginTop: 3 + 'em',
  },
});

export default function ProjectList() {
  const classes = useStyles();
  const [allProjects, setAllProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    issuesService.getProjects().then((result) => {
      setAllProjects(result.data.results)
    })
  }, [])

  const handleChangeSearch = (event) => {
    let search = event.target.value;
    //let pageSize = this.state.rowsPerPage
    //let searchFields = this.state.searchFields
    setSearchQuery(search);

    issuesService.getProjects(search).then((result) => {
      setAllProjects(result.data.results)
  });
  }

  return (
    
    <div>
      {console.log(allProjects)}
      <SideBar/>
      <Grid container item xs={10} spacing={1} >
          <TextField className={classes.search}
                label="Search"
                variant="outlined"
                value={searchQuery}
                fullWidth
                onChange={handleChangeSearch}
          />
      </Grid>
      <Grid container item xs={10} spacing={1} >
      {allProjects.map((project) => {
        if (project.pk >0) {
          return (

      <Card className={classes.root}>
        <CardContent>

          <Typography variant="h5" component="h2">
            {project.projectname}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          {project.descr}
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
      )}})}
      </Grid>
    </div>
  );
}