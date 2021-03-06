import React                    from 'react'
import Router                   from 'react-router'
import $                        from 'jquery'
import NavComponent             from '../../common/components/NavComponent'
import PageWrapper              from '../../common/components/PageWrapper'
import ComplaintsCollection     from '../../common/components/complaints/ComplaintsCollection'
import TasksCollection          from '../../common/components/tasks/TasksCollection'
import NotificationManager      from '../../common/components/NotificationManager'
import SyncComponent            from '../../common/components/SyncComponent'
import Device, { SyncHandler }  from '../../common/js/device'
import app                      from './reducers'

import CreateResource from '../../common/commands/CreateResource'

import { Route, RouteHandler }  
  from 'react-router'
import { createStore } 
  from 'redux'
import { Provider }     
  from 'react-redux'
import { Tabs, Tab, Panel }
  from 'react-bootstrap'
import { RouteProductItem, RouteCustomerEdit, RouteCustomerItem, RouteCustomers, RouteOrders, RouteProducts, RouteStock }
  from '../../common/Routes'

import { Navbar, CollapsibleNav, NavItem, Nav, NavBrand }
  from 'react-bootstrap'

const store  = createStore(app)
const device = new Device('depot')
const remote = new SyncHandler(device, store)

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

const menuItems=[
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
]

const Handler = React.createClass({
  render() {
    return (
      <div id='wrapper'>
        <NotificationManager device={device} />
        <SyncComponent />
        <NavComponent remote={remote} menuItems={[
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

const ProductItem = React.createClass({
  render() {
    return (
      <RouteProductItem {...this.props} device={device} />
    )
  }
})

function wrap(Component) {
  return React.createClass({
    render() {
      return (
        <Component {...this.props} dashboard='fieldstaff' dispatch={store.dispatch} device={device} />
      )
    }
  })
}

const routes = (
  <Route handler={Handler}>
    <Route path='products/:id'       handler={wrap(RouteProductItem)}     />
    <Route path='orders/:id'         handler={wrap(RouteOrderItem)}       />
    <Route path='tasks/:id'          handler={wrap(RouteTaskItem)}        />
    <Route path='customers/:id/edit' handler={wrap(RouteCustomerEdit)}    />
    <Route path='customers/:id'      handler={wrap(RouteCustomerItem)}    />
    <Route path='customers'          handler={wrap(RouteCustomers)}       />
    <Route path='complaints'         handler={wrap(RouteComplaints)}      />
    <Route path='orders'             handler={wrap(RouteOrders)}          />
    <Route path='products'           handler={wrap(RouteProducts)}        />
    <Route path='stock'              handler={wrap(RouteStock)}           />
    <Route path='tasks'              handler={wrap(RouteTasks)}           />
    <Route path='performance'        handler={wrap(RoutePerformance)}     />
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

// ---

$.ajax({
  type        : 'POST',
  url         : 'http://localhost:8081/reset',
  data        : JSON.stringify({ node : 'depot' }),
  contentType : 'application/json',
  dataType    : 'json',
  success : () => {
    localStorage.clear()
    //remote.sync(resp => {
    //  console.log(resp)
    //})
  }
})
