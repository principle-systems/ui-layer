import React from 'react'
import Grid  from '../Grid'

import { Input, Modal, Button }
  from 'react-bootstrap'

const stock = [
  {
    id        : 'stock/1',
    product   : 'Fresh bananas',
    actual    : 10,
    available : 10
  },
  {
    id        : 'stock/2',
    product   : 'Levitating cheeze',
    actual    : 10,
    available : 10
  },
  {
    id        : 'stock/3',
    product   : 'Particle accellerator',
    actual    : 10,
    available : 10
  },
  {
    id        : 'stock/4',
    product   : 'iPhone',
    actual    : 10,
    available : 10
  },
  {
    id        : 'stock/5',
    product   : 'Palak paneer',
    actual    : 10,
    available : 10
  }
]

const StockCheckForm = React.createClass({
  getInitialState() {
    return {
      stockItem : null
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    this.setState({
      stockItem : item
    })
  },
  hideModal() {
    this.setState({
      stockItem : null
    })
  },
  render() {
    const { stockItem } = this.state
    return (
      <div>
        {stockItem && (
          <Modal show={!!stockItem} onHide={this.hideModal}>
            <Modal.Header>
              <Modal.Title>Stock check</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              123
            </Modal.Body>
            <Modal.Footer>
              <Button block bsStyle='primary'>Save changes</Button>
            </Modal.Footer>
          </Modal>
        )}
        <Input 
          placeholder     = 'Filter results' 
          onChange        = {this.handleFilterChange} 
          type            = 'text' />
        <Grid
          ref             = 'grid'
          tableClassName  = 'table table-bordered'
          columns         = {['product', 'available', 'actual']}
          labels          = {{
            'product'   : 'Product',
            'actual'    : 'Actual',
            'available' : 'Available'
          }}
          filterColumns   = {['product']}
          onRowSelected   = {this.handleRowSelected}
          data            = {stock} />
      </div>
    )
  }
})
 
export default StockCheckForm
