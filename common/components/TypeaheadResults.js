import React from 'react'

import { Table, Glyphicon } 
  from 'react-bootstrap'

const TypeaheadResults = React.createClass({
  render() {
    const { options, onOptionSelected } = this.props
    if (!options.length) {
      return (
        <div style={{color : '#aaa', padding: '.5em'}}>
          <Glyphicon glyph='remove' />&nbsp;No results
        </div>
      )
    }
    return (
      <Table condensed hover bordered ref='table' className='typeahead-results'>
        <tbody>
          {options.map(item => {
            return (
              <tr 
                key     = {options.indexOf(item)} 
                onClick = {() => onOptionSelected(item)}
                style   = {{cursor : 'pointer'}}>
                  <td>
                    <span style={{marginLeft: '.5em'}}>
                      {item}
                    </span>
                  </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
})

export default TypeaheadResults
