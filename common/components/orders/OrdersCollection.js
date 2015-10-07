import React from 'react'
import Grid  from '../Grid'

import { Input, Modal, Button }
  from 'react-bootstrap'

//const orders = [
//  {
//    id       : 'orders/1',
//    customer : 'Abdul',
//    user     : 'Bob',
//    created  : Date.now()
//  },
//  {
//    id       : 'orders/2',
//    customer : 'Baraka',
//    user     : 'Bob',
//    created  : Date.now()
//  },
//  {
//    id       : 'orders/3',
//    customer : 'Deo',
//    user     : 'Bob',
//    created  : Date.now()
//  },
//  {
//    id       : 'orders/4',
//    customer : 'Ernest',
//    user     : 'Bob',
//    created  : Date.now()
//  },
//  {
//    id       : 'orders/5',
//    customer : 'George',
//    user     : 'Bob',
//    created  : Date.now()
//  }
//]

const OrdersCollection = React.createClass({
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
          tableClassName  = 'table table-bordered'
          columns         = {['customer', 'created', 'productCount', 'user', 'total']}
          labels          = {{
            'customer'     : 'Customer',
            'created'      : 'Created',
            'productCount' : 'Products ordered',
            'user'         : 'User',
            'total'        : 'Order total',
          }}
          onRowSelected   = {this.handleRowSelected}
          filterColumns   = {['customer', 'user']}
          data            = {data} />
      </div>
    )
  }
})
 
export default OrdersCollection
