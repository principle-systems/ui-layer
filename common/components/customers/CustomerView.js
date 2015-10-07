import React                from 'react'
import CustomerActivityLog  from './CustomerActivityLog'
import OrdersCollection     from '../orders/OrdersCollection'
import TasksCollection      from '../tasks/TasksCollection'
import ComplaintsCollection from '../complaints/ComplaintsCollection'

import { Panel, Tabs, Tab, ButtonGroup, DropdownButton, Button, MenuItem, Glyphicon, Table, Label }
  from 'react-bootstrap'

const CustomerInfo = React.createClass({
  render() {
    const { customer } = this.props
    return (
      <div>
        <h3>{customer.name}</h3>
        <hr />
        <ButtonGroup 
          className  = 'pull-right'
          style      = {{marginTop: '-5.5em'}}>
          <DropdownButton id='call-activity-select' title={(
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
          <DropdownButton id='customer-visit-select' title={(
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
        <h4 style={{marginBottom: '1em'}}>
          <Label bsStyle='info'>{customer.priceCategory}</Label>
        </h4>
        <Table bordered>
          <col width={250} />
          <col />
          <tbody>
            <tr>
              <td><strong>Address</strong></td>
              <td>{customer.address}</td>
            </tr>
          </tbody>
        </Table>
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
        <ol className='breadcrumb'>
          <li>
            <a href='#/customers'>
              Customers
            </a>
          </li>
          <li className='active'>
            {customer.name}
          </li>
        </ol>
        <div>
          <CustomerInfo customer={customer} />
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
