import React                from 'react'
import CustomerActivityLog  from './CustomerActivityLog'
import OrdersCollection     from '../orders/OrdersCollection'
import TasksCollection      from '../tasks/TasksCollection'
import ComplaintsCollection from '../complaints/ComplaintsCollection'
import CustomerInfo         from './CustomerInfo'

import { Panel, Tabs, Tab, ButtonGroup, DropdownButton, Button, MenuItem, Glyphicon, Table, Label, Modal, Breadcrumb, BreadcrumbItem, Row, Col }
  from 'react-bootstrap'

const CustomerActivityModal = React.createClass({
  render() {
    const { action, onHide } = this.props
    switch (action) {
      case 'call-activity-1':
        return (
          <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton={true}>
              <Modal.Title>Complaint details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              hello
            </Modal.Body>
            <Modal.Footer>
              <Button block bsStyle='primary' onClick={onHide}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        )
      case 'call-activity-2':
      case 'call-activity-3':
      case 'call-activity-4':
      case 'call-activity-5':
      case 'call-activity-6':
      case 'customer-visit-1':
      case 'customer-visit-2':
      case 'customer-visit-3':
      case 'customer-visit-4':
      case 'customer-visit-5':
      case 'customer-visit-6':
        return (
          <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton={true}>
              <Modal.Title>Complaint details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              hello
            </Modal.Body>
            <Modal.Footer>
              <Button block bsStyle='primary' onClick={onHide}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        )
      default:
        return <span />
    }
  }
})

const CustomerData = React.createClass({
  getInitialState() {
    return {
      action : null
    }
  },
  hideModal() {
    this.setState({
      action : null
    })
  },
  handleDropdownSelect(event, action) {
    this.setState({action})
  },
  render() {
    const { customer } = this.props
    const { action } = this.state
    return (
      <div>
        <CustomerActivityModal onHide={this.hideModal} action={action} />

            <ButtonGroup justified>
              <DropdownButton 
                id       = 'call-activity-select'
                onSelect = {this.handleDropdownSelect}
                title    = {(
                <span>
                  <Glyphicon glyph='earphone' />Call activity
                </span>
              )}>
                <MenuItem eventKey='call-activity-1'>Place an order</MenuItem>
                <MenuItem eventKey='call-activity-2'>Add a contact</MenuItem>
                <MenuItem eventKey='call-activity-3'>Register a service complaint</MenuItem>
                <MenuItem eventKey='call-activity-4'>Register a quality complaint</MenuItem>
                <MenuItem eventKey='call-activity-5'>Schedule callback</MenuItem>
                <MenuItem eventKey='call-activity-6'>No action</MenuItem>
              </DropdownButton>
              <DropdownButton 
                id       = 'customer-visit-select'
                onSelect = {this.handleDropdownSelect}
                title    = {(
                <span>
                  <Glyphicon glyph='home' />Customer visit
                </span>
              )}>
                <MenuItem eventKey='customer-visit-1'>Place an order</MenuItem>
                <MenuItem eventKey='customer-visit-2'>Add a contact</MenuItem>
                <MenuItem eventKey='customer-visit-3'>Register a service complaint</MenuItem>
                <MenuItem eventKey='customer-visit-4'>Register a quality complaint</MenuItem>
                <MenuItem eventKey='customer-visit-5'>Schedule follow-up visit</MenuItem>
                <MenuItem eventKey='customer-visit-6'>No action</MenuItem>
              </DropdownButton>
              <Button onClick={() => { location.hash = `${customer.id}/edit` }}>
                <Glyphicon glyph='pencil' />Edit customer
              </Button>
            </ButtonGroup>

        <CustomerInfo customer={customer} />
      </div>
    )
  }
})

const CustomerView = React.createClass({
  getInitialState() {
    return {
      key : 1
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  render() {
    const { customer } = this.props
    if (!customer) {
      return <span />
    }
    return (
      <div>
        <div>
          <CustomerData customer={customer} />
        </div>
        <Panel 
          className='panel-flat' 
          bsStyle='primary'>
          <Tabs fill 
            animation  = {false}
            activeKey  = {this.state.key}
            onSelect   = {this.handleSelect}>
            <Tab
              eventKey = {1}
              title    = 'Activity log'>
              <Panel className='panel-tab-pane'>
                <CustomerActivityLog />
              </Panel>
            </Tab>
            <Tab
              eventKey = {2}
              title    = 'Orders'>
              <Panel className='panel-tab-pane'>
                <OrdersCollection />
              </Panel>
            </Tab>
            <Tab
              eventKey = {3}
              title    = 'Contacts'>
              <Panel className='panel-tab-pane'>
                contacts
              </Panel>
            </Tab>
            <Tab
              eventKey = {4}
              title    = 'Complaints'>
              <Panel className='panel-tab-pane'>
                <ComplaintsCollection />
              </Panel>
            </Tab>
            <Tab
              eventKey = {5}
              title    = 'Tasks'>
              <Panel className='panel-tab-pane'>
                <TasksCollection />
              </Panel>
            </Tab>
          </Tabs>
        </Panel>
      </div>
    )
  }
})

export default CustomerView
