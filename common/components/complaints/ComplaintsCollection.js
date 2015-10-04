import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Input }
  from 'react-bootstrap'

const complaints = [
  {
    name : 'Complaint #1'
  },
  {
    name : 'Complaint #2'
  },
  {
    name : 'Complaint #3'
  },
  {
    name : 'Complaint #4'
  },
  {
    name : 'Complaint #5'
  }
]

const ComplaintsCollection = React.createClass({
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
              label : 'Name',
              key   : 'name'
            }
          ]}
          data            = {complaints}
          itemsPerPage    = {10} 
          pageButtonLimit = {5}
          filterable      = {['name']} 
        />
      </div>
    )
  }
})
 
export default ComplaintsCollection
