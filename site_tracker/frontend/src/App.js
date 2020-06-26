import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from "react-router-dom/Route";

import  Main from './Main';
import './App.css';
import IssuesList from './IssuesList';
import PrivateRoute from './PrivateRoute';
import Issue from './Issue';
import CreateIssue from './CreateIssue';
import NavBar from 'components/NavBar.js';
import LoginPage from "LoginPage";
import Footer from 'components/Footer';
import NotFound from './containers/404';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const BaseLayout = () => (
  <div className="container-fluid">

    <div className="content">
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" exact component={Main} />
        <PrivateRoute path="/issues" exact component={IssuesList} />
        <PrivateRoute path="/issues/:pk" exact component={Issue} />
        <PrivateRoute path="/issue/create" exact component={CreateIssue} />
        <Route path="" component={NotFound} />
      </Switch>
    </div>
  </div>
)


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f44336",
    },
  },
});




class App extends Component {


  render() {
    
    return (
      <MuiThemeProvider theme={theme}>
        
      <BrowserRouter>
        <NavBar />
            <BaseLayout/>
            <Footer/>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
