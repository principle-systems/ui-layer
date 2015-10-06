import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const mockup = [
  {
    id       : 'dispatches/1',
    customer : 'customer #1'
  },
  {
    id       : 'dispatches/2',
    customer : 'customer #2'
  },
  {
    id       : 'dispatches/3',
    customer : 'customer #3'
  },
  {
    id       : 'dispatches/4',
    customer : 'customer #4'
  },
  {
    id       : 'dispatches/5',
    customer : 'customer #5'
  }
]

const DispatchesCollection = React.createClass({
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  render() {
    return (
      <div>
        <Input 
          placeholder     = 'Filter results'
          onChange        = {this.handleFilterChange}
          type            = 'text'
        />
        <Grid
          ref             = 'grid'
          tableClassName  = 'table table-bordered'
          columns         = {['customer']}
          labels          = {{
            'customer' : 'Customer'
          }}
          filterColumns   = {['customer']}
          data            = {mockup}
        />
      </div>
    )
  }
})
 
export default DispatchesCollection
