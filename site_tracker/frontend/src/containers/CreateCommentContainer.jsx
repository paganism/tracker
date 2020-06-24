import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextArea from "components/TextArea";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(14),
    },
  }));


export default function CreateComment(props) {
    const classes = useStyles();
  
    return (
  
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
                    value={props.newCommentText}
                    handleChange={props.handleChange}
                    placeholder={"your comment here"}
                    allignJustify
                    />
                </Grid>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                <Button 
                    size="small" 
                    color="primary"
                    variant="contained"
                    onClick={props.handleClick}
                >
                    Save
                </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </Grid>
      </div>              
    );
  };
  