import React from 'react'

import { connectReduxForm } 
  from 'redux-form'
import { Input, ButtonGroup, Button, Glyphicon, Col, Row }
  from 'react-bootstrap'

const CustomerRegistrationForm = React.createClass({
  getInitialState() {
    return {
      editGpsData : false
    }
  },
  getDefaultProps() {
    return {
      edit : false,
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
  resetTin() {
    this.refs.tin.props.handleChange('')
  },
  hint(field) {
    const { fields } = this.props
    return fields[field].touched && fields[field].error
  },
  handleToggleEditGpsData() {
    this.setState({
      editGpsData : !this.state.editGpsData
    })
  },
  render() {
    const { fields : { name, address, tin, phone, area, priceCategory, latitude, longitude }, handleSubmit, areas, priceCategories } = this.props
    return (
      <div>
        <Input {...name}
          type        = 'text'
          help        = {this.hint('name')}
          label       = 'Name'
          placeholder = "Customer's name"
          bsStyle     = {this.hint('name') ? 'error' : name.touched ? 'success' : null} 
        />
        <Input {...address}
          type        = 'text'
          help        = {this.hint('address')}
          label       = 'Address'
          placeholder = "Customer's address"
          bsStyle     = {this.hint('address') ? 'error' : address.touched ? 'success' : null} 
        />
        <Input {...tin}
          type        = 'text'
          ref         = 'tin'
          label       = 'TIN'
          placeholder = 'Taxpayer identification number'
          addonAfter  = {(
            <a href='#' onClick={e => { e.preventDefault(); this.resetTin() }}>
              <Glyphicon
                style = {{color: '#3e3e3e'}}
                glyph = 'remove' />
            </a>
          )}
        />
        <Input {...phone}
          type        = 'text'
          help        = {this.hint('phone')}
          label       = 'Phone number'
          placeholder = "The customer's phone number"
          bsStyle     = {this.hint('phone') ? 'error' : phone.touched ? 'success' : null} 
        />
        <Input {...area}
          type        = 'select' 
          value       = ''
          help        = {this.hint('area')}
          label       = 'Area' 
          bsStyle     = {this.hint('area') ? 'error' : area.touched ? 'success' : null} 
          placeholder = 'Select an area from the list'>
            {!area.value && (
              <option value={''}>
                Please select an area from the list
              </option>
            )}
            {areas.map(item => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              )
            })}
        </Input>
        <Input {...priceCategory}
          type        = 'select' 
          value       = ''
          help        = {this.hint('priceCategory')}
          label       = 'Price category' 
          bsStyle     = {this.hint('priceCategory') ? 'error' : priceCategory.touched ? 'success' : null} 
          placeholder = 'Select a price category from the list'>
            {!priceCategory.value && (
              <option value={''}>
                Please select a price category from the list
              </option>
            )}
            {priceCategories.map(item => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              )
            })}
        </Input>
        {this.props.edit && (
          <div>
            <Input 
              label           = 'GPS coordinates'
              ref             = 'coordinatesVisible'
              value           = {this.state.editGpsData}
              onChange        = {this.handleToggleEditGpsData}
              type            = 'checkbox' />
            {this.state.editGpsData && (
              <Row>
                <Col md={6}>
                  <Input {...latitude}
                    type        = 'text'
                    label       = 'Latitude'
                    placeholder = 'Latitude' />
                </Col>
                <Col md={6}>
                  <Input {...longitude}
                    type        = 'text'
                    label       = 'Longitude'
                    placeholder = 'Longitude' />
                </Col>
              </Row>
            )}
          </div>
        )}
        <hr />
        <ButtonGroup>
          <Button bsStyle='primary'>
            <Glyphicon glyph='ok' />Save
          </Button>
          <Button onClick={this.props.resetForm} bsStyle='default'>
            Reset
          </Button>
        </ButtonGroup>
      </div>
    )
  }
})
 
function validateCustomer(data) {
  const errors = {}
  if (!data.name) {
    errors.name = 'This field is required'
  }
  if (!data.address) {
    errors.address = 'This field is required'
  }
  if (!data.phone) {
    errors.phone = 'This field is required'
  }
  if (!data.area) {
    errors.area = 'You must select an area'
  }
  if (!data.priceCategory) {
    errors.priceCategory = 'You must select a price category'
  }
  return errors
}

export default connectReduxForm({
  form     : 'customer',
  fields   : ['name', 'address', 'tin', 'phone', 'area', 'priceCategory', 'latitude', 'longitude'],
  validate : validateCustomer
})(CustomerRegistrationForm)
