import React from 'react'
import Grid  from '../../../common/components/Grid'

import { Button, Table, Input, Glyphicon, ProgressBar }
  from 'react-bootstrap'

const orders = [
  {
    id       : 'orders/1',
    customer : 'Abdul',
    user     : 'Bob',
    created  : Date.now()
  },
  {
    id       : 'orders/2',
    customer : 'Baraka',
    user     : 'Bob',
    created  : Date.now()
  },
  {
    id       : 'orders/3',
    customer : 'Deo',
    user     : 'Bob',
    created  : Date.now()
  },
  {
    id       : 'orders/4',
    customer : 'Ernest',
    user     : 'Bob',
    created  : Date.now()
  },
  {
    id       : 'orders/5',
    customer : 'George',
    user     : 'Bob',
    created  : Date.now()
  }
]

const OrderSelection = React.createClass({
  getDefaultProps() {
    return {
      orders : orders
    }
  },
  toggleItem(item) {
    console.log(item)
  },
  render() {
    const { orders, area } = this.props
    return (
      <div>
        <ProgressBar bsStyle='success' now={60} />
        <Table bordered>
          <thead>
            <tr>
              <th />
              <th>Customer</th>
              <th>Created</th>
              <th>Products ordered</th>
              <th>User</th>
              <th>Order total</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(item => {
            return (
              <tr key={item.id}>
                <td>
                  <input type='checkbox' onChange={() => this.toggleItem(item)} />
                </td>
                <td>{item.customer}</td>
                <td>{item.created}</td>
                <td>{item.productCount}</td>
                <td>{item.user}</td>
                <td>{item.orderTotal}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        <Button block bsStyle='primary'>
          <Glyphicon glyph='ok' />Submit
        </Button>
      </div>
    )
  }
})
 
export default OrderSelection
