import React from 'react'
import { connect } from 'react-redux';

const TestComponent = React.createClass({
  hello() {
    console.log('helllllo')
  },
  render() {
    return (
      <div>abc</div>
    )
  }
})

function select(state) {
  return state
}

export default connect(select)(TestComponent)

