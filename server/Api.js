import Sequelize       from 'sequelize'
import Hashids         from 'hashids'

import db, { Transaction } 
  from './models'

const hashids = new Hashids('8uWOVQCB45GVNB8vlXbOjK104g8hPxBH')

class Command {

  constructor(api, payload) {
  }

  static factory(action, api, payload) {
    const actions = {
      'transaction'                 : TransactionCommand,
      'create_resource'             : CreateResourceCommand,
      'destroy_resource'            : DestroyResourceCommand,
      'update_resource'             : UpdateResourceCommand,
      'stock_movement'              : StockMovementCommand,
      'add_last_item_to_collection' : AddLastToCollectionCommand,
      'add_to_collection'           : AddToCollectionCommand,
      'remove_from_collection'      : RemoveFromCollectionCommand
    }
    if (!actions.hasOwnProperty(action)) {
      throw `Unknown action: ${action}`
    } else {
      return new actions[action](api, payload)
    }
  }

}

Command.Up   = 'up'
Command.Down = 'down'

class CreateResourceCommand extends Command {

  constructor(api, payload) {
    super(api, payload)
    const { data, resource } = payload
    //const new_id = `${resource}/_${hashids.encode(++Command.lastId)}`
    const new_id = `${resource}/_xxx`
    this.resource = resource
    this.data = data
    this.id = new_id
  }

  up() {
    const { resource, data } = this

    data.resource_id = this.id
    data.item = this.id
    delete data.id

    db.sequelize.models['Stock'].create(data)
  }

  down() {
    const { resource } = this
    db.sequelize.models[resource].findOne({ where : { resource_id : this.id } }).then(item => {
      item.destroy()
    })
  }

}

class TransactionCommand extends Command { }
class DestroyResourceCommand extends Command { }
class UpdateResourceCommand extends Command { }
class StockMovementCommand extends Command { }
class AddLastToCollectionCommand extends Command { }
class AddToCollectionCommand extends Command { }
class RemoveFromCollectionCommand extends Command { }

export default class Api {

  constructor() {
  }

  commit(node, actions) {

    actions.forEach(command => {

      const { timestamp, action, payload } = command

      Transaction.create({
        timestamp : timestamp,
        action    : action,
        payload   : JSON.stringify(payload)
      })

    })

    actions.forEach(command => {
      this.run(command)
    })

  }

  run(command, method = Command.Up) {
    const { action, payload } = command
    const cmd = Command.factory(action, this, payload)
    cmd[method]()
  }

}

//
//import Hashids from 'hashids'
//
//const hashids = new Hashids('8uWOVQCB45GVNB8vlXbOjK104g8hPxBH')
//
//class Command {
//
//  constructor(api, payload) {
//    this.api = api
//    this.db = api.db
//    this.replaceIds(payload)
//  }
//
//  replaceIds(obj) {
//    if ('object' === typeof obj) {
//      if (Array.isArray(obj)) {
//        for (let i = 0; i < obj.length; i++) {
//          this.replaceIds(obj[i])
//        }
//      } else {
//        for (let key in obj) {
//          const item = obj[key]
//          switch (typeof item) {
//            case 'object':
//              this.replaceIds(item)
//              break
//            case 'string':
//              if ('href' === key && this.id_map.hasOwnProperty(item)) {
//                obj[key] = this.id_map[item]
//              }
//            default:
//          }
//        }
//      }
//    }
//  }
//
//  static factory(action, api, payload) {
//    const actions = {
//      'transaction'                 : Transaction,
//      'create_resource'             : CreateResource,
//      'destroy_resource'            : DestroyResource,
//      'update_resource'             : UpdateResource,
//      'stock_movement'              : StockMovement,
//      'add_last_item_to_collection' : AddLastToCollection,
//      'add_to_collection'           : AddToCollection,
//      'remove_from_collection'      : RemoveFromCollection
//    }
//    if (!actions.hasOwnProperty(action)) {
//      throw `Unknown action: ${action}`
//    } else {
//      return new actions[action](api, payload)
//    }
//  }
//
//}
//
//Command.Up     = 'up'
//Command.Down   = 'down'
//Command.lastId = 0
//
//class Transaction extends Command {
//
//  constructor(api, payload) {
//    super(api, payload)
//  }
//
//  up() {
//  }
//
//  down() {
//  }
//
//}
//
//class CreateResource extends Command {
//
//  constructor(api, payload) {
//    const { data, resource } = payload
//    const new_id = `${resource}/_${hashids.encode(++Command.lastId)}`
//    api.id_map[data.id] = new_id
//    super(api, payload)
//    this.data = data
//    this.resource = resource
//    this.id = new_id
//  }
//
//  up() {
//    const { data, resource, db : { models } } = this
//    data.resource_id = this.id
//    delete data.id
//    models[resource].create(data, (error, message) => {
//      if (error) {
//        console.log(error)
//      }
//    })
//  }
//
//  down() {
//  }
//
//}
//
//class DestroyResource extends Command {
//
//  constructor(api, payload) {
//    super(api, payload)
//    console.log(':: DestroyResource ::')
//  }
//
//  up() {
//  }
//
//  down() {
//  }
//
//}
//
//class UpdateResource extends Command {
//
//  constructor(api, payload) {
//    super(api, payload)
//    console.log(':: UpdateResource ::')
//  }
//
//  up() {
//  }
//
//  down() {
//  }
//
//}
//
//class StockMovement extends Command {
//
//  constructor(api, payload) {
//    super(api, payload)
//    console.log(':: StockMovement ::')
//  }
//
//  up() {
//  }
//
//  down() {
//  }
//
//}
//
//class AddLastToCollection extends Command {
//
//  constructor(api, payload) {
//    super(api, payload)
//    console.log(':: AddLastToCollection ::')
//  }
//
//  up() {
//  }
//
//  down() {
//  }
//
//}
//
//class AddToCollection extends Command {
//
//  constructor(api, payload) {
//    super(api, payload)
//    console.log(':: AddToCollection ::')
//  }
//
//  up() {
//  }
//
//  down() {
//  }
//
//}
//
//class RemoveFromCollection extends Command {
//
//  constructor(api, payload) {
//    super(api, payload)
//    console.log(':: RemoveFromCollection ::')
//  }
//
//  up() {
//  }
//
//  down() {
//  }
//
//}
//
//export default class Api {
//  
//  constructor(db, models) {
//    this.db = db
//    this.models = models
//    this.id_map = {}
//  }
//
//  commit(node, actions) {
//    this.id_map = {}
//    const errors = []
//    actions.forEach(cmd => this.log(cmd))
//    actions.forEach(cmd => {
//      console.log(JSON.stringify(cmd, null, 2))
//      try {
//        this.run(cmd)
//      } catch(e) {
//        errors.push(e)
//      }
//    })
//
//    console.log(JSON.stringify(this.id_map, null, 2))
//
//    // run post-commit hook
//
//    // collect response
//  }
//
//  log(command) {
//    const { timestamp, action, payload } = command
//    this.models.transactions.create({
//      payload : JSON.stringify(payload),
//      timestamp,
//      action,
//    }, (error, messages) => {
//      if (error) {
//        console.log(error)
//      }
//    })
//  }
//
//  run(command, method = Command.Up) {
//    const { action, payload } = command
//    const obj = Command.factory(action, this, payload)
//    obj[method]()
//  }
//
//}
