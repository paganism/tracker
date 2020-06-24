import  React, { Component } from  'react';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DialogWindow from '../components/DialogWindow';


class FormTableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false
      }

      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose = (e) => {
      e.stopPropagation();
      let value = e.target.value;
      this.setState({open: false});
    }

    handleClickOpen = () => {
      this.setState({open: true});
    }
      
    render() {
      const open = this.state.open
      console.log(this.state.open)
      return (
            <TableRow key={this.props.pk}>
              <TableCell style={{ maxWidth: "3px" }}>
              <Typography>
                {this.props.submitter}
              </Typography>
              <Typography>
                {this.props.created}
              </Typography>
              </TableCell>
              <TableCell >
                <TextField
                  multiline
                  fullWidth
                  name={this.props.pk}
                  onChange={e => this.props.handleChange(e, this.props.index, this.props.pk)}
                  value={this.props.text}
                />
                </TableCell>
              <TableCell style={{ maxWidth: "3px" }} align="right">
                <IconButton aria-label="save"
                  onClick={e => this.props.handleSubmit(e, this.props.pk)}
                >
                  <SaveIcon />                            
                </IconButton>
                <IconButton aria-label="delete"
                  onClick={(e) => this.handleClickOpen(e)}
                  // onClick={e => this.props.handleDelete(e, this.props.pk)}
                >
                  <DeleteIcon />
                  <DialogWindow 
                    open={this.state.open}
                    handleClose={e => this.handleClose(e)}
                    text="Delete this element?"
                    handleSubmit={e => this.props.handleDelete(e, this.props.pk)}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
      );
    }
};

export default FormTableRow;
