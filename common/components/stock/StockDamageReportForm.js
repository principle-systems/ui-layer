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
  getDefaultProps() {
    return {
      damageTypes : [
        {
          id   : 'damages/1',
          name : 'Fire'
        },
        {
          id   : 'damages/2',
          name : 'Explosion'
        },
        {
          id   : 'damages/3',
          name : 'Water'
        },
        {
          id   : 'damages/4',
          name : 'Impact'
        }
      ]
    }
  },
  render() {
    const { damageTypes } = this.props
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
            <Input 
              label               = 'Quantity'
              placeholder         = 'Quantity'
              type                = 'number' />
          </Col>
        </Row>
        <Input 
          label       = 'Type of damage'
          type        = 'select'>
            {damageTypes.map(item => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              )
            })}
        </Input>
        <Input 
          label       = 'Comment'
          placeholder = 'Provide a short description of the damage'
          type        = 'textarea' />
        <Button bsStyle='primary' block>
          <Glyphicon glyph='ok' />Submit
        </Button>
      </div>
    )
  }
})
 
export default StockDamageReportForm
