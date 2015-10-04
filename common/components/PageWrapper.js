import React from 'react'

const PageWrapper = React.createClass({
  render() {
    return (
      <div id='page-content-wrapper'>
        <div className='container-fluid'>
          {this.props.children}
         </div>
      </div>
    )
  }
})

export default PageWrapper
