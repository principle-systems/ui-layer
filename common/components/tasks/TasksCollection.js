import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Input }
  from 'react-bootstrap'

const tasks = [
  {
    description : 'Task #1'
  },
  {
    description : 'Task #2'
  },
  {
    description : 'Task #3'
  },
  {
    description : 'Task #4'
  },
  {
    description : 'Task #5'
  }
]

const TasksCollection = React.createClass({
  handleFilterChange(event) {
    this.refs.table.filterBy(event.target.value)
  },
  render() {
    return (
      <div>
        <Input placeholder='Filter results' onChange={this.handleFilterChange} type='text' />
        <Table 
          ref             = 'table'
          className       = 'table table-bordered no-default-filter'
          columns         = {[
            {
              label : 'Description',
              key   : 'description'
            }
          ]}
          data            = {tasks}
          itemsPerPage    = {10} 
          pageButtonLimit = {5}
          filterable      = {['name']} 
        />
      </div>
    )
  }
})
 
export default TasksCollection
