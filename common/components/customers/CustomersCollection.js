import React from 'react'
import Grid  from '../Grid'

import { Input, Button, Glyphicon }
  from 'react-bootstrap'

const Component = React.createClass({
  render() {
    return (
      <Button block bsSize='xs'>
        <Glyphicon glyph='map-marker' /><span className='hidden-xs'>Show location</span>
      </Button>
    )
  }
})

const CustomersCollection = React.createClass({
  getInitialState() {
    return {
      collapsed : window.innverWidth < 992
    }
  },
  getDefaultProps() {
    return {
      data : []
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    location.hash = item.id
  },
  handleResize() {
    const innerWidth = window.innerWidth,
          before = this.state.collapsed,
          collapsed = innerWidth < 992
    if (before != collapsed) {
      this.setState({collapsed})
    }
  },
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  render() {
    const { data } = this.props
    const { collapsed } = this.state
    const columns = collapsed 
        ? ['name', 'phone', 'area', 'priceCategory', 'location']
        : ['name', 'address', 'phone', 'area', 'priceCategory', 'location']
    const labels = collapsed 
        ? {
            'name'          : 'Name',
            'address'       : 'Address',
            'phone'         : 'Phone',
            'area'          : 'Area',
            'priceCategory' : 'Price cat.',
            'location'      : 'Location'
          }
        : {
            'name'          : 'Name',
            'address'       : 'Address',
            'phone'         : 'Phone number',
            'area'          : 'Area',
            'priceCategory' : 'Price category',
            'location'      : 'Location'
          }
    return (
      <div>
        <Input 
          placeholder      = 'Filter results'
          onChange         = {this.handleFilterChange}
          type             = 'text' />
        <Grid 
          ref              = 'grid'
          data             = {data}
          customComponents = {{
            'location' : Component 
          }}
          columns          = {columns}
          labels           = {labels}
          onRowSelected    = {this.handleRowSelected}
          filterColumns    = {['name', 'address', 'phone']} 
          tableClassName   = 'table table-bordered' />
      </div>
    )
  }
})
 
export default CustomersCollection
