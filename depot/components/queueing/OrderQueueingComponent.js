import React from 'react'
import Grid  from '../../../common/components/Grid'

import { Input }
  from 'react-bootstrap'

const vehicles = [
  {
    id    : 'vehicles/1',
    regNo : 'abc-123'
  },
  {
    id    : 'vehicles/2',
    regNo : 'efg-456'
  },
  {
    id    : 'vehicles/3',
    regNo : 'xyz-456'
  },
  {
    id    : 'vehicles/4',
    regNo : 'ddd-456'
  },
  {
    id    : 'vehicles/5',
    regNo : 'yyy-456'
  }
]

const OrderQueueingComponent = React.createClass({
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    console.log('Selected vehicle : ' + item.id)
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
          columns         = {['regNo']}
          filterColumns   = {['regNo']}
          labels          = {{
            'regNo' : 'Registration number'
          }}
          onRowSelected   = {this.handleRowSelected}
          data            = {vehicles} />
      </div>
    )
  }
})
 
export default OrderQueueingComponent
