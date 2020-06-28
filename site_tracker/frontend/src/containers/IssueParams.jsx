import  React, { Component } from  'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import 'date-fns';



const IssueParams = props => {
    return (
      <div>
          <Grid container item xs={8} style={{marginTop: 3 + 'em', marginLeft: 1 + 'em'}}>
            <Grid container item xs={12} component={Paper}>
              <TextField 
                  id="titleId"
                  fullWidth
                  value={props.title}
                  onChange={props.handleChangeTitle}
              />
            </Grid>
            <Typography style={{marginLeft: 1 + 'em'}}>{props.emptyTitle}</Typography>
          </Grid>
        
          <Grid container item xs={8} spacing={4} component={Paper} style={{marginTop: 3 + 'em', marginLeft: 1 + 'em'}}>
              
              <Grid container item xs={10} spacing={2} >   

                  <React.Fragment>
                      <Grid item xs={3}>
                          <FormControl className={props.formControl}>
                              <InputLabel>Tracker</InputLabel>
                                  <Select                                
                                  value={props.trackerPk}
                                  onChange={props.handleChangeTracker}
                                  autoWidth
                                  >
                                  {props.allTrackers?.map((tracker) => (
                                  <MenuItem key={tracker.pk} value={tracker.pk}>{tracker.title}</MenuItem>
                                  ))}
                              </Select>
                          </FormControl>
                          

                          <FormControl className={props.formControl}>
                            <InputLabel>Project</InputLabel>
                            <Select
                              value={props.projectPk}
                              onChange={props.handleChangeProject}
                              autoWidth
                            >
                            {props.allProjects?.map((project) => (
                              <MenuItem key={project.pk} value={project.pk}>{project.projectname}</MenuItem>
                            ))}
                              
                            </Select>
                          </FormControl>
                      </Grid>
                      
                      <Grid item xs={3}>
                          <FormControl className={props.formControl}>
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={props.statusPk}
                              onChange={props.handleChangeStatus}
                              autoWidth
                            >
                            {props.allStatuses?.map((status) => (
                              <MenuItem key={status.pk} value={status.pk}>{status.statusname}</MenuItem>
                            ))}
                              
                            </Select>
                          </FormControl>

                          <FormControl className={props.formControl}>
                            <InputLabel>Priority</InputLabel>
                            <Select
                              value={props.priorityPk}
                              onChange={props.handleChangePriority}
                              autoWidth
                            >
                            {props.allPriorities?.map((priority) => (
                              <MenuItem key={priority.pk} value={priority.pk}>{priority.priorityname}</MenuItem>
                            ))}
                            </Select>
                          </FormControl>
                      </Grid>

                      
                      
                      <Grid item xs={3}>
                          <FormControl className={props.formControl}>
                            <InputLabel>Assignee</InputLabel>
                            <Select
                              value={props.assignedPk}
                              onChange={props.handleChangeAssignee}
                              autoWidth
                            >
                            {props.allUsers?.map((assigned) => (
                              <MenuItem key={assigned.pk} value={assigned.pk}>{assigned.username}</MenuItem>
                            ))}
                              
                            </Select>
                          </FormControl>
                          <FormControl className={props.formControl}>
                            <InputLabel>Submitter</InputLabel>
                            <Select
                              value={props.submittedPk}
                              autoWidth
                            >
                              <MenuItem value={props.submittedPk}>{props.submittedUsername}</MenuItem>                        
                            </Select>
                          </FormControl>
                          <Typography>{props.created}</Typography>
                          
                        </Grid>
                        
                        <Grid item xs={3}>
                          <FormControl className={props.formControl}>
                            <InputLabel>Inform</InputLabel>
                            <Select
                              multiple
                              value={props.personName}
                              onChange={props.handleChangeInform}
                              input={<Input />}
                              autoWidth
                            >
                              {props.allUsers?.map((name) => (
                                <MenuItem key={name.pk} value={name.pk}>{name.username}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                              <KeyboardDatePicker
                                // disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker"
                                label="due date"
                                value={props.dueDate}
                                onChange={props.handleDateChangeDueDate}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                            </Grid>
                          </MuiPickersUtilsProvider>
                        </Grid>
                  </React.Fragment>
              </Grid>
          </Grid>
        </div>
    );
};

export default IssueParams;