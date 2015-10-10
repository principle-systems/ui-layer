import React from 'react'

import { Table, Label, Col, Row, Panel, Button, Glyphicon }
  from 'react-bootstrap'

const spinnerBg = {
    marginLeft   : 'auto',
    marginRight  : 'auto',
    maxWidth     : '300px',
    height       : '300px',
    overflow     : 'hidden',
    marginBottom : '1em',
    background   : 'center center no-repeat url(../images/spinner.gif) #aaaaaa'
}

const CustomerInfo = React.createClass({
  renderCustomerInfo(customer) {
    return (
      <div>
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
  },
  getMapUrl(customer) {
    const { latitude, longitude } = customer.position
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=300x300&maptype=roadmap&&markers=color:red%7C${latitude},${longitude}`
  },
  render() {
    const { customer, dashboard } = this.props
    const showMap = navigator.onLine && customer.position
    return (
      <div>
        <h4 style={{marginBottom: '1em'}}>
          <Label bsStyle='info'>{customer.priceCategory}</Label>
        </h4>
        {showMap ? (
          <Row>
            <Col lg={8}>
              {this.renderCustomerInfo(customer)}
            </Col>
            <Col lg={4}>
              <Panel className='customer-map'>
                <div className='text-center'>
                  <div style={spinnerBg}><img src={this.getMapUrl(customer)} /></div>
                  {'fieldstaff' === dashboard && (
                    <Button
                      onClick = {() => {}}
                      bsStyle = 'primary'>
                      <span>
                        <Glyphicon glyph='map-marker' /> Show directions
                      </span>
                    </Button>
                  )}
                </div>
              </Panel>
            </Col>
          </Row>
        ) : (
          <div>
            {this.renderCustomerInfo(customer)}
          </div>
        )} 
      </div>
    )
  }
})

export default CustomerInfo
