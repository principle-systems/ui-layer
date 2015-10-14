import React from 'react'

import { connect } 
  from 'react-redux'
import { Modal, ProgressBar }
  from 'react-bootstrap'

const SyncComponent = React.createClass({
  render() {
    const { running, current, total } = this.props
    return (
      <div>
        <Modal onHide={() => {}} show={running}>
          <Modal.Body>
            <ProgressBar
              style = {{marginBottom: 0}}
              max   = {total}
              now   = {current} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
})

function inject(state) {
  return state.sync
}

export default connect(inject)(SyncComponent) 
