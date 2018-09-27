import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

export default class TodoForm extends Component {
  state = {
    row: [],
    description: '',
    done: true,
    createdAt: '',
    _id: '',
    multiline: 'Controlled',
    open: false,
    vertical: 'top',
    horizontal: 'center',
  };

  handleChangeA = description => event => {
    this.setState({ [description]: event.target.value });
  };

  handleChange = done => event => {
    this.setState({ [done]: event.target.checked });
  }; 

  handleSubmit = event => {
    event.preventDefault();
    // const todo = {
    //   description: this.state.description,
    //   done: this.state.done
    // };

    axios.post(`https://todowebservice.herokuapp.com/api/todos`,
     { description: this.state.description, done: this.state.done })
      .then(res => {
        this.refreshPage();
      });
    }

    handleClick = state => () => {
      this.setState({ open: true, ...state });
    };

    refreshPage(){
      window.location.reload();
    };

  render() {  
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Paper>
            <br />
            <Typography variant="title" color="primary">React Crud To-do List</Typography>
            <br />
            <TextField
              type="text"
              onChange={this.handleChangeA('description')}
              value={this.state.description}
              name="description"
              label="Add Description/To-do"
              multiline
              rowsMax="8"
              margin="normal"
              variant="outlined"
              style={{ margin: 20 }}
              />
              <Checkbox 
                checked={this.state.done} 
                onChange={this.handleChange('done')} 
                value="done"
                style={{ margin: 20 }} 
                color="primary" 
              />
              <Button type="submit" onClick={this.handleClick({ vertical: 'top', horizontal: 'left' })} variant="fab" mini color="secondary">
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Action was completed successfully!</span>}
              />
                <AddIcon />
              </Button>
            </Paper>
          </form>  
        </div>
    );
  }
}        