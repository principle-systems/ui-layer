import React from 'react'
import Grid  from '../Grid'
import DispatchView from './DispatchView'

import { Input, Modal, Button }
  from 'react-bootstrap'

const mockup = [
  {
    'id'       : 'dispatches/1',
    'status'   : 'Created',
    'vehicle'  : 'Vehicle #1',
    'driver'   : 'Bob',
    'created'  : 'Created'
  },
  {
    'id'       : 'dispatches/2',
    'status'   : 'Created',
    'vehicle'  : 'Vehicle #1',
    'driver'   : 'Bob',
    'created'  : 'Created'
  },
  {
    'id'       : 'dispatches/3',
    'status'   : 'Created',
    'vehicle'  : 'Vehicle #1',
    'driver'   : 'Bob',
    'created'  : 'Created'
  },
  {
    'id'       : 'dispatches/4',
    'status'   : 'Created',
    'vehicle'  : 'Vehicle #1',
    'driver'   : 'Bob',
    'created'  : 'Created'
  },
  {
    'id'       : 'dispatches/5',
    'status'   : 'Created',
    'vehicle'  : 'Vehicle #1',
    'driver'   : 'Bob',
    'created'  : 'Created'
  }
]

const DispatchesCollection = React.createClass({
//  getInitialState() {
//    return {
//      dispatch : null
//    }
//  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(dispatch) {
    //this.setState({dispatch})
    location.hash = dispatch.id
  },
//  hideModal() {
//    this.setState({
//      dispatch : null
//    })
//  },
  render() {
    return (
      <div>
        {/*
        <Modal show={!!dispatch} onHide={this.hideModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Dispatch details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DispatchView />
          </Modal.Body>
          <Modal.Footer>
            <Button block bsStyle='primary' onClick={this.hideModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        */}
        <Input 
          placeholder     = 'Filter results'
          onChange        = {this.handleFilterChange}
          type            = 'text'
        />
        <Grid
          ref             = 'grid'
          tableClassName  = 'table table-bordered'
          columns         = {['status', 'vehicle', 'driver', 'created', 'weightClass']}
          labels          = {{
            'status'      : 'Status',
            'vehicle'     : 'Vehicle',
            'driver'      : 'Driver',
            'created'     : 'Created',
            'weightClass' : 'Weight class'
          }}
          onRowSelected   = {this.handleRowSelected}
          filterColumns   = {['vehicle', 'driver', 'status']}
          data            = {mockup}
        />
      </div>
    )
  }
})
 
export default DispatchesCollection
