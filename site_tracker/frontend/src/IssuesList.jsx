import React, { Component } from  'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import IssuesService  from  './IssuesService';
import SideBar from './Side';


const  issuesService  =  new  IssuesService();


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


class IssuesList extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            issues: [],
            nextPageURL:  '',
            count: [],
            page: 1,
            rowsPerPage: 10,
            searchField: "",
            searchQuery: "",
        };
        this.handleDelete  =  this.handleDelete.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }


  componentDidMount() {
    var  self  =  this;
    issuesService.getIssues().then(function (result) {

        self.setState({ issues:  result.results, nextPageURL:  result.next, count: result.count})
    });
}

    handleDelete = (e,pk) => {
      e.preventDefault();
      issuesService.deleteIssue({ pk: pk}).then(() => {window.location.assign(`/issues/`)});
    }

    handleChangePage = (event, newPage) => {
        let pageSize = this.state.rowsPerPage;
        this.setState({page: newPage})
        issuesService.getIssues(newPage, pageSize).then((result) => {
            console.log(result)
            this.setState({ issues: result.results, count: result.count})
        });
    }


    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10), 
            page: 0}, () => this.handleChangePage(event, this.state.page+1))
    }

    handleChangeSearch = (event) => {
      let search = event.target.value;
      let searchFields = this.state.searchField;
      let page = this.state.page
      let pageSize = this.state.rowsPerPage
      this.setState(
        prevState => ({
          searchQuery: search}));
          console.log(this.state.searchQuery);

      issuesService.getIssues(page, pageSize, search).then((result) => {
        console.log(result)
        this.setState({ issues: result.results, count: result.count})
    });
    }

  render() {
      const { classes } = this.props;
      console.log("page");
      console.log(this.state.page);
    return (
      <div>
        <SideBar/>
        <Grid container item xs={10} spacing={1} style={{marginTop: 3 + 'em', marginLeft: 15 + 'em'}}>
          <Grid item xs={3}> 
            <TextField
              label="Search"
              variant="outlined"
              value={this.state.searchQuery}
              fullWidth
              onChange={e => this.handleChangeSearch(e)}
            />
          </Grid>
        </Grid>
          <Grid item xs={10}>
          <TableContainer style={{ marginLeft: 15 + 'em', marginTop: 3 + 'em' }} component={Paper}>
            <Table className="classes.table" aria-label="customized table">
              <TableHead>
                <TableRow>

                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="right">Tracker</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Summary</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Project</StyledTableCell>
                  <StyledTableCell align="center">Assignee</StyledTableCell>
                  <StyledTableCell align="center">Submitter</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>


              {this.state.issues.map( c  =>
              
                  <StyledTableRow key={c.pk}>
                    <StyledTableCell component="th" scope="row">
                      <Link color={"textPrimary"} href={"/issues/" + c.pk}>[#{c.pk}]</Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">{c.tracker.title}</StyledTableCell>
                    <StyledTableCell align="left"><Link color={"textPrimary"} href={"/issues/" + c.pk}>{c.title}</Link></StyledTableCell>
                    <StyledTableCell align="left">{c.descr}</StyledTableCell>
                    <StyledTableCell align="center">{c.status.statusname}</StyledTableCell>
                    <StyledTableCell align="center">{c.project.projectname}</StyledTableCell>
                    <StyledTableCell align="center">{c.assigned_to.username}</StyledTableCell>
                    <StyledTableCell align="center">{c.submitted_by.username}</StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton aria-label="delete" onClick={(e)=>  this.handleDelete(e, c.pk) }>
                        <DeleteIcon />
                      </IconButton>
                      </StyledTableCell>
                  </StyledTableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={this.state.count}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
        </Grid>
    </div>
    );
    
  }
};

export default IssuesList //withStyles( { withTheme: true })(IssuesList);