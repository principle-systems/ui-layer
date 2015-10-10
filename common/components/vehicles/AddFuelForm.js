import React from 'react'

import { Input, Button, Glyphicon, FormControls }
  from 'react-bootstrap'

const AddFuelForm = React.createClass({
  render() {
    return (
      <div>
        <FormControls.Static 
          label            = 'Vehicle registration number'
          wrapperClassName = 'static-control'
          value            = 'T3ABC 123' />
        <Input 
          type             = 'text'
          label            = 'Meter reading (in km)' />
        <Input 
          type             = 'text' 
          label            = 'Amount (liters)' />
        <Button block bsStyle='primary'>
          <Glyphicon glyph='check' />Log
        </Button>
      </div>
    )
  }
})

export default AddFuelForm
