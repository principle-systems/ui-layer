import React from 'react'
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

const StockDamageReportForm = React.createClass({
  render() {
    return (
      <div>
        <Row>
          <Col xs={6}>
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
          <Col xs={6}>
            <Input 
              label               = 'Quantity'
              placeholder         = 'Quantity'
              type                = 'text' 
              addonBefore         = {(
                <a href='#' onClick={e => { e.preventDefault() }}>
                  <Glyphicon
                    style = {{color: '#3e3e3e'}}
                    glyph = 'minus' />
                </a>
              )}
              addonAfter          = {(
                <a href='#' onClick={e => { e.preventDefault() }}>
                  <Glyphicon
                    style = {{color: '#3e3e3e'}}
                    glyph = 'plus' />
                </a>
              )} />
          </Col>
        </Row>
        <Input 
          label       = 'Type of damage'
          type        = 'select'>
            <option>Fire</option>
            <option>Explosion</option>
            <option>Water</option>
            <option>Impact</option>
        </Input>
        <Input 
          label       = 'Comment'
          placeholder = 'Provide a short description of the damage'
          type        = 'textarea' />
        <Button bsStyle='primary' block>
          Submit
        </Button>
      </div>
    )
  }
})
 
export default StockDamageReportForm
