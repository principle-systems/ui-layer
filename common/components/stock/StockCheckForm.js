import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Input }
  from 'react-bootstrap'

const stock = [
  {
    product   : 'Fresh bananas',
    actual    : 10,
    available : 10
  },
  {
    product   : 'Levitating cheeze',
    actual    : 10,
    available : 10
  },
  {
    product   : 'Particle accellerator',
    actual    : 10,
    available : 10
  },
  {
    product   : 'iPhone',
    actual    : 10,
    available : 10
  },
  {
    product   : 'Palak paneer',
    actual    : 10,
    available : 10
  }
]

const StockCheckForm = React.createClass({
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
              label : 'Product',
              key   : 'product'
            },
            {
              label : 'Available',
              key   : 'available'
            },
            {
              label : 'Actual',
              key   : 'actual'
            }
          ]}
          data            = {stock}
          itemsPerPage    = {10} 
          pageButtonLimit = {5}
          filterable      = {['product']} 
        />
      </div>
    )
  }
})
 
export default StockCheckForm
