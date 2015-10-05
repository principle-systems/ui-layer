import React from 'react'
import Grid  from '../Grid'

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
          filterColumns   = {['name']}
          columns         = {['name']}
          labels          = {{
            'name' : 'Name'
          }}
          data            = {drivers} />
      </div>
    )
  }
})
 
export default DriversCollection
