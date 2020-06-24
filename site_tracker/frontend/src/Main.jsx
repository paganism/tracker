import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AuthService from 'AuthService';

const authService = new AuthService();


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    
    },
  }));



export default function Main() {
  const classes = useStyles();

  authService.isAuth().then((result) => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  });
 
 
      return (
        <div >
            <div class="jumbotron">
              <h1>Track your tasks</h1>
            </div>
            <div className="classes.root">
              <h2>Track your tasks. Stay informed.</h2>
            </div>
            <div>
              <Button variant="contained" color="primary" href='/login'>
                Start Tracking
              </Button>
              
            </div>
        </div>
      );
}
