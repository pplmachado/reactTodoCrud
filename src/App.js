import React, { Component } from 'react';
import TodoTable from'./components/TodoTable';
import TodoForm from'./components/TodoForm';
import Loading from'./components/Loading';

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }
  render() {
    const { loading } = this.state;
    if(loading) { 
      return <Loading />;
    }
    return (
      <div className="App">
        <TodoForm />
        <TodoTable />
      </div>
    );
  }
}
export default App;