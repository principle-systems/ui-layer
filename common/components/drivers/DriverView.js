import React from 'react'

import AddFuelForm 
  from '../vehicles/AddFuelForm'
import MaintenanceActivityForm 
  from '../vehicles/MaintenanceActivityForm'
import { Panel, Table, Button, Glyphicon, Row, Col, Modal }
  from 'react-bootstrap'

const DriverView = React.createClass({
  getInitialState() {
    return {
      modal : null
    }
  },
  handleLogMaintenanceActivity() {
    this.setState({
      modal : 'log-maintenance'
    })
  },
  handleAddFuelActivity() {
    this.setState({
      modal : 'add-fuel'
    })
  },
  hideModal() {
    this.setState({
      modal : null
    })
  },
  renderModal() {
    switch (this.state.modal) {
      case 'log-maintenance':
        return <MaintenanceActivityForm />
      case 'add-fuel':
        return <AddFuelForm />
      default:
        return <span />
    }
  },
  modalTitle() {
    switch (this.state.modal) {
      case 'log-maintenance':
        return 'Log vehicle maintenance activity'
      case 'add-fuel':
        return 'Add fuel to vehicle'
      default:
        return ''
    }
  },
  render() {
    return (
      <div>
        <Modal show={!!this.state.modal} onHide={this.hideModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>{this.modalTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderModal()}
          </Modal.Body>
        </Modal>
        <Row>
          <Col lg={6}>
            <Panel 
              className = 'panel-flat'
              header    = 'Vehicle details'
              bsStyle   = 'primary'>
              <Table bordered striped fill>
                <col width={200} />
                <col />
                <tbody>
                  <tr>
                    <td><strong>Registration number</strong></td>
                    <td>T328 BGY</td>
                  </tr>
                  <tr>
                    <td><strong>Make</strong></td>
                    <td>Mitsubishi</td>
                  </tr>
                  <tr>
                    <td><strong>Model</strong></td>
                    <td>Canter</td>
                  </tr>
                  <tr>
                    <td><strong>Weight class</strong></td>
                    <td>Class A</td>
                  </tr>
                  <tr>
                    <td><strong>Depot</strong></td>
                    <td>Depot #1</td>
                  </tr>
                </tbody>
              </Table>
            </Panel>
          </Col>
          <Col lg={6}>
            <Panel 
              className = 'panel-flat'
              header    = 'Vehicle maintenance summary'
              bsStyle   = 'primary'>
              <p>
                <i className='fa fa-fw fa-check' />
                This vehicle is active
              </p>
              <Button block 
                onClick = {this.handleLogMaintenanceActivity}
                bsStyle = 'primary'>
                <Glyphicon glyph='cog' />Log maintenance activity
              </Button>
            </Panel>
          </Col>
        </Row>
        <Panel 
          className = 'panel-flat'
          header    = 'Maintenance log'
          bsStyle   = 'primary'>
          <Table condensed bordered striped fill>
            <thead>
              <tr>
                <th>Type of maintenance</th>
                <th>Meter reading</th>
                <th>Description</th>
                <th>Start time</th>
                <th>End time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Emergency maintenance</td>
                <td>1005</td>
                <td>Lorem ipsum</td>
                <td>2015-10-10 07:53</td>
                <td>2015-10-11 14:52</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
        <Panel 
          className = 'panel-flat'
          header    = 'Fuel history'
          bsStyle   = 'primary'>
          <Table condensed bordered striped fill>
            <thead>
              <tr>
                <th>Time</th>
                <th>Km reading</th>
                <th>Added amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i className='fa fa-fw fa-clock-o' /> 2015-10-10 07:53</td>
                <td>1010</td>
                <td>60</td>
              </tr>
            </tbody>
          </Table>
          <Button block 
            onClick = {this.handleAddFuelActivity}
            bsStyle = 'default'>
            Add fuel to vehicle
          </Button>
        </Panel>
      </div>
    )
  }
})
 
export default DriverView
