import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
// import { Route } from 'react-router-dom'
import Route from "react-router-dom/Route";

import  Main from './Main';
import './App.css';
import IssuesList from './IssuesList';
import PrivateRoute from './PrivateRoute';
import CustomizedTables from './List';
import Issue from './Issue';
import CreateIssue from './CreateIssue';

import ClippedDrawer from 'components/SideBar.js';
import LoginPage from "LoginPage";
import Footer from 'components/Footer';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';



const BaseLayout = () => (
  <div className="container-fluid">

  <ClippedDrawer />
    <div className="content">
      <Switch>
        <Route path="/" exact component={Main} />
        <PrivateRoute path="/issues" exact component={CustomizedTables} />
        {/* <Route path="/issues" exact component={CustomizedTables} /> */}
        {/* <Route path="/issues/:pk" exact component={Issue} /> */}
        <PrivateRoute path="/issues/:pk" exact component={Issue} />
        <PrivateRoute path="/issue/create" exact component={CreateIssue} />
        <Route path="/login" component={LoginPage} />


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

          <BaseLayout/>
          <Footer/>
      </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
