import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Input }
  from 'react-bootstrap'

const vehicles = [
  {
    regNo : 'abc-123'
  },
  {
    regNo : 'efg-456'
  },
  {
    regNo : 'xyz-456'
  },
  {
    regNo : 'ddd-456'
  },
  {
    regNo : 'yyy-456'
  }
]

const OrderQueueingComponent = React.createClass({
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
              label : 'Registration number',
              key   : 'regNo'
            }
          ]}
          data            = {vehicles}
          itemsPerPage    = {10} 
          pageButtonLimit = {5}
          filterable      = {['regNo']} 
        />
      </div>
    )
  }
})
 
export default OrderQueueingComponent
