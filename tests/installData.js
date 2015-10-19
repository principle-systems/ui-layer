import Areas            from './data/Areas'
import Customers        from './data/Customers'
import PriceCategories  from './data/PriceCategories'
import Products         from './data/Products'
import StockDamageTypes from './data/StockDamageTypes'
import Tasks            from './data/Tasks'
import Vehicles         from './data/Vehicles'

import { createResource, destroyResource, updateResource, registerStockMovement, addLastItemToCollection, addItemToCollection, removeItemFromCollection, transaction }
  from '../common/js/deviceActions'

/*

  const order = { 
    customer : 'customers/1',
    items    : [
      {
        product  : 'products/1',
        quantity : 7
      }
    ]
  }

  device.run(transaction([ 

    createResource(order, 'orders'),

    addLastItemToCollection('orders'),

    registerStockMovement({
      action   : 'Order created' ,
      type     : 'available'     ,
      item     : 'stock/_Od'     ,
      quantity : -7
    }) 

  ]))

  //device.run(destroyResource('orders/1'))
  //device.run(removeItemFromCollection('orders/1', 'orders'))

  //device.rewind()

*/

export default function(device) {

  console.log('>> Areas')
  Areas.items.forEach(item => {
    console.log(item)
    device.run(createResource(item, 'areas'))
  })
  console.log('>> Customers')
  Customers.items.forEach(item => {
    console.log(item)
    device.run(createResource(item, 'customers'))
  })
  console.log('>> Price categories')
  PriceCategories.items.forEach(item => {
    console.log(item)
    device.run(createResource(item, 'price-categories'))
  })
  console.log('>> Products')
  Products.items.forEach(item => {
    console.log(item)
    device.run(createResource(item, 'products'))
  })
  console.log('>> Stock damage types')
  StockDamageTypes.items.forEach(item => {
    console.log(item)
    device.run(createResource(item, 'stock-damage-types'))
  })
  console.log('>> Tasks')
  Tasks.items.forEach(item => {
    console.log(item)
    device.run(createResource(item, 'tasks'))
  })
  console.log('>> Vehicles')
  Vehicles.items.forEach(item => {
    console.log(item)
    device.run(createResource(item, 'vehicles'))
  })

  // ---

//  const customer = { 
//    id   : 'customers/1',
//    name : 'ACME Ltd.'
//  }
//
//  const product = { 
//    id   : 'products/1',
//    name : 'Coffee mug'
//  }
//
//  const order = { 
//    customer : { href : 'customers/1' },
//    items    : [
//      {
//        product  : { href : 'products/1' },
//        quantity : 7
//      }
//    ]
//  }
//
//  device.run(createResource(customer, 'customers'))
//  device.run(createResource(product, 'products'))
//  device.run(createResource(order, 'orders'))

}

