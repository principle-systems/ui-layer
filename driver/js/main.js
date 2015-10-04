import React                  from 'react'
import Router                 from 'react-router'
import NavComponent           from '../../common/components/NavComponent'
import PageWrapper            from '../../common/components/PageWrapper'

import { Route, RouteHandler }  
  from 'react-router'
import { Tabs, Tab, Panel }
  from 'react-bootstrap'

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
