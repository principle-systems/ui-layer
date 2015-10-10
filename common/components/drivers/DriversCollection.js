import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const drivers = [
  {
    id      : 'drivers/1',
    name    : 'Abdul',
    vehicle : 'abc-123'
  },
  {
    id      : 'drivers/2',
    name    : 'Baraka',
    vehicle : 'abc-123'
  },
  {
    id      : 'drivers/3',
    name    : 'Deo',
    vehicle : 'abc-123'
  },
  {
    id      : 'drivers/4',
    name    : 'Ernest',
    vehicle : 'abc-123'
  },
  {
    id      : 'drivers/5',
    name    : 'George',
    vehicle : 'abc-123'
  }
]

const DriversCollection = React.createClass({
  handleRowSelected(item) {
    location.hash = item.id
  },
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
          filterColumns   = {['name', 'vehicle']}
          columns         = {['name', 'vehicle']}
          labels          = {{
            'name'    : 'Name',
            'vehicle' : 'Vehicle'
          }}
          onRowSelected   = {this.handleRowSelected}
          data            = {drivers} />
      </div>
    )
  }
})
 
export default DriversCollection
