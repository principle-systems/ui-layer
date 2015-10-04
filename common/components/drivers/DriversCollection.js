import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Input }
  from 'react-bootstrap'

const drivers = [
  {
    name : 'Abdul'
  },
  {
    name : 'Baraka'
  },
  {
    name : 'Deo'
  },
  {
    name : 'Ernest'
  },
  {
    name : 'George'
  }
]

const DriversCollection = React.createClass({
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
          data            = {drivers}
          itemsPerPage    = {10} 
          pageButtonLimit = {5}
          filterable      = {['name']} 
        />
      </div>
    )
  }
})
 
export default DriversCollection
