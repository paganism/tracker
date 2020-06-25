import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import  AuthService  from  './AuthService';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';



const authService = new AuthService();

const useStyles = theme => ({
  root: {
     height: '80vh',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  picture: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
});


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false,
      formValid: false,
      showError: false,
      login: false,
      isAuth: false,

    }

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  componentDidMount() {
    
    authService.isAuth().then((result) => {
      if (result.data === "true") {
        this.setState({isAuth: result.data})
      }
    }).catch(error => {
    });
  }

  handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });

    this.setState({showError: false});
  }

  onSubmit(e) {
    e.preventDefault();
      let email = this.state.email;
      let password = this.state.password;
      authService.login(email, password).then((response) => {
        if (response.status === 200) {
          localStorage.setItem("login", JSON.stringify({
            login: true,
            token: response.data.token,
          }));
          this.setState({login: true});
        }
        if (typeof response.status === "undefined") {
          this.setState({showError: true})
        }
        else {
          this.setState({showError: false})
        }
        console.log(response);
      })
  }

  validateField(field, value) {
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(field) {

      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;

      case 'password':
        passwordValid = value.length >= 6;
        break;

      default:
        break;
    }
    this.setState({
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }


  render() {
    const { classes } = this.props;
    if (this.state.isAuth) {
      return <Redirect to={`/issues/`}/>; 
    }

    const disableSubmit = this.state.formValid ? false : true

    const showError = this.state.showError;

    let errorMessage;
    if (showError) {
      errorMessage = <React.Fragment>
        <div style={{color: "red"}}>incorrect email/password</div>
      </React.Fragment>
    };

    if (this.state.login) {
      return <Redirect to={`/issues/`}/>;
    }

    return(
          <Grid container component="main" className={classes.root}>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.picture}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In to Tracker
              </Typography>
              <form 
                className={classes.form} 
                onSubmit={this.onSubmit} 
                
                >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleInput}
                  
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.password}
                  onChange={this.handleInput}
                />
                <Button
                  disabled={disableSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>

                {errorMessage}

              </form>
            </div>
          </Grid>
        </Grid>
    )
  }
}


export default withStyles(useStyles, { withTheme: true })(LoginPage);
