import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const complaints = [
  {
    id          : 'complaints/1',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/2',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/3',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/4',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/5',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  }
]

const ComplaintsCollection = React.createClass({
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    location.hash = item.id
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
          columns         = {['customer', 'created', 'type', 'description', 'user']}
          labels          = {{
            'customer'    : 'Customer',
            'created'     : 'Created',
            'type'        : 'Type',
            'description' : 'Description',
            'user'        : 'User'
          }}
          onRowSelected   = {this.handleRowSelected}
          filterColumns   = {['customer', 'description', 'user']}
          tableClassName  = 'table table-bordered'
          data            = {complaints} />
      </div>
    )
  }
})
 
export default ComplaintsCollection
