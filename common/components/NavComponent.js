import React from 'react'

import { Nav, NavItem, Navbar, CollapsibleNav, Glyphicon }
  from 'react-bootstrap'

const brand = (
  <a href='#'>
    <img src='../images/sphere-logo.png' alt='' />
  </a>
)

const NavComponent = React.createClass({
  getInitialState() {
    return {
      expanded : false
    }
  },
  toggle() {
    this.setState({
      expanded : !this.state.expanded
    })
  },
  handleSelectItem(key, item) {
    this.setState({
      expanded : false
    })
    location.hash = `/${item.substr(1)}`
  },
  render() {
    const { menuItems } = this.props
    let i = 1
    return (
      <div>
        <Navbar
          brand        = {brand}
          fixedTop     = {true}
          fluid        = {true}
          navExpanded  = {this.state.expanded}
          onToggle     = {this.toggle}
          inverse      = {true}
          toggleNavKey = {0}>
            <CollapsibleNav eventKey={0}>
              <Nav navbar
                onSelect    = {this.handleSelectItem}
                ulClassName = 'collapsed'>
                {menuItems.map(item => {
                  const ix = menuItems.indexOf(item)
                  return (
                    <NavItem 
                      key      = {ix}
                      eventKey = {ix}
                      href     = {item.href}>
                        {item.label}
                    </NavItem>
                  )
                })}
              </Nav>
              <Nav navbar right>
                <NavItem
                  eventKey  = {1}
                  className = 'btn-sync'
                  href      = '#'
                  onClick   = {e => { e.preventDefault() }}>
                    <Glyphicon glyph='refresh' />&nbsp;Sync
                </NavItem>
              </Nav>
            </CollapsibleNav>
        </Navbar>
        <div id='sidebar-wrapper'>
          <ul className='sidebar-nav'>
            {menuItems.map(item => {
              return (
                <li key={i++}>
                  <a href={item.href}>
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
})

export default NavComponent
