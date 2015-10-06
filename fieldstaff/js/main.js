import React                    from 'react'
import Router                   from 'react-router'
import NavComponent             from '../../common/components/NavComponent'
import CustomersCollection      from '../../common/components/customers/CustomersCollection'
import PageWrapper              from '../../common/components/PageWrapper'
import CustomerRegistrationForm from '../../common/components/customers/CustomerRegistrationForm'
import ComplaintsCollection     from '../../common/components/complaints/ComplaintsCollection'
import OrdersCollection         from '../../common/components/orders/OrdersCollection'
import ProductsCollection       from '../../common/components/products/ProductsCollection'
import StockSummary             from '../../common/components/stock/StockSummary'
import StockActivityView        from '../../common/components/stock/StockActivityView'
import TasksCollection          from '../../common/components/tasks/TasksCollection'
import Device                   from '../../common/js/device'
import app                      from './reducers'

import { Route, RouteHandler }  
  from 'react-router'
import { createStore } 
  from 'redux'
import { Provider }     
  from 'react-redux'
import { Tabs, Tab, Panel }
  from 'react-bootstrap'

const store  = createStore(app)
const device = new Device('depot')

const RouteProductItem = React.createClass({
  render() {
    return (
      <div>
        show product {'' + this.props.params.id}
      </div>
    )
  }
})

const RouteOrderItem = React.createClass({
  render() {
    return (
      <div>
        show order {'' + this.props.params.id}
      </div>
    )
  }
})

const RouteTaskItem = React.createClass({
  render() {
    return (
      <div>
        show task {'' + this.props.params.id}
      </div>
    )
  }
})

const RouteComplaintItem = React.createClass({
  render() {
    return (
      <div>
        show complaint {'' + this.props.params.id}
      </div>
    )
  }
})

const RouteCustomerItem = React.createClass({
  render() {
    return (
      <div>
        show customer {'' + this.props.params.id}
      </div>
    )
  }
})

const RouteCustomersItem = React.createClass({
  render() {
    console.log(this.props)
    return (
      <div>
        show customer
      </div>
    )
  }
})

const customers = [
  {
    id          : 'customers/1',
    name        : 'Customer A',
    address     : 'Main street 1',
    phoneNumber : '123'
  },
  {
    id          : 'customers/2',
    name        : 'Customer B',
    address     : 'Side street',
    phoneNumber : '123'
  },
  {
    id          : 'customers/3',
    name        : 'Customer C',
    address     : 'Madison Sq. Garden',
    phoneNumber : '123'
  },
  {
    id          : 'customers/4',
    name        : 'Customer D',
    address     : 'Green Acres 5',
    phoneNumber : '123'
  },
  {
    id          : 'customers/5',
    name        : 'Customer E',
    address     : 'Grand central station',
    phoneNumber : '123'
  }
]

const RouteCustomers = React.createClass({
  getInitialState() {
    return {
      key       : 1,
      customers : []
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  fetchCustomers() {
    this.setState({
      customers : device.fetchAll('customers')
    })
  },
  componentDidMount() {
    this.fetchCustomers()
    device.on('change', this.fetchCustomers)
  },
  componentWillUnmount() {
    device.removeListener('change', this.fetchCustomers)
  },
  render() {
    const { key, customers } = this.state
    return (
      <Panel
        className = 'panel-fill'
        bsStyle   = 'primary'
        header    = 'Customers'>
          <Tabs fill
            animation = {false}
            activeKey = {key}
            onSelect  = {this.handleSelect}>
              <Tab eventKey={1} title='All customers'>
                <Panel>
                  <CustomersCollection data={customers} />
                </Panel>
              </Tab>
              <Tab eventKey={2} title='Register new customer'>
                <Panel>
                  <CustomerRegistrationForm />
                </Panel>
              </Tab>
              <Tab eventKey={3} title='Pending registrations'>
                <Panel>
                  <CustomersCollection />
                </Panel>
              </Tab>
          </Tabs>
      </Panel>
    )
  }
})

const RouteComplaints = React.createClass({
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Complaints'>
          <ComplaintsCollection />
      </Panel>
    )
  }
})

const RouteOrders = React.createClass({
  getInitialState() {
    return {
      key : 1
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  render() {
    return (
      <Panel
        className = 'panel-fill'
        bsStyle   = 'primary'
        header    = 'Orders'>
          <Tabs fill
            animation = {false}
            activeKey = {this.state.key}
            onSelect  = {this.handleSelect}>
              <Tab eventKey={1} title='Requested orders'>
                <Panel>
                  <OrdersCollection />
                </Panel>
              </Tab>
              <Tab eventKey={2} title='Live orders'>
                <Panel>
                  <OrdersCollection />
                </Panel>
              </Tab>
              <Tab eventKey={3} title='Rejected orders'>
                <Panel>
                  <OrdersCollection />
                </Panel>
             </Tab>
          </Tabs>
      </Panel>
    )
  }
})

const RouteProducts = React.createClass({
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Products'>
          <ProductsCollection />
      </Panel>
    )
  }
})

const RouteStock = React.createClass({
  getInitialState() {
    return {
      key : 1
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  render() {
    return (
      <Panel
        className = 'panel-fill'
        bsStyle   = 'primary'
        header    = 'Stock'>
          <Tabs fill
            animation = {false}
            activeKey = {this.state.key}
            onSelect  = {this.handleSelect}>
              <Tab eventKey={1} title='Summary'>
                <Panel>
                  <StockSummary />
                </Panel>
              </Tab>
              <Tab eventKey={2} title='Activity'>
                <Panel>
                  <StockActivityView />
                </Panel>
              </Tab>
          </Tabs>
      </Panel>
    )
  }
})

const RouteTasks = React.createClass({
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Tasks'>
          <TasksCollection />
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
              'label' : 'Customers',
              'href'  : '#customers'
            },
            {
              'label' : 'Complaints',
              'href'  : '#complaints'
            },
            {
              'label' : 'Orders',
              'href'  : '#orders'
            },
            {
              'label' : 'Products',
              'href'  : '#products'
            },
            {
              'label' : 'Stock',
              'href'  : '#stock'
            },
            {
              'label' : 'Tasks',
              'href'  : '#tasks'
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
    <Route path ='products/:id'       handler={RouteProductItem}   />
    <Route path ='orders/:id'         handler={RouteOrderItem}     />
    <Route path ='tasks/:id'          handler={RouteTaskItem}      />
    <Route path ='complaints/:id'     handler={RouteComplaintItem} />
    <Route path ='customers/:id'      handler={RouteCustomerItem}  />
    <Route path ='customers'          handler={RouteCustomers}     />
    <Route path ='complaints'         handler={RouteComplaints}    />
    <Route path ='orders'             handler={RouteOrders}        />
    <Route path ='products'           handler={RouteProducts}      />
    <Route path ='stock'              handler={RouteStock}         />
    <Route path ='tasks'              handler={RouteTasks}         />
    <Route path ='performance'        handler={RoutePerformance}   />
  </Route>
)

Router.run(routes, Router.HashLocation, (Root, routerState) => {
  React.render(
    <Provider store={store}>
      {() => <Root routerState={routerState} />}
    </Provider>,
    document.getElementById('main')
  )
})

//Router.run(routes, Router.HashLocation, (Root) => {
//  React.render(
//    <div>
//      {/*
//      <NotificationComponent />
//      */}
//      <Root />
//    </div>,
//    document.getElementById('main')
//  )
//})
