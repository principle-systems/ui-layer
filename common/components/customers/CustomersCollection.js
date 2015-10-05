import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const customers = [
  {
    id          : 'customers/1',
    name        : 'Customer A',
    address     : 'Main street 1',
    phoneNumber : '123'
  },
  {
    id          : 'customers/2',
    name        : 'Customer B',
    address     : 'Side street',
    phoneNumber : '123'
  },
  {
    id          : 'customers/3',
    name        : 'Customer C',
    address     : 'Madison Sq. Garden',
    phoneNumber : '123'
  },
  {
    id          : 'customers/4',
    name        : 'Customer D',
    address     : 'Green Acres 5',
    phoneNumber : '123'
  },
  {
    id          : 'customers/5',
    name        : 'Customer E',
    address     : 'Grand central station',
    phoneNumber : '123'
  }
]

const columns = [
  {
    label : 'Name',
    key   : 'name'
  },
  {
    label : 'Address',
    key   : 'address'
  },
  {
    label : 'Phone number',
    key   : 'phone'
  },
  {
    label : 'Area',
    key   : 'area'
  },
  {
    label : 'Price category',
    key   : 'priceCategory'
  },
  {
    label : 'Location',
    key   : 'location'
  }
]

const CustomersCollection = React.createClass({
  getDefaultProps() {
    return {
      data : customers
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
          columns         = {['name', 'address', 'phoneNumber']}
          labels          = {{
            'name'         : 'Name',
            'address'      : 'Address',
            'phoneNumber'  : 'Phone number'
          }}
          onRowSelected   = {this.handleRowSelected}
          filterColumns   = {['name', 'address', 'phoneNumber']} 
          tableClassName  = 'table table-bordered' />
      </div>
    )
  }
})
 
export default CustomersCollection
