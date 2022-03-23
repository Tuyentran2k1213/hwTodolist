import React, { Component } from "react";
import './scss/style.scss'
import { connect } from 'react-redux'
import { putJob, addJob, deleJob, pushTopJob, editJob } from './redux/Action'

class TodoList extends Component {

  state = {
    isEdit: false,
    editValue: null,
  }

  inputref = React.createRef();

  handleEdit = (value) => {
    this.setState({
      isEdit: true,
      editValue: value,
    })
    this.props.handlePutJob(this.props.jobs[value]);
    this.inputref.current.focus();
  }

  handleClickUpdate = () => {
    this.props.handleEditJob({
      value: this.props.job,
      arr: this.state.editValue
    })
    this.props.handlePutJob('');
    this.setState({
    isEdit: false,
    editValue: null
  })
  }

  handleInput = (e) => {
    this.props.handlePutJob(e.target.value);
  }

  handleClickAdd = jobAdd => {
      if(this.props.job != ''){
        this.props.handleAddJob(jobAdd);
        this.props.handlePutJob('');
        this.inputref.current.focus();
      } else {
        alert('Bạn phải nhập công việc');
      }
  }

    static getDerivedStateFromProps(newProps, currentState){
    // console.log(newProps);
    // console.log(currentState);
    if(currentState.isEdit){
      console.log('oke Edit')
    }
      
    return true;
}

// shouldComponentUpdate(newProps, newState) {
//   //return true thì chạy tiết các lifeCycly còn lại, ngược lại return false sẽ không chạy các lifeCycle khác nữa
//   console.log(newProps);
//   console.log(newState);
//   return !newState.isEdit;
// }

  render() {
    const {jobs, job, handleDeleteJob, handlePushToTop} = this.props;
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
        
        {this.state.isEdit? <button type="submit" className="btn"
      style={{
        borderRadius: '40px',
        padding: '0px 10px',
      }}
       id="add-btn"
        onClick={this.handleClickUpdate}
        >
          <span className="material-icons">file_upload</span><span> Update  </span>
        </button> : <button type="submit" className="btn" id="add-btn"
        onClick={() => this.handleClickAdd(job)}
        >
          <span className="material-icons">add</span>
        </button>}
        {/* <button type="submit" className="btn" id="add-btn"
        onClick={() => this.handleClickAdd(job)}
        >
          <span className="material-icons">add</span>
        </button> */}
      </form>
      <hr />
      <div className="tasks">
        <div className={`message ${jobs.length > 0 ? '' : 'show'}`}>
          <p>There is no tasks to do!</p>
        </div>
          {jobs.map((job, index) => (
            <div className={`task ${this.state.isEdit && this.state.editValue === index && 'active'}`} key={index}>
            <div className="cta cta--small">
            <span className="material-icons icon star"
            onClick={() => {
              handlePushToTop(index);
              if(this.state.isEdit)
                this.setState({editValue: 0,});
            }}
            >arrow_upward</span>
          </div>
          <p>{job}</p>
          <div className="cta cta--big">
            <span className="material-icons icon heart"
            onClick={() => this.handleEdit(index)}
            >edit</span>               
            <span className="material-icons icon trash"
            onClick={() => {
              handleDeleteJob(index);
              if(this.state.isEdit)
                this.setState({isEdit: false})
                this.props.handlePutJob('');
            }}
            >delete</span>
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
  typeIn: state.reducer.typeIn,
})

const mapDispatchToProps = dispatch => ({
  handlePutJob: value => {
    dispatch(putJob(value))
  },
  handleAddJob: value => {
    dispatch(addJob(value))
  },
  handleDeleteJob: value => {
    dispatch(deleJob(value))
  },
  handlePushToTop: value => {
    dispatch(pushTopJob(value))
  },
  handleEditJob: value => {
    dispatch(editJob(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)