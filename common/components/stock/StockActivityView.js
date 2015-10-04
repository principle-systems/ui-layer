import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Input }
  from 'react-bootstrap'

const stock = [
  {
    time : 'Now'
  },
  {
    time : 'Now'
  },
  {
    time : 'Now'
  },
  {
    time : 'Now'
  },
  {
    time : 'Now'
  }
]

const StockActivityView = React.createClass({
  render() {
    return (
      <div>
        <Table 
          ref             = 'table'
          className       = 'table table-bordered'
          columns         = {[
            {
              label : 'Time',
              key   : 'time'
            }
          ]}
          data            = {stock}
          itemsPerPage    = {10} 
          pageButtonLimit = {5}
        />
      </div>
    )
  }
})
 
export default StockActivityView
