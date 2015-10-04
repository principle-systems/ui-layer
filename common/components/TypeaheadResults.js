import React from 'react'

import { Table, Tr, Td, Thead } 
  from 'reactable'
import { Glyphicon } 
  from 'react-bootstrap'

const TypeaheadResults = React.createClass({
  handleRowClick(item) {
    this.props.onOptionSelected(item)
  },
  render() {
    const { options } = this.props
    const data = options.map(item => {
      return {
        result : item
      }
    })
    if (!data.length) {
      return (
        <Table className='table table-bordered no-thead'>
          <Tr>
            <Td column='result'>
              <span style={{color : '#aaa'}}>
                <Glyphicon glyph='remove' />&nbsp;No results
              </span>
            </Td>
          </Tr>
        </Table>
      )
    }
    return (
      <Table 
        ref             = 'table'
        className       = 'table table-hover table-bordered no-thead'
        columns         = {['result']}>
        {data.map(item => {
          return (
            <Tr key={item.result} onClick={() => this.handleRowClick(item.result)}>
              <Td column='result'>
                {item.result}
              </Td>
            </Tr>
          )
        })}
      </Table>
    )
  }
})

export default TypeaheadResults
