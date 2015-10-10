import React   from 'react'
import Grid    from '../../../common/components/Grid'
import TimeAgo from 'react-timeago'

import { Button, Table, Input, Glyphicon, ProgressBar }
  from 'react-bootstrap'

const orders = [
  {
    id       : 'orders/1',
    customer : 'Abdul',
    user     : 'Bob',
    created  : Date.now(),
    weight   : .1
  },
  {
    id       : 'orders/2',
    customer : 'Baraka',
    user     : 'Bob',
    created  : Date.now(),
    weight   : .1
  },
  {
    id       : 'orders/3',
    customer : 'Deo',
    user     : 'Bob',
    created  : Date.now(),
    weight   : .1
  },
  {
    id       : 'orders/4',
    customer : 'Ernest',
    user     : 'Bob',
    created  : Date.now(),
    weight   : .1
  },
  {
    id       : 'orders/5',
    customer : 'George',
    user     : 'Bob',
    created  : Date.now(),
    weight   : .8
  }
]

const TimeComponent = React.createClass({
  timeFormatter(value, unit, suffix) {
    if ('second' === unit) {
      return 'less than a minute ago';
    }
    if (value !== 1) {
      unit += 's';
    }
    return `${value} ${unit} ${suffix}`
  },
  render() {
    const { data } = this.props
    return (
      <TimeAgo
        date      = {Number(data)}
        formatter = {this.timeFormatter} />
    )
  }
})

const OrderSelection = React.createClass({
  getInitialState() {
    return {
      selection : []
    }
  },
  getDefaultProps() {
    return {
      orders : orders
    }
  },
  toggleItem(event, item) {
    const { selection } = this.state
    if (event.target.checked) {
      selection.push(item)
    } else {
      selection.splice(selection.indexOf(item), 1)
    }
    this.setState({selection})
  },
  computeWeight() {
    let tot = 0
    this.state.selection.forEach(item => {
      tot += item.weight
    })
    return {
      style : tot > 1 ? 'danger' : 'success',
      total : tot * 100
    } 
  },
  render() {
    const { orders, area } = this.props
    const { total, style } = this.computeWeight()
    return (
      <div>
        <ProgressBar bsStyle={style} now={total} />
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
                  <input 
                    type     = 'checkbox'
                    onChange = {event => this.toggleItem(event, item)} 
                  />
                </td>
                <td>{item.customer}</td>
                <td><TimeComponent data={item.created} /></td>
                <td>{item.productCount}</td>
                <td>{item.user}</td>
                <td>{item.orderTotal}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        <Button block bsStyle='primary' disabled={total > 100}>
          <Glyphicon glyph='ok' />Submit
        </Button>
      </div>
    )
  }
})
 
export default OrderSelection
