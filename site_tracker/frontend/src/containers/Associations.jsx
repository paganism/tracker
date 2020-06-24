import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modalRoot: {
    backgroundColor: "transparent",
    color: "inherit",
  },
});


export default function AccocTable(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
      e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Summary</TableCell>
            <TableCell align="right">Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.pk}>
              <TableCell component="th" scope="row">
                <Link 
                    color={"textPrimary"}
                    href={`/issues/${row.pk}`}>
                    [# {row.pk}]
                </Link>
              </TableCell>
              <TableCell align="left">
                <Link
                    color={"textPrimary"} 
                    href={`/issues/${row.pk}`}>
                    {row.title} [# {row.pk}]
                </Link>
              </TableCell>
              <TableCell align="right">{row.status.statusname}</TableCell>
              <TableCell>
              
                <IconButton 
                  size={"small"}
                  onClick={e => props.handleDelete(e, row.pk)}
                >
                  <DeleteIcon fontSize={"small"}/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
