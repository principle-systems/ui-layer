import React from 'react'
import Grid  from '../Grid'

import { Input, Button, Glyphicon }
  from 'react-bootstrap'

const Component = React.createClass({
  render() {
    return (
      <Button block bsSize='xs'>
        <Glyphicon glyph='map-marker' /><span className='hidden-xs'>Show location</span>
      </Button>
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    const { data } = this.props
    const { collapsed } = this.state

    console.log(JSON.stringify(this.props.data.slice(0, 7), null, 2))

    const columns = collapsed 
        ? ['name', 'phone', 'area', 'priceCategory', 'location']
        : ['name', 'address', 'phone', 'area', 'priceCategory', 'location']
    const labels = collapsed 
        ? {
            'name'          : 'Name',
            'address'       : 'Address',
            'phone'         : 'Phone',
            'area'          : 'Area',
            'priceCategory' : 'Price cat.',
            'location'      : 'Location'
          }
        : {
            'name'          : 'Name',
            'address'       : 'Address',
            'phone'         : 'Phone number',
            'area'          : 'Area',
            'priceCategory' : 'Price category',
            'location'      : 'Location'
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
            'location' : Component 
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
