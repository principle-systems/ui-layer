import React from 'react'

import { Nav, NavItem, Navbar, NavBrand, CollapsibleNav, Glyphicon }
  from 'react-bootstrap'

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
    location.hash = item.substr(1)
  },
  render() {
    const { menuItems } = this.props
    return (
      <div>
        <Navbar
          fixedTop     = {true}
          fluid        = {true}
          navExpanded  = {this.state.expanded}
          onToggle     = {this.toggle}
          inverse      = {true}
          toggleNavKey = {0}>
          <NavBrand>
            <a href='#'>
              <img src='../images/sphere-logo.png' alt='' />
            </a>
          </NavBrand>
          <CollapsibleNav eventKey={0}>
            <Nav navbar
              onSelect    = {this.handleSelectItem}
              ulClassName = 'collapsed'>
              {menuItems.map((item, i) => {
                return (
                  <NavItem 
                    key      = {i}
                    eventKey = {i}
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
            {menuItems.map((item, i) => {
              return (
                <li key={i}>
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
