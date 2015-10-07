import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const ProductsCollection = React.createClass({
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
  render() {
    const { data } = this.props
    return (
      <div>
        <Input 
          placeholder     = 'Filter results'
          onChange        = {this.handleFilterChange}
          type            = 'text' />
        <Grid
          ref             = 'grid'
          data            = {data} 
          tableClassName  = 'table table-bordered'
          columns         = {['sku', 'name', 'unitSize']}
          filterColumns   = {['name']}
          labels          = {{
            'sku'      : 'SKU',
            'name'     : 'Name',
            'unitSize' : 'Unit size'
          }} 
          onRowSelected   = {this.handleRowSelected}
        />
      </div>
    )
  }
})
 
export default ProductsCollection
