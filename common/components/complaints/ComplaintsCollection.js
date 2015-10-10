import React         from 'react'
import Grid          from '../Grid'
import ComplaintView from './ComplaintView'
import TimeAgo       from 'react-timeago'

import { Input, Modal, Button }
  from 'react-bootstrap'

const complaints = [
  {
    id          : 'complaints/1',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/2',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/3',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/4',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  },
  {
    id          : 'complaints/5',
    customer    : 'Franco Shop',
    created     : Date.now(),
    type        : 'Quality',
    description : '',
    user        : 'Bob'
  }
]

const TimeComponent = React.createClass({
  timeFormatter(value, unit, suffix) {
    if ('second' === unit) {
      return 'less than a minute ago';
    }
    if (value !== 1) {
      unit += 's';
    }
    return `${value} ${unit} ${suffix}`
  },
  render() {
    const { data } = this.props
    return (
      <TimeAgo
        date      = {Number(data)}
        formatter = {this.timeFormatter} />
    )
  }
})

const ComplaintsCollection = React.createClass({
  getInitialState() {
    return {
      complaint : null
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(complaint) {
    this.setState({complaint})
  },
  hideModal() {
    this.setState({
      complaint : null
    })
  },
  render() {
    const { complaint } = this.state
    return (
      <div>
        <Modal show={!!complaint} onHide={this.hideModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Complaint details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ComplaintView complaint={complaint} />
          </Modal.Body>
          <Modal.Footer>
            <Button block bsStyle='primary' onClick={this.hideModal}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        <Input 
          placeholder      = 'Filter results' 
          onChange         = {this.handleFilterChange} 
          type             = 'text' />
        <Grid
          ref              = 'grid'
          columns          = {['customer', 'created', 'type', 'description', 'user']}
          customComponents = {{
            'created' : TimeComponent
          }}
          labels          = {{
            'customer'    : 'Customer',
            'created'     : 'Created',
            'type'        : 'Type',
            'description' : 'Description',
            'user'        : 'User'
          }}
          onRowSelected    = {this.handleRowSelected}
          filterColumns    = {['customer', 'description', 'user']}
          tableClassName   = 'table table-bordered'
          data             = {complaints} />
      </div>
    )
  }
})
 
export default ComplaintsCollection
