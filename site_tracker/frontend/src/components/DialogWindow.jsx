import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const DialogWindow = props => {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  } 

  return (
    <Dialog
        open={props.open}
        onClose={props.handleClose}
        BackdropProps={props.BackdropProps}
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          { props.content }
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            No
          </Button>
          <Button onClick={props.handleSubmit} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;