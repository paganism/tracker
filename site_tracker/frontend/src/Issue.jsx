import  React, { Component, Children } from  'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import 'date-fns';

import  FormTableRow  from  './components/FormTableRow';
import DialogWindow from './components/DialogWindow';

import IssueParams from './containers/IssueParams';
import Description from './containers/Description';
import AccocTable from './containers/Associations';
import CreateComment from './containers/CreateCommentContainer';

import  IssuesService  from  './IssuesService';
import SideBar from './Side';
import Common from './common';


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

const errorMessages = {
  "comment": "comment is empty"
}

const issuesService = new IssuesService();
const common = new Common();

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
            open: false,
            assocInputValue: [],
            errorAssoc: false,
            emptyField: { "comment": false },
        };
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmitDescription = this.handleSubmitDescription.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);

        this.handleChangeAddComment = this.handleChangeAddComment.bind(this);
        this.handleDeleteAssoc = this.handleDeleteAssoc.bind(this);

        this.handleChangeSingleSelect = this.handleChangeSingleSelect.bind(this);
        this.handleChangeMultipleSelect = this.handleChangeMultipleSelect.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }
    
    componentDidMount() {
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
            issuesService.getIssue(params.pk).then((result) => {
              if (result.status === 200) {
                this.setState({ issueData:  result.data});
                this.setState({allComments: result.data.comments});
                this.setState({informedUsers: result.data.inform});
                this.setState({personName: result.data.inform?.map(user => user.pk)});
              }
              else {
                this.props.history.push(`/404`)
              }
                
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

    handleAddAssoc(e, fieldName) {
      e.preventDefault();
      const { match: { params } } = this.props;
      const value = this.state.assocInputValue;
      const ass = this.state.issueData.association;

      issuesService.getIssue(value).then((result) => {
          if(result.status === 200 ) {
            if (Number(result.data.pk) !== Number(this.props.match.params.pk)) {
              ass.push({ "pk": result.data.pk, "status": result.data.status })

              const issueData = this.state.issueData;
              issueData.association = ass;
              issuesService.updateIssue(issueData).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)})
          }
          else {
            this.setState({errorAssoc: true});
          }
        } else {
          this.setState({errorAssoc: true});
        }
      })
    }

    handleDeleteAssoc(e, pk) {
      let issueAssoc = this.state.issueData.association;

      issueAssoc.forEach(assoc => {
        if (Number(assoc.pk) === Number(pk)) {
          let index = issueAssoc.indexOf(assoc)
          issueAssoc.splice(index, 1)
        }
       })
       
       this.setState(
        prevState => ({
          issueData: {
            ...prevState.issueData,
            association: issueAssoc,
          }
        })
      );

      issuesService.updateIssue(this.state.issueData) //.then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)})
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
    }

    handleSubmitComment(e, pk) {
      e.preventDefault();
      let issueData = this.state.issueData;

      let comments = this.state.issueData?.comments;
      const texts = [];
      comments.forEach(com => {
        texts.push(com["text"])
        })

      console.log(texts);
      if(
        texts.some(common.checkIsEmpty)) 
        {
        this.setState(
          prevState => ({
            emptyField: {
              ...prevState.emptyField,
              comment: true,
            }
          })
        );
      }
      else {
        issuesService.updateIssue(issueData).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
      }
      
    }

    handleCreateComment(e, pk) {
      e.preventDefault();
      let newComment = this.state.newComment;

      if (!common.checkIsEmpty(newComment.text)) {
        issuesService.createComment(newComment).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
      } else {
        this.setState(
          prevState => ({
            emptyField: {
              ...prevState.emptyField,
              comment: true,
            }
          })
        );
      }
    }

    handleDeleteComment(e, pk) {
      e.preventDefault();
      issuesService.deleteComment(pk).then(() => {window.location.assign(`/issues/${this.props.match.params.pk}`)});
    }

    dateFormat = (date) => {
      const newDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      return newDate;
    }

    handleClose = (e) => {
      e.stopPropagation();
      let value = e.target.value;
      this.setState({isModalOpen: false});
    }

    handleClickOpen = () => {
      this.setState({isModalOpen: true});
    }

    render() {

        const { classes } = this.props;

        const showSubmit = this.state.showSubmit;

        const comments = this.state.allComments;

        let button;

        if (showSubmit) {
            button = <React.Fragment>
            <Button
              type={"default"}
              variant="contained"
              size="small"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={(e) => this.handleSubmitDescription(e)}
            >Save
            </Button>
          </React.Fragment>;
          } 

        const errorAssoc = this.state.errorAssoc;

        let errorMessage;

        if (errorAssoc) {
            errorMessage = <React.Fragment>
                              Wrong issue ID
                           </React.Fragment>;
          } ;
        
        const emptyField = this.state.emptyField
        // console.log('EEEEMMMPPTTTYY');
        // console.log(emptyField)
        let emptyComment;
        if (emptyField.comment) {
          emptyComment = <React.Fragment>
                          {errorMessages.comment}
                         </React.Fragment>;
        };
        
          const names = this.state.allUsers?.map(val => val.username);

          const personName = this.state.personName;
          
          const rawDate = new Date(this.state.issueData.created);
        
          const created = this.dateFormat(rawDate);

          const issueAssoc = this.state.issueData.association;

          let assoc;

          if (issueAssoc?.length > 0) {
            assoc = <React.Fragment>
              <div>
                <Grid item xs={7} style={{ marginTop: 10 }}>
                  <Typography>Associations</Typography>
                  <AccocTable 
                    rows={issueAssoc}
                    handleDelete={this.handleDeleteAssoc}
                  />
                </Grid>
              </div>
            </React.Fragment>
          }
          else {
            assoc = <React.Fragment><Typography style={{marginTop: 10}}>There is no associations yet</Typography></React.Fragment> 
          }

          
        return (

            <div style={{marginLeft: 15 + 'em'}}>
              <SideBar/>
  
              {/* Issue headers */}
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

              {/* Add association button */}
              <Grid item xs={12} style={{marginTop: 10, marginBottom: 20}}>
                <div>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={(e) => this.handleClickOpen(e)}
                >
                  Link Issue
                </Button>

                {/* Add association dialog */}
                <DialogWindow 
                    open={this.state.isModalOpen}
                    handleClose={e => this.handleClose(e)}
                    title="Add Association"
                    content={<FormControl >
                              <TextField 
                                label="Id Issue" 
                                variant="outlined"
                                type="number"
                                onChange={(e) => this.setState({ assocInputValue: e.target.value })} />
                            </FormControl>}
                    text={ errorMessage }
                    handleSubmit={e => this.handleAddAssoc(e)}
                  />
                </div>
                {/* Associations declared in var in render */}
                { assoc }
              </Grid>

              
              {/* Create comment expansion panel */}
              <CreateComment
                newCommentText={this.state.newComment.text}
                handleChange={this.handleChangeAddComment}
                handleClick={(e) => this.handleCreateComment(e)}
              />

              {emptyComment}


              {/* Comments table */}
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
                            handleSubmit={(e) => this.handleSubmitComment(e, com.pk)}
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

