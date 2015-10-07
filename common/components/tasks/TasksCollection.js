import React           from 'react'
import Grid            from '../Grid'
import TaskView        from './TaskView'

import { Input, Modal, Button }
  from 'react-bootstrap'

const tasks = [
  {
    id          : 'tasks/1',
    description : 'Task #1'
  },
  {
    id          : 'tasks/2',
    description : 'Task #2'
  },
  {
    id          : 'tasks/3',
    description : 'Task #3'
  },
  {
    id          : 'tasks/4',
    description : 'Task #4'
  },
  {
    id          : 'tasks/5',
    description : 'Task #5'
  }
]

const TasksCollection = React.createClass({
  getInitialState() {
    return {
      task : null
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(task) {
    this.setState({task})
  },
  hideModal() {
    this.setState({
      task : null
    })
  },
  render() {
    const { task } = this.props
    return (
      <div>
        <Modal show={!!this.state.task} onHide={this.hideModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Task details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskView task={task} />
          </Modal.Body>
          <Modal.Footer>
            <Button block bsStyle='primary' onClick={this.hideModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <Input 
          placeholder     = 'Filter results' 
          onChange        = {this.handleFilterChange} 
          type            = 'text' />
        <Grid
          ref             = 'grid'
          data            = {tasks} 
          tableClassName  = 'table table-bordered'
          columns         = {['description']}
          filterColumns   = {['description']}
          labels          = {{
            'description' : 'Description'
          }} 
          onRowSelected   = {this.handleRowSelected}
        />
      </div>
    )
  }
})
 
export default TasksCollection
