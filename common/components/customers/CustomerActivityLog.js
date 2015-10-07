import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const CustomerActivityLog = React.createClass({
  getDefaultProps() {
    return {
      data : []
    }
  },
  render() {
    const { data } = this.props
    return (
      <div>
        hello
      </div>
    )
  }
})
 
export default CustomerActivityLog
