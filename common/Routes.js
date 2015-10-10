import React                    from 'react'
import ProductView              from './components/products/ProductView'
import CustomerRegistrationForm from './components/customers/CustomerRegistrationForm'
import CustomersCollection      from './components/customers/CustomersCollection'
import CustomerView             from './components/customers/CustomerView'
import OrdersCollection         from './components/orders/OrdersCollection'
import ProductsCollection       from './components/products/ProductsCollection'
import StockSummary             from './components/stock/StockSummary'
import StockActivityView        from './components/stock/StockActivityView'

import { Tabs, Tab, Panel, Breadcrumb, BreadcrumbItem }
  from 'react-bootstrap'
import { initialize } 
  from 'redux-form'
import { createResource }
  from './js/deviceActions'

export const RouteProductItem = React.createClass({
  getInitialState() {
    return {
      product : null
    }
  },
  fetchProduct() {
    const { device, params } = this.props
    const product = device.fetch(`products/${params.id}`)
    this.setState({product}) 
  },
  componentDidMount() {
    this.fetchProduct()
    this.props.device.on('change', this.fetchProduct)
  },
  componentWillUnmount() {
    this.props.device.removeListener('change', this.fetchProduct)
  },
  render() {
    const { product } = this.state
    return product ? (
      <Panel 
        className = 'panel-fill'
        bsStyle   = 'primary'
        header    = 'Products'>
        <Breadcrumb>
          <BreadcrumbItem href='#/products'>
            Products
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {product.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <ProductView product={product} />
      </Panel>
    ) : (
      <span />
    )
  }
})

export const RouteCustomerEdit = React.createClass({
  componentDidMount() {
    const { device, params } = this.props
    const customer = device.fetch(`customers/${params.id}`)
    customer.latitude  = customer.position.latitude
    customer.longitude = customer.position.longitude
    this.props.dispatch(initialize('customer', customer))
  },
  render() {
    return (
      <Panel
        className   = 'panel-fill'
        bsStyle     = 'primary'
        header      = 'Customers'>
        <CustomerRegistrationForm edit={true} />
      </Panel>
    )
  }
})

export const RouteCustomerItem = React.createClass({
  getInitialState() {
    return {
      customer : null
    }
  },
  fetchCustomer() {
    const { device, params } = this.props
    const customer = device.fetch(`customers/${params.id}`)
    this.setState({customer}) 
  },
  componentDidMount() {
    this.fetchCustomer()
    this.props.device.on('change', this.fetchCustomer)
  },
  componentWillUnmount() {
    this.props.device.removeListener('change', this.fetchCustomer)
  },
  render() {
    const { customer } = this.state
    return customer ? (
      <Panel
        className   = 'panel-fill'
        bsStyle     = 'primary'
        header      = 'Customers'>
        <Breadcrumb>
          <BreadcrumbItem href='#/customers'>
            Customers
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {customer.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <CustomerView dashboard={this.props.dashboard} customer={customer} />
      </Panel>
    ) : (
      <span />
    )
  }
})

export const RouteCustomers = React.createClass({
  getInitialState() {
    return {
      key       : 1,
      customers : []
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  fetchCustomers() {
    this.setState({
      customers : this.props.device.fetchAll('customers')
    })
  },
  componentDidMount() {
    this.fetchCustomers()
    this.props.device.on('change', this.fetchCustomers)
  },
  componentWillUnmount() {
    this.props.device.removeListener('change', this.fetchCustomers)
  },
  handleSubmit(data) {
    console.log(data)
    this.props.device.run(createResource(data, 'customers'))
  },
  render() {
    const { key, customers } = this.state
    return (
      <Panel
        className   = 'panel-fill'
        bsStyle     = 'primary'
        header      = 'Customers'>
        <Tabs fill
          animation = {false}
          activeKey = {key}
          onSelect  = {this.handleSelect}>
          <Tab eventKey={1} title='All customers'>
            <Panel>
              <CustomersCollection data={customers} />
            </Panel>
          </Tab>
          <Tab eventKey={2} title='Register new customer'>
            <Panel>
              <CustomerRegistrationForm onSubmit={this.handleSubmit} />
            </Panel>
          </Tab>
          <Tab eventKey={3} title='Pending registrations'>
            <Panel>
              <CustomersCollection />
            </Panel>
          </Tab>
        </Tabs>
      </Panel>
    )
  }
})

export const RouteOrders = React.createClass({
  getInitialState() {
    return {
      key    : 1,
      orders : []
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  fetchOrders() {
    this.setState({
      customers : this.props.device.fetchAll('orders')
    })
  },
  componentDidMount() {
    this.fetchOrders()
    this.props.device.on('change', this.fetchOrders)
  },
  componentWillUnmount() {
    this.props.device.removeListener('change', this.fetchOrders)
  },
  render() {
    return (
      <Panel
        className   = 'panel-fill'
        bsStyle     = 'primary'
        header      = 'Orders'>
        <Tabs fill
          animation = {false}
          activeKey = {this.state.key}
          onSelect  = {this.handleSelect}>
          <Tab eventKey={1} title='Requested orders'>
            <Panel>
              <OrdersCollection />
            </Panel>
          </Tab>
          <Tab eventKey={2} title='Live orders'>
            <Panel>
              <OrdersCollection />
            </Panel>
          </Tab>
          <Tab eventKey={3} title='Rejected orders'>
            <Panel>
              <OrdersCollection />
            </Panel>
          </Tab>
        </Tabs>
      </Panel>
    )
  }
})

export const RouteProducts = React.createClass({
  getInitialState() {
    return {
      products : []
    }
  },
  fetchProducts() {
    this.setState({
      products : this.props.device.fetchAll('products')
    })
  },
  componentDidMount() {
    this.fetchProducts()
    this.props.device.on('change', this.fetchProducts)
  },
  componentWillUnmount() {
    this.props.device.removeListener('change', this.fetchProducts)
  },
  render() {
    return (
      <Panel
        bsStyle = 'primary'
        header  = 'Products'>
        <ProductsCollection data={this.state.products} />
      </Panel>
    )
  }
})

export const RouteStock = React.createClass({
  getInitialState() {
    return {
      key : 1
    }
  },
  handleSelect(key) {
    this.setState({key})
  },
  render() {
    return (
      <Panel
        className   = 'panel-fill'
        bsStyle     = 'primary'
        header      = 'Stock'>
        <Tabs fill
          animation = {false}
          activeKey = {this.state.key}
          onSelect  = {this.handleSelect}>
          <Tab eventKey={1} title='Summary'>
            <Panel>
              <StockSummary {...this.props} />
            </Panel>
          </Tab>
          <Tab eventKey={2} title='Activity'>
            <Panel>
              <StockActivityView />
            </Panel>
          </Tab>
        </Tabs>
      </Panel>
    )
  }
})

