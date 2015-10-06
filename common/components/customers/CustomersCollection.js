import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const CustomersCollection = React.createClass({
  getDefaultProps() {
    return {
      data : []
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    location.hash = item.id
  },
  render() {
    const { data } = this.props
    return (
      <div>
        <Input 
          placeholder     = 'Filter results'
          onChange        = {this.handleFilterChange}
          type            = 'text' />
        <Grid 
          ref             = 'grid'
          data            = {data}
          columns         = {['name', 'address', 'phone']}
          labels          = {{
            'name'    : 'Name',
            'address' : 'Address',
            'phone'   : 'Phone number'
          }}
          onRowSelected   = {this.handleRowSelected}
          filterColumns   = {['name', 'address', 'phone']} 
          tableClassName  = 'table table-bordered' />
      </div>
    )
  }
})
 
export default CustomersCollection
