import React from 'react'

import { Input, ButtonGroup, Button, Glyphicon }
  from 'react-bootstrap'

const CustomerRegistrationForm = React.createClass({
  getDefaultProps() {
    return {
      areas : [
        {
          id   : 1,
          name : 'Global'
        }
      ],
      priceCategories : [
        {
          id   : 1,
          name : 'Default'
        }
      ]
    }
  },
  render() {
    const { areas, priceCategories } = this.props
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
          addonAfter  = {(
            <a href='#' onClick={e => { e.preventDefault() }}>
              <Glyphicon
                style = {{color: '#3e3e3e'}}
                glyph = 'remove' />
            </a>
          )}
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
            {areas.map(item => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              )
            })}
        </Input>
        <Input 
          type        = 'select' 
          label       = 'Price category' 
          placeholder = 'Select a price category from the list'>
            {priceCategories.map(item => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              )
            })}
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
