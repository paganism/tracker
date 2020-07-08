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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Input from '@material-ui/core/Input';

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


const useStyles = theme => ({

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
});


class IssuesList extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            issues: [],
            count: [],
            page: 0,
            rowsPerPage: 10,
            searchQuery: "",
            allUsers: [],
            allTrackers: [],
            allProjects: [],
            allStatuses: [],
            searchFields: {assigned: "", submitted: "", status: [], tracker: "", project: ""},
        };
        this.handleDelete  =  this.handleDelete.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }


  componentDidMount() {
    var  self  =  this;
    issuesService.getIssues().then(function (result) {

        self.setState({ issues:  result.results, count: result.count})
    });
    issuesService.getUsers().then((result) => {
      this.setState({allUsers: result})
    });
    issuesService.getTrackers().then((result) => {
      this.setState({allTrackers: result})
    });
    issuesService.getProjects().then((result) => {
      this.setState({allProjects: result.data.results})
    });
    issuesService.getStatuses().then((result) => {
      this.setState({allStatuses: result})
    });
}

    handleDelete = (e,pk) => {
      e.preventDefault();
      issuesService.deleteIssue({ pk: pk}).then(() => {window.location.assign(`/issues/`)});
    }

    handleChangePage = (event, newPage) => {
        let pageSize = this.state.rowsPerPage;
        this.setState({page: newPage})
        issuesService.getIssues(newPage, pageSize, this.state.searchQuery, this.state.searchFields).then((result) => {
            console.log(result)
            this.setState({ issues: result.results, count: result.count})
        });
    }


    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10), 
            page: 0}, () => this.handleChangePage(event, this.state.page, this.state.searchQuery, this.state.searchFields))
    }

    handleChangeSearch = (event) => {
      let search = event.target.value;
      let page = this.state.page
      let pageSize = this.state.rowsPerPage
      let searchFields = this.state.searchFields
      this.setState(
        prevState => ({searchQuery: search}));

      issuesService.getIssues(page, pageSize, search, searchFields).then((result) => {
        this.setState({ issues: result.results, count: result.count})
    });
    }

    handleChangeSearchNoGlobal = (event, searchFields) => {
      let page = this.state.page
      let pageSize = this.state.rowsPerPage
      
      issuesService.getIssues(page, pageSize, this.state.searchQuery, searchFields).then((result) => {
        console.log(result)
        this.setState({ issues: result.results, count: result.count})
    });
    }

    handleChangeSingleSelect(e, fieldName) {
      let value = e.target.value;
      let name = e.target.name;

      this.setState(prevState => ({
        searchFields: {
          ...prevState.searchFields,             
          [fieldName]: value                    
          }
        }),
        () => this.handleChangeSearchNoGlobal(e, this.state.searchFields)
      );
    }

    handleClearAllFilters(e) {
      this.setState(prevState => ({
        searchFields: {
          ...prevState.searchFields,             
          assigned: "",
          submitted: "",
          status: [],
          tracker: "",
          project: ""                    
          }
        }), )
      this.setState({page: 0})
      this.setState({searchQuery: ""}, () => this.handleChangeSearchNoGlobal(e, this.state.searchFields))
    }

    handleChangeMultipleSelect(e, fieldName) {
      let value = e.target.value;
        
      this.setState(prevState => ({
        searchFields: {
          ...prevState.searchFields,             
          [fieldName]: value                    
          }
        }),
        () => this.handleChangeSearchNoGlobal(e, this.state.searchFields)
      )
      
      console.log(value);
      console.log(this.state.searchFields?.status);
    };


  render() {
      const { classes } = this.props;

    return (
      <div>
        <SideBar/>
        <Grid container item xs={10} spacing={2} style={{marginTop: 3 + 'em', marginLeft: 15 + 'em'}}>
              <TextField
                label="Search"
                variant="outlined"
                value={this.state.searchQuery}
                fullWidth
                onChange={e => this.handleChangeSearch(e)}
              />

                <FormControl className={classes.formControl}>
                  <InputLabel>Assignee</InputLabel>
                  <Select
                    value={this.state.searchFields.assigned}
                    onChange={(e) => this.handleChangeSingleSelect(e, 'assigned')}
                    autoWidth
                  >
                  {this.state.allUsers?.map((assigned) => (
                    <MenuItem key={assigned.pk} value={assigned.username}>{assigned.username}</MenuItem>
                  ))}
                  <MenuItem key="" value="">all</MenuItem>
                    
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel>Submitter</InputLabel>
                  <Select
                    value={this.state.searchFields.submitted}
                    onChange={(e) => this.handleChangeSingleSelect(e, 'submitted')}
                    autoWidth
                  >
                  {this.state.allUsers?.map((submitted) => (
                  <MenuItem key={submitted.pk} value={submitted.username}>{submitted.username}</MenuItem>
                    ))}
                  <MenuItem key="" value="">all</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel>Tracker</InputLabel>
                  <Select
                    value={this.state.searchFields.tracker}
                    onChange={(e) => this.handleChangeSingleSelect(e, 'tracker')}
                    autoWidth
                  >
                  {this.state.allTrackers?.map((tracker) => (
                  <MenuItem key={tracker.pk} value={tracker.title}>{tracker.title}</MenuItem>
                    ))}
                  <MenuItem key="" value="">all</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel>Project</InputLabel>
                  <Select
                    value={this.state.searchFields.project}
                    onChange={(e) => this.handleChangeSingleSelect(e, 'project')}
                    autoWidth
                  >
                  {this.state.allProjects?.map((project) => (
                  <MenuItem key={project.pk} value={project.projectname}>{project.projectname}</MenuItem>
                    ))}
                  <MenuItem key="" value="">all</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel>Status</InputLabel>
                    <Select
                      multiple
                      value={this.state.searchFields.status}
                      onChange={(e) => this.handleChangeMultipleSelect(e, 'status')}
                      input={<Input />}
                      autoWidth
                    >
                      {this.state.allStatuses?.map((status) => (
                      <MenuItem key={status.pk} value={status.statusname}>{status.statusname}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <IconButton 
                  aria-label="clear-button"
                  aria-controls="clear-button"
                  id="clear-button"
                  aria-describedby="save-button"
                  onClick={e => this.handleClearAllFilters(e)}
                >
                  <BackspaceIcon fontSize="large"/>
                </IconButton>
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

export default withStyles(useStyles, { withTheme: true })(IssuesList);