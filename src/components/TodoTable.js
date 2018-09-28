import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

export default class TodoTable extends Component {
  state = {
    row: [],
    description: '',
    done: true,
    createdAt: '',
    _id: '',
    open: false,
    multiline: 'Controlled',
    vertical: 'top',
    horizontal: 'center',
  };
  
  updateTable(){
    axios.get(`https://todowebservice.herokuapp.com/api/todos`).then(res => {
      this.setState({ row: res.data });
    });
  }

  componentDidMount(){
    this.updateTable();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  edit = (row) => {
    axios.put(`https://todowebservice.herokuapp.com/api/todos/${row._id}`,
    { description: this.state.description, done: this.state.done, _id: this.state._id })
      .then(res => {
      });
  }
  
  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  delete = (row) => {
    this.handleClick({ vertical: 'top', horizontal: 'left' });
    axios.delete(`https://todowebservice.herokuapp.com/api/todos/${row._id}`)
      .then(res => {
        this.updateTable();
      });
  }


  handleSubmit = event => {
    event.preventDefault();
  }
  
  render() { 
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell padding="checkbox">Date of Creation</TableCell>
                <TableCell>Done</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.row.map(row => {
                return (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>
                      <Checkbox 
                        color="primary" 
                        checked={row.done} 
                        value="done"
                      />
                    </TableCell>
                    <TableCell padding="checkbox"> {row.actions}
                      <IconButton type="submit" onClick={this.handleClickOpen} color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">Edit To-do </DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Edit Description/To-do"
                            rowsMax="8"
                            multiline
                            type="text"
                          />{row.description}
                          <Checkbox 
                            checked={row.done}
                            value="done"
                            style={{ margin: 20 }} 
                            color="primary" 
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose} color="secondary">
                            Cancel
                          </Button>
                          <Button type="submit" onClick={() => {this.edit(row)}} color="primary">
                            Submit
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <IconButton type="submit" onClick={() => {this.delete(row)}} color="primary">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={this.handleClose}
                        ContentProps={{
                          'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Action was completed successfully!</span>}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </form>
      </div>
    );
  }
}