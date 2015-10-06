import React from 'react'

import { Pagination, Glyphicon }
  from 'react-bootstrap'

const Grid = React.createClass({
  getInitialState() {
    return {
      filterBy : '',
      page     : 1
    }
  },
  getDefaultProps() {
    return {
      filterColumns : [],
      itemsPerPage  : 10
    }
  },
  handleSelectPage(event, item) {
    this.setState({
      page : item.eventKey
    })
  },
  filterBy(value) {
    this.setState({
      filterBy : value
    })
  },
  compile(items) {
    if (!items || !items.length) {
      return {
        items     : [],
        pageCount : 1
      }
    }
    const { itemsPerPage, filterColumns } = this.props
    const { page, filterBy } = this.state
    const filteredItems = (!filterBy || !filterColumns || !filterColumns.length) ? items : items.filter(item => {
      for (let i = 0; i < filterColumns.length; i++) {
        if (String(item[filterColumns[i]]).toLowerCase().indexOf(filterBy.toLowerCase()) > -1) {
          return true
        }
      }
      return false
    })
    if (!itemsPerPage || filteredItems.length <= itemsPerPage) {
      return {
        items     : filteredItems,
        pageCount : 1
      }
    }
    const offs = itemsPerPage * (page-1)
    return {
      items     : filteredItems.slice(offs, offs + itemsPerPage),
      pageCount : Math.ceil(filteredItems.length/itemsPerPage)
    }
  },
  render() {
    const { data, columns, labels, onRowSelected, tableClassName } = this.props
    const { items, pageCount } = this.compile(data) 
    let i = 1
    if (!items.length) {
      return (
        <span style={{color : '#aaa'}}>
          <Glyphicon glyph='remove' />&nbsp;There are no results to show.
        </span>
      )
    }
    return (
      <div>
        <table className={tableClassName}>
          {labels && (
            <thead>
              <tr>
                {columns.map(column => {
                  return (
                    <th key={column}>
                      {labels[column]}
                    </th>
                  )
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {items.map(item => {
              const cells = columns.map(column => {
                return (
                  <td key={column}>
                    {item[column]}
                  </td>
                )
              })
              return 'function' === typeof(onRowSelected) ? (
                <tr style={{cursor: 'pointer'}} onClick={() => onRowSelected(item)} key={i++}>{cells}</tr>
              ) : (
                <tr key={i++}>{cells}</tr>
              )
            })}
          </tbody>
        </table>
        {pageCount > 1 && (
          <div style={{textAlign: 'center'}}>
            <Pagination
              bsSize     = 'small'
              items      = {pageCount}
              style      = {{margin: 0}}
              activePage = {this.state.page}
              onSelect   = {this.handleSelectPage} />
          </div>
        )}
      </div>
    )
  }
})

export default Grid
