import  React, { Component } from  'react';
import  IssuesService  from  './IssuesService';
import  CommonService from './common';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import 'date-fns';
import IssueParams from './containers/IssueParams';
import Description from './containers/Description';
import { Redirect } from 'react-router-dom';

import DialogWindow from './components/DialogWindow';


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
      minWidth: 650,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(10),
      color: theme.palette.text.secondary,
    },
    table: {
      fontSize: theme.typography.pxToRem(10),
    }
  });


const issuesService = new IssuesService();
const commonService = new CommonService();

class CreateIssue extends Component {
    
    constructor(props) {
        super(props);
        this.state  = {
            issueData: {
              "title": "",
              "descr": "",
              "status": {
                  "pk": 0,
                  "statusname": "--"
              },
              "assigned_to": {
                  "pk": 0,
                  "username": "not set"
              },
              "project": {
                  "pk": 0,
                  "projectname": "--",
                  "descr": "Не задан"
              },
              "priority": {
                  "pk": 0,
                  "priorityname": "--"
              },
              "tracker": {
                  "pk": 0,
                  "title": "--"
              },
              "inform": [
                  
              ],
              "submitted_by": {
                  "pk": "",
                  "username": "not set"
                  
              },
              "spent_time": 0,
              "association": [],
              "comments": [
                  
              ],
              "due_date": this.dateFormat(new Date)
          },
            allUsers: [],
            showSubmit: false,
            allTrackers: [],
            allProjects: [],
            allStatuses: [],
            allPriorities: [],
            personName: [],
            showError: false,
            redirect: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSingleSelect = this.handleChangeSingleSelect.bind(this);
        this.handleChangeMultipleSelect = this.handleChangeMultipleSelect.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose =this.handleClose.bind(this);
      }
    
    componentDidMount() {
        const { match: { params } } = this.props;

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

    
    handleChangeSingleSelect(e, fieldName) {
      let value = e.target.value;
      let name = e.target.name;
      console.log('VALUE');
      console.log(value);
      console.log(this.state.issueData);
      console.log();
      this.setState(prevState => ({
        issueData: {
          ...prevState.issueData,             
          [fieldName]: {                          
            ...prevState.issueData.fieldName,   
            pk: value                         
          }
        }
      }),
      () => console.log(this.state.issueData)
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


    handleSubmit(e) {
      e.preventDefault();
      let issueData = this.state.issueData;

      if (!issueData.title) {
        this.setState({showError: true})
      }
  
      issuesService.createIssue(issueData).then((result) => {
        console.log('result')
        console.log(result.pk)
        this.setState({redirect: result.pk})
      }
      );
    }

    handleClickOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    }

    dateFormat = (date) => {
      const newDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      return newDate;
    }

    render() {

        const { classes } = this.props;
        const users = this.state.allUsers;

        const showSubmit = this.state.showSubmit;

        const showError = this.state.showError;

        let errorMessage;
        if (showError) {
          errorMessage = <React.Fragment>
            <div style={{color: "red"}}>incorrect title</div>
          </React.Fragment>
        }

        let button;

        if (showSubmit) {
            button = <React.Fragment>
            <Button
            type={"default"}
            variant="contained"
            size="small"
            startIcon={<SaveIcon />}
            onClick={(e) => this.handleClickOpen(e)}
            // onClick={(e) => this.handleSubmit(e)}
          >Save
          </Button>

          </React.Fragment>;
          } 

          const names = this.state.allUsers?.map(val => val.username);

          const personName = this.state.personName;
          

        const defaultValue = 0;

        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to={`/issues/${redirect}`}/>;
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
                {errorMessage}
              </div>
              {/* Delete confirmation */}
              <DialogWindow 
                open={this.state.open}
                handleClose={this.handleClose}
                text="Are you shure?"
                handleSubmit={(e) => this.handleSubmit(e)}
              />
              {/* <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={(e) => this.handleSubmit(e)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
            </div>
        );
        }

}

export default withStyles(useStyles, { withTheme: true })(CreateIssue);

