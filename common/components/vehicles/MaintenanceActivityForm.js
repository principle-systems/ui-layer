import React from 'react'
import DateTimeField from 'react-bootstrap-datetimepicker'

import { Input, Button, Glyphicon, FormControls }
  from 'react-bootstrap'

const MaintenanceActivityForm = React.createClass({
  render() {
    return (
      <div>
        <FormControls.Static 
          label            = 'Vehicle registration number'
          wrapperClassName = 'static-control'
          value            = 'T3ABC 123' />
        <Input 
          type             = 'select'
          label            = 'Maintenance type'>
          <option>Please select a maintenance type from the list</option>
          <option>Type #2</option>
          <option>Type #3</option>
          <option>Type #4</option>
        </Input>
        <Input 
          type             = 'textarea'
          label            = 'Description' />
        <Input 
          type             = 'text'
          label            = 'Meter reading (km)' />
        <div className='form-group'>
          <label>Start time</label>
          <DateTimeField 
            ref            = 'dateTimeInput'
            dateTime       = {String(Date.now())} />
        </div>
        <Button block bsStyle='primary'>
          <Glyphicon glyph='check' />Save
        </Button>
      </div>
    )
  }
})

export default MaintenanceActivityForm
