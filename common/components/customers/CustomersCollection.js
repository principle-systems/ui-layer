import React   from 'react'
import TimeAgo from 'react-timeago'
import Grid    from '../Grid'

import { Input, Button, Glyphicon }
  from 'react-bootstrap'

const LocationButton = React.createClass({
  render() {
    return (
      <Button block bsSize='xs'>
        <Glyphicon glyph='map-marker' /><span className='hidden-xs'>Show location</span>
      </Button>
    )
  }
})

const TimeComponent = React.createClass({
  timeFormatter(value, unit, suffix) {
    if ('second' === unit) {
      return 'less than a minute ago';
    }
    if (value !== 1) {
      unit += 's';
    }
    return `${value} ${unit} ${suffix}`
  },
  render() {
    const { data } = this.props
    return (
      <TimeAgo
        date      = {Number(data)}
        formatter = {this.timeFormatter} />
    )
  }
})
const dummyData = [
  {
    "name": "Teacher Shop",
    "priceCategory": "Retail",
    "phone": 25562440128,
    "area": "Kinondoni",
    "address": "Temboni, Saranga",
    "position": {
      "latitude": -6.78725,
      "longitude": 39.137914
    },
    "tin": "58-12976962",
    "_collections": [
      {
        "href": "customers",
        "collection": "customers"
      }
    ],
    "id": "customers/_oq2",
    "_links": {
      "self": {
        "href": "customers/_oq2"
      }
    },
    "lastActivity": 1444459774724
  },
  {
    "name": "Marafiki",
    "priceCategory": "Wholesale",
    "phone": 25565236987,
    "area": "Kinondoni",
    "address": "Kimala, Saranga",
    "position": {
      "latitude": -6.788137,
      "longitude": 39.166508
    },
    "tin": "23-22679669",
    "_collections": [
      {
        "href": "customers",
        "collection": "customers"
      }
    ],
    "id": "customers/_RrO",
    "_links": {
      "self": {
        "href": "customers/_RrO"
      }
    },
    "lastActivity": 1444459774724
  },
  {
    "name": "Saidi Shop",
    "priceCategory": "Retail",
    "phone": 25565259543,
    "area": "Ilala",
    "address": "Malapa, Buguruni",
    "position": {
      "latitude": -6.832891,
      "longitude": 39.250767
    },
    "tin": "59-12034636",
    "_collections": [
      {
        "href": "customers",
        "collection": "customers"
      }
    ],
    "id": "customers/_QnR",
    "_links": {
      "self": {
        "href": "customers/_QnR"
      }
    },
    "lastActivity": 1444459774724
  },
  {
    "name": "Franco Shop",
    "priceCategory": "Retail",
    "phone": 25565286261,
    "area": "Temeke",
    "address": "Maturubai, Mbagala",
    "position": {
      "latitude": -6.903499,
      "longitude": 39.266195
    },
    "tin": "6-46933783",
    "_collections": [
      {
        "href": "customers",
        "collection": "customers"
      }
    ],
    "id": "customers/_geG",
    "_links": {
      "self": {
        "href": "customers/_geG"
      }
    },
    "lastActivity": 1444459774724
  },
  {
    "name": "Baraka Shop",
    "priceCategory": "Retail",
    "phone": 25565311086,
    "area": "Temeke",
    "address": "Mapinduzi, Mtoni",
    "position": {
      "latitude": -6.866959,
      "longitude": 39.277318
    },
    "tin": "90-735783",
    "_collections": [
      {
        "href": "customers",
        "collection": "customers"
      }
    ],
    "id": "customers/_57n",
    "_links": {
      "self": {
        "href": "customers/_57n"
      }
    },
    "lastActivity": 1444459774724
  },
  {
    "name": "Robert",
    "priceCategory": "Retail",
    "phone": 25565358979,
    "area": "Ilala",
    "address": "Mawenzi, Kimanga",
    "position": {
      "latitude": -6.823217,
      "longitude": 39.211772
    },
    "tin": "66-74827410",
    "_collections": [
      {
        "href": "customers",
        "collection": "customers"
      }
    ],
    "id": "customers/_KAq",
    "_links": {
      "self": {
        "href": "customers/_KAq"
      }
    },
    "lastActivity": 1444459774724
  },
  {
    "name": "Abiolla",
    "priceCategory": "Retail",
    "phone": 25565541747,
    "area": "Temeke",
    "address": "Amani St, Mtoni",
    "position": {
      "latitude": -6.867473,
      "longitude": 39.277363
    },
    "tin": "44-70533089",
    "_collections": [
      {
        "href": "customers",
        "collection": "customers"
      }
    ],
    "id": "customers/_Wne",
    "_links": {
      "self": {
        "href": "customers/_Wne"
      }
    },
    "lastActivity": 1444459774724
  }
]

const CustomersCollection = React.createClass({
  getInitialState() {
    return {
      collapsed : window.innverWidth < 992
    }
  },
  getDefaultProps() {
    return {
      data : dummyData
    }
  },
  handleFilterChange(event) {
    this.refs.grid.filterBy(event.target.value)
  },
  handleRowSelected(item) {
    location.hash = item.id
  },
  handleResize() {
    const innerWidth = window.innerWidth,
          before = this.state.collapsed,
          collapsed = innerWidth < 992
    if (before != collapsed) {
      this.setState({collapsed})
    }
  },
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  render() {
    //const { data } = this.props
    const data = dummyData
    const { collapsed } = this.state

    const columns = collapsed 
        ? ['name', 'area', 'priceCategory', 'lastActivity']
        : ['name', 'address', 'phone', 'area', 'priceCategory', 'location', 'lastActivity']
    const labels = collapsed 
        ? {
            'name'          : 'Name',
            'address'       : 'Address',
            'phone'         : 'Phone',
            'area'          : 'Area',
            'priceCategory' : 'Price cat.',
            'location'      : 'Location',
            'lastActivity'  : 'Last activity'
          }
        : {
            'name'          : 'Name',
            'address'       : 'Address',
            'phone'         : 'Phone number',
            'area'          : 'Area',
            'priceCategory' : 'Price category',
            'location'      : 'Location',
            'lastActivity'  : 'Last activity'
          }
    return (
      <div>
        <Input 
          placeholder      = 'Filter results'
          onChange         = {this.handleFilterChange}
          type             = 'text' />
        <Grid 
          ref              = 'grid'
          data             = {data}
          customComponents = {{
            'location'     : LocationButton,
            'lastActivity' : TimeComponent
          }}
          columns          = {columns}
          labels           = {labels}
          onRowSelected    = {this.handleRowSelected}
          filterColumns    = {['name', 'address', 'phone']} 
          tableClassName   = 'table table-bordered' />
      </div>
    )
  }
})
 
export default CustomersCollection
