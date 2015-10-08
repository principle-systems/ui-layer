import React                  from 'react'
import Router                 from 'react-router'
import NavComponent           from '../../common/components/NavComponent'
import PageWrapper            from '../../common/components/PageWrapper'
import OrdersCollection       from '../../common/components/orders/OrdersCollection'
import CustomerView           from '../../common/components/customers/CustomerView'
import Device                 from '../../common/js/device'
import app                    from './reducers'

const store  = createStore(app)
const device = new Device('depot')

import { Route, RouteHandler }  
  from 'react-router'
import { createStore } 
  from 'redux'
import { Tabs, Tab, Panel }
  from 'react-bootstrap'

const RouteStock = React.createClass({
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Vehicle stock'>
        stock
      </Panel>
    )
  }
})

const RouteDispatches = React.createClass({
  getInitialState() {
    return {
      key : 1
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  render() {
    const { key } = this.state
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Dispatches'>
        <Tabs fill
          animation = {false}
          activeKey = {key}
          onSelect  = {this.handleSelect}>
          <Tab eventKey={1} title='Live orders'>
            <Panel>
              live
            </Panel>
          </Tab>
          <Tab eventKey={2} title='Delivered orders'>
            <Panel>
              delivered
            </Panel>
          </Tab>
        </Tabs>
      </Panel>
    )
  }
})

const RoutePerformance = React.createClass({
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Performance'>
        performance
      </Panel>
    )
  }
})

const RouteCustomerDetails = React.createClass({
  getInitialState() {
    return {
      key      : 1,
      customer : null
    }
  },
  fetchCustomer() {
    const { params } = this.props
    const customer = device.fetch(`customers/${params.id}`)
    console.log(customer)
    this.setState({customer}) 
  },
  componentDidMount() {
    this.fetchCustomer()
    this.props.device.on('change', this.fetchCustomer)
  },
  componentWillUnmount() {
    this.props.device.removeListener('change', this.fetchCustomer)
  },
  handleSelect(key) {
    this.setState({key})
  },
  render() {
    const { customer } = this.state
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Customers'>
        <div>
          <CustomerView customer={customer} />
        </div>
        <OrdersCollection />
      </Panel>
    )
  }
})

const Handler = React.createClass({
  render() {
    return (
      <div id='wrapper'>
        <NavComponent menuItems={[
            {
              'label' : 'Dispatches',
              'href'  : '#dispatches'
            },
            {
              'label' : 'Vehicle stock',
              'href'  : '#stock'
            },
            {
              'label' : 'Performance',
              'href'  : '#performance'
            }
          ]} />
        <PageWrapper>
          <RouteHandler />
        </PageWrapper>
      </div>
    )
  }
})

const routes = (
  <Route handler={Handler}>
    <Route path ='dispatches'         handler={RouteDispatches}     />
    <Route path ='stock'              handler={RouteStock}          />
    <Route path ='performance'        handler={RoutePerformance}    />
    <Route path ='customers/:id'      handler={RouteCustomerDetails} />
  </Route>
)

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(
    <div>
      {/*
      <NotificationComponent />
      */}
      <Root />
    </div>,
    document.getElementById('main')
  )
})
