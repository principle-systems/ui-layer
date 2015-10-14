import React from 'react'

import { Input, Modal, Button, Panel, Table }
  from 'react-bootstrap'

const DispatchView = React.createClass({
  render() {
    return (
      <div>
        <Panel 
          className = 'panel-flat'
          header    = 'Dispatch details'
          bsStyle   = 'primary'>
          <Table bordered striped fill>
            <col width={200} />
            <col />
            <tbody>
              <tr>
                <td><strong>Vehicle</strong></td>
                <td>T328 BGY</td>
              </tr>
              <tr>
                <td><strong>Depot</strong></td>
                <td>Depot #1</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>Loading</td>
              </tr>
              <tr>
                <td><strong>Created</strong></td>
                <td>Two weeks ago</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
        <Panel 
          className = 'panel-flat'
          header    = 'Dispatch product items'
          bsStyle   = 'primary'>
          <Table condensed bordered striped fill>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Unit size</th>
                <th>Total qty.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Frozen Acai Energiser</td>
                <td>Not him old music think his found enjoy merry.</td>
                <td>16/BX</td>
                <td>20</td>
              </tr>
              <tr>
                <td>15</td>
                <td>Almond Kernals 24/27</td>
                <td>Not him old music think his found enjoy merry.</td>
                <td>16/BX</td>
                <td>20</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
        <Panel 
          className = 'panel-flat'
          header    = 'Dispatch orders'
          bsStyle   = 'primary'>
          <Panel 
            className = 'panel-flat'
            header    = 'Order #1'
            bsStyle   = 'default'>
            <Table condensed bordered striped fill>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Unit size</th>
                  <th>Total qty.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Frozen Acai Energiser</td>
                  <td>Not him old music think his found enjoy merry.</td>
                  <td>16/BX</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Almond Kernals 24/27</td>
                  <td>Not him old music think his found enjoy merry.</td>
                  <td>16/BX</td>
                  <td>20</td>
                </tr>
              </tbody>
            </Table>
          </Panel>
          <Panel 
            className = 'panel-flat'
            header    = 'Order #2'
            bsStyle   = 'default'>
            <Table condensed bordered striped fill>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Unit size</th>
                  <th>Total qty.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Frozen Acai Energiser</td>
                  <td>Not him old music think his found enjoy merry.</td>
                  <td>16/BX</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Almond Kernals 24/27</td>
                  <td>Not him old music think his found enjoy merry.</td>
                  <td>16/BX</td>
                  <td>20</td>
                </tr>
              </tbody>
            </Table>
          </Panel>
          <Panel 
            className = 'panel-flat'
            header    = 'Order #3'
            bsStyle   = 'default'>
            <Table condensed bordered striped fill>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Unit size</th>
                  <th>Total qty.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Frozen Acai Energiser</td>
                  <td>Not him old music think his found enjoy merry.</td>
                  <td>16/BX</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Almond Kernals 24/27</td>
                  <td>Not him old music think his found enjoy merry.</td>
                  <td>16/BX</td>
                  <td>20</td>
                </tr>
              </tbody>
            </Table>
          </Panel>
        </Panel>
      </div>
    )
  }
})

export default DispatchView
