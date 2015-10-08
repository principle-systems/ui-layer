import React       from 'react'
import Grid        from '../Grid'
import ProductView from '../products/ProductView'

import { Input, Modal, Button }
  from 'react-bootstrap'

const stock = [
  {
    product   : 'Fresh bananas',
    actual    : 10,
    available : 10
  },
  {
    product   : 'Levitating cheeze',
    actual    : 10,
    available : 10
  },
  {
    product   : 'Particle accellerator',
    actual    : 10,
    available : 10
  },
  {
    product   : 'iPhone',
    actual    : 10,
    available : 10
  },
  {
    product   : 'Palak paneer',
    actual    : 10,
    available : 10
  }
]

const StockSummary = React.createClass({
  getInitialState() {
    return {
      selected : null
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(selected) {
    const product = this.props.device.fetch('products/_qG')
    this.setState({
      selected : product
    })
  },
  hideModal() {
    this.setState({
      selected : null
    })
  },
  render() {
    const { selected } = this.state
    return (
      <div>
        {selected && (
          <Modal show={!!selected} onHide={this.hideModal}>
            <Modal.Header closeButton={true}>
              <Modal.Title>Product details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ProductView product={selected} />
            </Modal.Body>
            <Modal.Footer>
              <Button block bsStyle='primary' onClick={this.hideModal}>
                Ok
              </Button>
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
          columns         = {['product', 'actual', 'available']}
          labels          = {{
            'product'   : 'Product',
            'available' : 'Available',
            'actual'    : 'Actual'
          }}
          onRowSelected   = {this.handleRowSelected}
          filterColumns   = {['product']}
          data            = {stock} />
      </div>
    )
  }
})
 
export default StockSummary
