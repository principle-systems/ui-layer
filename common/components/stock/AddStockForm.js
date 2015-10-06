import React            from 'react'
import RcSlider         from 'rc-slider'
import TypeaheadResults from '../TypeaheadResults'

import { Input, Panel, Glyphicon, Row, Col, Button } 
  from 'react-bootstrap'
import { Typeahead } 
  from 'react-typeahead'

const products = [
  'Fresh bananas',
  'Levitating cheeze',
  'Particle accellerator',
  'iPhone',
  'Palak paneer'
]

const AddStockForm = React.createClass({
  render() {
    return (
      <div>
        <Row>
          <Col sm={8}>
            <div className='form-group'>
              <label>Product</label>
              <Typeahead
                defaultClassNames   = {false}
                placeholder         = 'Type the name of a product'
                customClasses       = {{input : 'form-control'}}
                options             = {products}
                maxVisible          = {20} 
                customListComponent = {TypeaheadResults} />
            </div>
          </Col>
          <Col sm={4}>
            <div>
              <Input 
                label               = 'Quantity'
                placeholder         = 'Quantity'
                type                = 'number' />
            </div>
          </Col>
        </Row>
        <Button bsStyle='primary' block>
          <Glyphicon glyph='ok' />Add stock
        </Button>
      </div>
    )
  }
})
 
export default AddStockForm
