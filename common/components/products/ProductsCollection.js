import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const products = [
  {
    id       : 'products/1',
    sku      : '001-bananas',
    name     : 'Fresh bananas',
    unitSize : ''
  },
  {
    id       : 'products/2',
    sku      : '002-cheeze',
    name     : 'Levitating cheeze',
    unitSize : ''
  },
  {
    id       : 'products/3',
    sku      : '003-lhc',
    name     : 'Particle accellerator',
    unitSize : ''
  },
  {
    id       : 'products/4',
    sku      : '004-phone',
    name     : 'iPhone',
    unitSize : ''
  },
  {
    id       : 'products/5',
    sku      : '005-veg',
    name     : 'Palak paneer',
    unitSize : '1 portion'
  }
]

const ProductsCollection = React.createClass({
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    location.hash = item.id
  },
  render() {
    return (
      <div>
        <Input 
          placeholder     = 'Filter results'
          onChange        = {this.handleFilterChange}
          type            = 'text' />
        <Grid
          ref             = 'grid'
          data            = {products} 
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
