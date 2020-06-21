import  React, { Component } from  'react';
import  IssuesService  from  './IssuesService';
import  CommonService from './common';
import Grid from '@material-ui/core/Grid';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
// import InputField from './components/InputField';
// import DatePicker from './components/DatePicker';
import Typography from '@material-ui/core/Typography';

import TextArea from "components/TextArea";
// import Button from "components/Button";

import Paper from '@material-ui/core/Paper';
// import clsx from 'clsx';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import Chip from '@material-ui/core/Chip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
// import Modal from '@material-ui/core/Modal';
import  FormTableRow  from  './components/FormTableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import 'date-fns';
import IssueParams from './containers/IssueParams';
import Description from './containers/Description';

import AccocTable from './containers/Associations';


const useStyles = theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '25ch',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    flexGrow: 1,
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 450,
      fontSize: 10,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(10),
      color: theme.palette.text.secondary,
    },
    table: {
      fontSize: theme.typography.pxToRem(5),
    }
  });


const issuesService = new IssuesService();
const commonService = new CommonService();

class Issue extends Component {
    
    constructor(props) {
        super(props);
        this.state  = {
            issueData: [],
            allUsers: [],
            showSubmit: false,
            isModalOpen: false,
            allComments: [],
            newComment: [],
            allTrackers: [],
            allProjects: [],
            allStatuses: [],
            allPriorities: [],
            informedUsers: [],
            personName: [],
            open: false
        };
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmitDescription = this.handleSubmitDescription.bind(this);
        this.handleModifyComment = this.handleModifyComment.bind(this);

        this.handleChangeAddComment = this.handleChangeAddComment.bind(this);

        this.handleChangeSingleSelect = this.handleChangeSingleSelect.bind(this);
        this.handleChangeMultipleSelect = this.handleChangeMultipleSelect.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
      }
    
