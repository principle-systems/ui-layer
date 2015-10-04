import React from 'react'

import { Input, ButtonGroup, Button, Glyphicon }
  from 'react-bootstrap'

const CustomerRegistrationForm = React.createClass({
  render() {
    return (
      <div>
        <Input 
          type        = 'text'
          label       = 'Name'
          placeholder = "Customer's name"
        />
        <Input 
          type        = 'text'
          label       = 'Address'
          placeholder = "Customer's address"
        />
        <Input 
          type        = 'text'
          label       = 'TIN'
          placeholder = 'Taxpayer identification number'
        />
        <Input 
          type        = 'text'
          label       = 'Phone number'
          placeholder = "The customer's phone number"
        />
        <Input 
          type        = 'select' 
          label       = 'Area' 
          placeholder = 'Select an area from the list'>
            <option value='first'>
              First
            </option>
            <option value='second'>
              Second
            </option>
        </Input>
        <Input 
          type        = 'select' 
          label       = 'Price category' 
          placeholder = 'Select a price category from the list'>
            <option value='first'>
              First
            </option>
            <option value='second'>
              Second
            </option>
        </Input>
        <ButtonGroup>
          <Button bsStyle='primary'>
            <Glyphicon glyph='ok' />Save
          </Button>
          <Button bsStyle='default'>
            Reset
          </Button>
        </ButtonGroup>
      </div>
    )
  }
})
 
export default CustomerRegistrationForm
