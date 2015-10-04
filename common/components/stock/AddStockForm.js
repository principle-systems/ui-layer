import React from 'react'
import TypeaheadResults from '../TypeaheadResults'

import { Input, Panel } 
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
        <Input label='Quantity' placeholder='Quantity' type='text' />
      </div>
    )
  }
})
 
export default AddStockForm
