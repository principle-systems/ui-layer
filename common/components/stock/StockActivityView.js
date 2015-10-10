import React from 'react'
import Grid  from '../Grid'

import { Input }
  from 'react-bootstrap'

const stock = [
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  },
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  },
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  },
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  },
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  },
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  },
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  },
  {
    'action'   : 'Order created',
    'product'  : 'Frozen Acai Energiser',
    'type'     : 'available',
    'quantity' : 4
  }
]

const StockActivityView = React.createClass({
  render() {
    return (
      <div>
        <Grid
          ref             = 'grid'
          columns         = {['action', 'product', 'type', 'quantity', 'time']}
          labels          = {{
            'action'   : 'Action',
            'product'  : 'Product',
            'type'     : 'Quantity changed',
            'quantity' : 'Change incurred',
            'time'     : 'Time'
          }}
          tableClassName  = 'table table-bordered'
          data            = {stock} />
      </div>
    )
  }
})
 
export default StockActivityView
