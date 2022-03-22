import React, { Component } from "react";
import './scss/style.scss'
import { connect } from 'react-redux'
import { putJob, addJob } from './redux/Action'

class TodoList extends Component {

  inputref = React.createRef();

  handleInput = (e) => {
    this.props.handlePutJob(e.target.value);
  }
  handleClickAdd = jobAdd => {
    this.props.handleAddJob(jobAdd);
    this.props.handlePutJob('');
    this.inputref.current.focus();
  }
  render() {
    const {jobs, job} = this.props;
    return (
  <div className="todoList">
    <div className="todo-box">
      <h1 className="title">To Do List</h1>
      <form onClick={e => e.preventDefault()}>
        <input id="user-input" type="text" placeholder="New task . . ." role="presentation" autoComplete="off"
        ref={this.inputref}
        value={job}
        onChange={this.handleInput} 
        />
        <button type="submit" className="btn" id="add-btn"
        onClick={() => this.handleClickAdd(job)}
        >
          <span className="material-icons">add</span>
        </button>
      </form>
      <hr />
      <div className="tasks">
        <div className={`message ${jobs.length > 0 ? '' : 'show'}`}>
          <p>There is no tasks to do!</p>
        </div>
          {jobs.map((job, index) => (
            <div className="task" key={index}>
            <div className="cta cta--small">
            <span className="material-icons icon star">arrow-top</span>
          </div>
          <input className="inputToDoList" type="text" value={job} disabled={true}/> 
          <div className="cta cta--big">
            <span className="material-icons icon heart">edit</span>               
            <span className="material-icons icon trash">delete</span>
          </div>
            </div>
          ))}                
      </div>
    </div>
  </div>
  );

  }
}

const mapStateToProps = state => ({
  job: state.reducer.job,
  jobs: state.reducer.jobs,
})
const mapDispatchToProps = dispatch => ({
  handlePutJob: value => {
    dispatch(putJob(value))
  },
  handleAddJob: value => {
    dispatch(addJob(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)