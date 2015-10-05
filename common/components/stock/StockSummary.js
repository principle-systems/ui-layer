import React from 'react'
import Grid  from '../Grid'

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

const StockSummary = React.createClass({
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
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
          tableClassName  = 'table table-bordered'
          columns         = {['product', 'actual', 'available']}
          labels          = {{
            'product'   : 'Product',
            'available' : 'Available',
            'actual'    : 'Actual'
          }}
          filterColumns   = {['product']}
          data            = {stock} />
      </div>
    )
  }
})
 
export default StockSummary
