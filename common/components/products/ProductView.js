import React from 'react'

import { Panel }
  from 'react-bootstrap'

const ProductView = React.createClass({
  render() {
    const { product } = this.props
    return (
      <div>
        <h3>{product.name}</h3>
        <blockquote>
          {product.description}
        </blockquote>
        <h4>Properties</h4>
      </div>
    )
  }
})

export default ProductView