    componentDidMount() {
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
            issuesService.getIssue(params.pk).then((result) => {
                this.setState({ issueData:  result});
                this.setState({allComments: result.comments});
                this.setState({informedUsers: result.inform});
                this.setState({personName: result.inform?.map(user => user.pk)});
         })
        };
        issuesService.getUsers().then((result) => {
          this.setState({allUsers: result})
        });
        issuesService.getTrackers().then((result) => {
          this.setState({allTrackers: result})
        });
        issuesService.getProjects().then((result) => {
          this.setState({allProjects: result})
        });
        issuesService.getStatuses().then((result) => {
          this.setState({allStatuses: result})
        });
        issuesService.getPriority().then((result) => {
          this.setState({allPriorities: result})
        });
    }
    
   
    handleTextArea(e, field) {
      let value = e.target.value;
      this.setState(
        prevState => ({
          issueData: {
            ...prevState.issueData,
            [field]: value
          }
        }),
        this.setState({showSubmit: true})
      );
    }


    handleChangeAddComment(e) {
      let value = e.target.value;
      this.setState(
        prevState => ({
          newComment: {
            ...prevState.newComment,
            text: value,
            issue: this.props.match.params.pk,
          }
        }),
      );
      console.log(this.state.newComment)
    }


    handleChangeSingleSelect(e, fieldName) {
      let value = e.target.value;
      let name = e.target.name;
      this.setState(prevState => ({
        issueData: {
          ...prevState.issueData,             
          [fieldName]: {                          
            ...prevState.issueData.fieldName,   
            pk: value                         
          }
        }
      }),
      );
      this.setState({showSubmit: true});
    }

    handleChangeMultipleSelect(e) {
      const inform = []
      let value = e.target.value;
        
      this.setState(
        prevState => ({
          personName: value}));


      for (let i = 0; i < value.length; i++) {
        this.state.allUsers.forEach(user => {
          if (user.pk === value[i]) {
            inform.push({"pk": user.pk})
            }
          });
      }

      this.setState(
        prevState => ({
          issueData: {
            ...prevState.issueData,
            inform: inform,
          }
        })
      );

      this.setState({showSubmit: true});
    };


    handleChangeComment(e, index, pk) {

      let value = e.target.value;
      let name = e.target.name;

      this.setState(prevState => ({
        allComments: prevState.allComments.map(
        obj => (obj.pk === pk ? Object.assign(obj, { text: value }) : obj)
      )
      }));
      this.setState(
        this.setState(
              prevState => ({
                ...prevState.issueData,
                  comments: this.state.allComments
              })
      ));
      console.log(this.state.issueData);
    }


    handleDateChange(date) {
      let newDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      this.setState(prevState => ({
        issueData: {
          ...prevState.issueData,
          due_date: newDate
        }
      }));
      this.setState({showSubmit: true});
    }


    handleSubmitDescription(e) {
      e.preventDefault();
      let issueData = this.state.issueData;
  
      issuesService.updateIssue(issueData).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
    }

    handleDelete(e) {
      e.preventDefault();
      console.log(e);
      let issueData = this.state.issueData;
  
      issuesService.deleteComment(issueData).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
    }


    handleModifyComment(e, pk) {
      e.preventDefault();
      let issueData = this.state.issueData;
  
      issuesService.updateIssue(issueData).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
    }


    handleCreateComment(e, pk) {
      e.preventDefault();
      let newComment = this.state.newComment;

      issuesService.createComment(newComment).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
    }


    handleDeleteComment(e, pk) {
      e.preventDefault();
      console.log(e);
      issuesService.deleteComment(pk).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
    }
  
    handleDeleteAssoc(e, pk) {
      e.preventDefault();
      console.log(e);
      issuesService.deleteComment(pk).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
    }

    getNameField = (pk, array) => {
      array.forEach((item) => {
          if (item.pk === pk) {
            return item.username;
          }
          });
      }

    dateFormat = (date) => {
      const newDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      return newDate;
    }

    render() {

        const { classes } = this.props;
        const users = this.state.allUsers;

        const showSubmit = this.state.showSubmit;
        const field = 'username';

        const comments = this.state.allComments;

        let button;

        if (showSubmit) {
            button = <React.Fragment>
            <Button
              type={"default"}
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={(e) => this.handleSubmitDescription(e)}
            >Save
            </Button>
          </React.Fragment>;
          } 

          const names = this.state.allUsers?.map(val => val.username);

          const personName = this.state.personName;
          
          const rawDate = new Date(this.state.issueData.created);
        
          const created = this.dateFormat(rawDate);

          const issueAssoc = this.state.issueData.association;

          let assoc;

          if (issueAssoc?.length > 0) {
            assoc = <React.Fragment>
              <div>
                <Grid item xs={7}>
                  <AccocTable
                    rows={issueAssoc}


                  />
                </Grid>
              </div>
            </React.Fragment>
          }
          else {
            assoc = <React.Fragment><Typography>There is no associations</Typography></React.Fragment> 
          }

          
        return (
            <div style={{marginLeft: 15 + 'em'}}>
              
  

              <IssueParams
                // common
                formControl={classes.formControl}
                title={this.state.issueData.title}
                handleChangeTitle={e => this.handleTextArea(e, 'title')}

                trackerPk={Number(this.state.issueData.tracker?.pk)}
                handleChangeTracker={(e) => this.handleChangeSingleSelect(e, 'tracker')}
                allTrackers={this.state.allTrackers}

                projectPk={Number(this.state.issueData.project?.pk)}
                handleChangeProject={(e) => this.handleChangeSingleSelect(e, 'project')}
                allProjects={this.state.allProjects}

                statusPk={Number(this.state.issueData.status?.pk)}
                handleChangeStatus={(e) => this.handleChangeSingleSelect(e, 'status')}
                allStatuses={this.state.allStatuses}

                priorityPk={Number(this.state.issueData.priority?.pk)}
                handleChangePriority={(e) => this.handleChangeSingleSelect(e, 'priority')}
                allPriorities={this.state.allPriorities}

                assignedPk={Number(this.state.issueData.assigned_to?.pk)}
                handleChangeAssignee={(e) => this.handleChangeSingleSelect(e, 'assigned_to')}
                allUsers={this.state.allUsers}

                submittedPk={Number(this.state.issueData.submitted_by?.pk)}
                submittedUsername={this.state.issueData.submitted_by?.username}
                created={created}

                personName={personName}
                handleChangeInform={(e) => this.handleChangeMultipleSelect(e)}
                allUsers={this.state.allUsers}

                dueDate={this.state.issueData.due_date}
                handleDateChangeDueDate={e => this.handleDateChange(e)}
              />

  
              <Description
                title={"Description"}
                rows={5}
                data={this.state.issueData.descr}
                handleChange={e => this.handleTextArea(e, 'descr')}
                placeholder={"Describe your task here"}
              />
              
             {/* Save Button shows only when some element changed */}
              <div>
                {button}
              </div>


              <Grid item xs={12} style={{marginTop: 10, marginBottom: 10}}>
                <div>
                <Button
                  size="small"
                  variant="contained"
                  color="default"
                  startIcon={<AddIcon />}
                >
                  Link Issue
                </Button>
                
                </div>
                { assoc }
              </Grid>

              

              <div style={{ marginTop: 1 + 'em'}}>
                <Grid item xs={7}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                    >
                      <div >
                        <Typography className={classes.heading}>Add comment</Typography>
                      </div>
                     
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails >
                      <Grid item xs={12}>
                        <TextArea
                          title={"Comment"}
                          rows={6}
                          value={""}
                          name={"addCommentField"}
                          value={this.state.newComment.text}
                          handleChange={this.handleChangeAddComment}
                          placeholder={"your comment here"}
                          allignJustify
                        />
                      </Grid>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                      <Button size="small">Clear</Button>
                      <Button size="small" color="primary"
                        onClick={(e) => this.handleCreateComment(e)}
                      >
                        Save
                      </Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                  </Grid>
              </div>              

              <div>
                <Grid item xs={10} style={{marginTop: 3 + 'em'}}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="commentsTable">
                      <TableBody>                        
                        {comments?.map((com, index, username) => (
                          <FormTableRow key={com.pk}
                            submitter={com.submitted_by.username}
                            created={this.dateFormat(new Date(com.created))}
                            pk={com.pk.toString()}
                            text={com.text}
                            handleChange={e => this.handleChangeComment(e, index, com.pk)}
                            handleSubmit={(e) => this.handleModifyComment(e, com.pk)}
                            handleDelete={(e) => this.handleDeleteComment(e, com.pk)}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </div>
            </div>
        );
        }

};

export default withStyles(useStyles, { withTheme: true })(Issue);

