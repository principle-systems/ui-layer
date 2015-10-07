import React from 'react'
import Grid  from '../../../common/components/Grid'
import OrderSelection from './OrderSelection'

import { Input, Row, Col, Button, Panel, FormControls }
  from 'react-bootstrap'

const areas = [
  {
    id   : 'areas/1',
    name : 'Area #1'
  },
  {
    id   : 'areas/2',
    name : 'Area #2'
  },
  {
    id   : 'areas/3',
    name : 'Area #3'
  }
]

const vehicles = [
  {
    id          : 'vehicles/1',
    regNo       : 'abc-123',
    make        : 'Toyota',
    model       : 'test',
    driver      : 'Bob',
    weightClass : 'Class A'
  },
  {
    id          : 'vehicles/2',
    regNo       : 'efg-456',
    make        : 'Toyota',
    model       : 'test',
    driver      : 'Bob',
    weightClass : 'Class A'
  },
  {
    id          : 'vehicles/3',
    regNo       : 'xyz-456',
    make        : 'Toyota',
    model       : 'test',
    driver      : 'Bob',
    weightClass : 'Class A'
  },
  {
    id          : 'vehicles/4',
    regNo       : 'ddd-456',
    make        : 'Toyota',
    model       : 'test',
    driver      : 'Bob',
    weightClass : 'Class A'
  },
  {
    id          : 'vehicles/5',
    regNo       : 'yyy-456',
    make        : 'Toyota',
    model       : 'test',
    driver      : 'Bob',
    weightClass : 'Class A'
  }
]

const OrderQueueingComponent = React.createClass({
  getDefaultProps() {
    return {
      areas : areas
    }
  },
  getInitialState() {
    return {
      vehicle : null,
      area    : null
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleVehicleSelected(vehicle) {
    this.setState({vehicle})
  },
  handleAreaSelected(event) {
    this.setState({
      area : event.target.value
    })
  },
  restart() {
    this.setState(this.getInitialState())
  },
  render() {
    const { areas } = this.props
    const { vehicle, area } = this.state
    return (
      <div>
        {!vehicle && (
          <div>
            <Input 
              placeholder     = 'Filter results' 
              onChange        = {this.handleFilterChange} 
              type            = 'text' />
            <h4>Available vehicles</h4>
            <Grid
              ref             = 'grid'
              tableClassName  = 'table table-bordered table-hover'
              columns         = {['regNo', 'make', 'model', 'driver', 'weightClass']}
              filterColumns   = {['regNo', 'make', 'model', 'driver']}
              labels          = {{
                'regNo'       : 'Registration number',
                'make'        : 'Make',
                'model'       : 'Model',
                'driver'      : 'Driver',
                'weightClass' : 'Weight class'
              }}
              onRowSelected   = {this.handleVehicleSelected}
              data            = {vehicles} />
          </div>
        )}
        {vehicle && (
          <div>
            <div>
              <Row>
                <Col xs={9}>
                  <Input type='select' onChange={this.handleAreaSelected}>
                    <option value={''}>
                      Please select an area
                    </option>
                    {areas.map(item => {
                      return (
                        <option 
                          key   = {item.id}
                          value = {item.id}>
                          {item.name}
                        </option>
                      )
                    })}
                  </Input>
                </Col>
                <Col xs={3}>
                  <Button block onClick={this.restart}>
                    Cancel 
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        )}
        {vehicle && area && (
          <OrderSelection area={area} />
        )}
      </div>
    )
  }
})
 
export default OrderQueueingComponent
