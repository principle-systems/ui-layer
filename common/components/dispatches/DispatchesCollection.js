import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Input }
  from 'react-bootstrap'

const mockup = [
  {
    customer : 'customer #1'
  },
  {
    customer : 'customer #2'
  },
  {
    customer : 'customer #3'
  },
  {
    customer : 'customer #4'
  },
  {
    customer : 'customer #5'
  }
]

const DispatchesCollection = React.createClass({
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
              label : 'Customer',
              key   : 'customer'
            }
          ]}
          data            = {mockup}
          itemsPerPage    = {10} 
          pageButtonLimit = {5}
          filterable      = {['customer']} 
        />
      </div>
    )
  }
})
 
export default DispatchesCollection
