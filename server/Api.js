import Hashids from 'hashids'

import { LocalStorage } 
  from 'node-localstorage'

import CreateResource 
  from './commands/CreateResource'
import DestroyResource
  from './commands/DestroyResource'
import UpdateResource
  from './commands/UpdateResource'
import StockMovement
  from './commands/StockMovement'
import AddLastToCollection
  from './commands/AddLastToCollection'
import AddToCollection
  from './commands/AddToCollection'
import RemoveFromCollection
  from './commands/RemoveFromCollection'

const storage = new LocalStorage('./scratch')
const hashids = new Hashids('8uWOVQCB45GVNB8vlXbOjK104g8hPxBH')

class Store {

  constructor() {
    this._namespace = 'server'
    this._lastItem = null
    this._lastId = 0
  }

  generateId() {
    return `_${hashids.encode(++this._lastId)}`
  }

  setItem(key, obj) {
    storage.setItem(`${this._namespace}.${key}`, JSON.stringify(obj))
    this._lastItem = key
  }

  getItem(key, _default = null) {
    try {
      const str = storage.getItem(`${this._namespace}.${key}`)
      if (str) {
        return JSON.parse(str)
      }
    } catch(e) {
      console.log(e)
    }
    return _default
  }

  removeItem(key) {
    storage.removeItem(`${this._namespace}.${key}`)
  }

  updateItem(key, edit, _default) {
    let item = this.getItem(key, _default)
    edit(item)
    this.setItem(key, item)
  }

  hasItem(key) {
    return !!this.getItem(key)
  }

}

export default class Api {

  constructor() {
    this.transactions = []
    this.id_map = {}
    this.device = new Store()
  }

  run(command, method = 'up') {
    let obj = null
    const { action, payload } = command
    switch (action) {

      case 'create_resource':
        const new_id = `${payload.resource}/${this.device.generateId()}`
        this.id_map[payload.data.id] = new_id
        payload.data.id = new_id
        //
        this.replaceIds(payload)
        obj = new CreateResource(this.device, payload)
        break

      case 'destroy_resource':
        this.replaceIds(payload)
        obj = new DestroyResource(this.device, payload)
        break

      case 'update_resource':
        this.replaceIds(payload)
        obj = new UpdateResource(this.device, payload)
        break

      case 'stock_movement':
        this.replaceIds(payload)
        obj = new StockMovement(this.device, payload)
        break

      case 'add_last_item_to_collection':
        this.replaceIds(payload)
        obj = new AddLastToCollection(this.device, payload)
        break

      case 'add_to_collection':
        this.replaceIds(payload)
        obj = new AddToCollection(this.device, payload)
        break

      case 'remove_from_collection':
        this.replaceIds(payload)
        obj = new RemoveFromCollection(this.device, payload)
        break

      default:
        break

    }
    if (obj) {
      obj[method]()
    }
  }

  logTransaction(command) {
    this.transactions.push({
      timestamp : Date.now(),
      range     : [],
      command   
    })
  }

  commit(node, actions) {
    this.id_map = {}
    let errors = []
    actions.forEach(command => {
      try {

        this.run(command, 'up')
        this.logTransaction(command)

      } catch(e) {
        console.log(e)
      }
    })

    console.log(JSON.stringify(this.transactions, null, 2))
    console.log(JSON.stringify(this.id_map, null, 2))

    return {
      actions : this.transactions.filter(item => {
        if (item.range.indexOf(node) === -1) {
          item.range.push(node)
          return true
        }
        return false
      }).map(item => { return item.command }),
      ids : this.id_map,
      errors
    }
  }

  resetDevice(node) {
    this.transactions.forEach(item => {
      const index = item.range.indexOf(node)
      if (index > -1) {
        item.range.splice(index, 1)
      }
    })
  }

  clearStorage() {
    storage.clear()
  }

  replaceIds(obj) {
    if ('object' === typeof obj) {
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          this.replaceIds(obj[i])
        }
      } else {
        for (let key in obj) {
          const item = obj[key]
          switch (typeof item) {
            case 'object':
              this.replaceIds(item)
              break
            case 'string':
              if ('href' === key && this.id_map.hasOwnProperty(item)) {
                obj[key] = this.id_map[item]
              }
            default:
          }
        }
      }
    }
  }

}
