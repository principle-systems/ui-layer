import React from 'react'

import { Table, Label }
  from 'react-bootstrap'

const CustomerInfo = React.createClass({
  render() {
    const { customer } = this.props
    return (
      <div>
        <h4 style={{marginBottom: '1em'}}>
          <Label bsStyle='info'>{customer.priceCategory}</Label>
        </h4>
        <h3>{customer.name}</h3>
        <Table bordered striped>
          <col width={200} />
          <col />
          <tbody>
            <tr>
              <td><strong>Address</strong></td>
              <td>{customer.address}</td>
            </tr>
            <tr>
              <td><strong>TIN</strong></td>
              <td>{customer.tin}</td>
            </tr>
            <tr>
              <td><strong>Phone number</strong></td>
              <td>{customer.phone}</td>
            </tr>
            <tr>
              <td><strong>Area</strong></td>
              <td>{customer.area}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
})

export default CustomerInfo
