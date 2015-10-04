import React                  from 'react'
import Router                 from 'react-router'
import NavComponent           from '../../common/components/NavComponent'
import AddStockForm           from '../../common/components/stock/AddStockForm'
import StockSummary           from '../../common/components/stock/StockSummary'
import StockActivityView      from '../../common/components/stock/StockActivityView'
import StockCheckForm         from '../../common/components/stock/StockCheckForm'
import StockDamageReportForm  from '../../common/components/stock/StockDamageReportForm'
import DispatchesCollection   from '../../common/components/dispatches/DispatchesCollection'
import OrderQueueingComponent from '../../depot/components/queueing/OrderQueueingComponent'
import DriversCollection      from '../../common/components/drivers/DriversCollection'
import PageWrapper            from '../../common/components/PageWrapper'

import { Route, RouteHandler }  
  from 'react-router'
import { Tabs, Tab, Panel }
  from 'react-bootstrap'

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
    return (
      <Panel
        className = 'panel-fill'
        bsStyle   = 'primary'
        header    = 'Dispatches'>
        <Tabs fill
          animation = {false}
          activeKey = {this.state.key}
          onSelect  = {this.handleSelect}>
            <Tab eventKey={1} title='Queued'>
              <Panel>
                <DispatchesCollection />
              </Panel>
            </Tab>
            <Tab eventKey={2} title='Dispatched'>
              <Panel>
                <DispatchesCollection />
              </Panel>
            </Tab>
        </Tabs>
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
            <Tab eventKey={3} title='Stock check'>
              <Panel>
                <StockCheckForm />
              </Panel>
            </Tab>
            <Tab eventKey={4} title='Add stock'>
              <Panel>
                <AddStockForm />
              </Panel>
            </Tab>
            <Tab eventKey={5} title='Report damages'>
              <Panel>
                <StockDamageReportForm />
              </Panel>
            </Tab>
        </Tabs>
      </Panel>
    )
  }
})

const RouteDrivers = React.createClass({
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Drivers'>
          <DriversCollection />
      </Panel>
    )
  }
})

const RouteQueueing = React.createClass({
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Order queueing'>
        <OrderQueueingComponent />
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
              'label' : 'Queueing',
              'href'  : '#queueing'
            },
            {
              'label' : 'Dispatches',
              'href'  : '#dispatches'
            },
            {
              'label' : 'Stock',
              'href'  : '#stock'
            },
            {
              'label' : 'Drivers',
              'href'  : '#drivers'
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
    <Route path ='dispatches'          handler={RouteDispatches}  />
    <Route path ='stock'               handler={RouteStock}       />
    <Route path ='drivers'             handler={RouteDrivers}     />
    <Route path ='queueing'            handler={RouteQueueing}    />
    <Route path ='performance'         handler={RoutePerformance} />
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
