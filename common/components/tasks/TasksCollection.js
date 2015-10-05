import React from 'react'
import Grid  from '../Grid'

import { Input }
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
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    location.hash = item.id
  },
  render() {
    return (
      <div>
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
