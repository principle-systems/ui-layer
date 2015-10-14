import { EventEmitter } from 'events'
import $ from 'jquery'

import Transaction
  from '../commands/Transaction'
import CreateResource 
  from '../commands/CreateResource'
import DestroyResource
  from '../commands/DestroyResource'
import UpdateResource
  from '../commands/UpdateResource'
import StockMovement
  from '../commands/StockMovement'
import AddLastToCollection
  from '../commands/AddLastToCollection'
import AddToCollection
  from '../commands/AddToCollection'
import RemoveFromCollection
  from '../commands/RemoveFromCollection'

export class StorageItem {

  constructor(id, device, data = {}) {
    this.id = id
    this.data = data
    this.device = device
    this._sanitize()
  }

  static fetch(id, device) {
    let item = new StorageItem(id, device)
    item.load()
    return item.data
  }

  static insert(id, device, data) {
    let item = new StorageItem(id, device, data)
    item.save()
  }

  load() {
    this.data = this.device.getItem(this.id) || {}
    this._sanitize()
  }

  save() {
    this._sanitize()
    this.device.setItem(this.id, this.data)
  }

  destroy() {
    this.device.removeItem(this.id)
  }

  set(key, val) {
    this.data[key] = val
    return this
  }

  get(key) {
    return this.data[key]
  }

  hasProperty(key) {
    return this.data.hasOwnProperty(key)
  }

  _sanitize() {
    if (!this.data.hasOwnProperty('_links')) {
      this.data['_links'] = {}
    }
    if (!this.data['_links'].hasOwnProperty('self')) {
      this.data['_links']['self'] = {}
    } 
    this.data['_links']['self'].href = this.id
  }

}

export class Collection {

  constructor(id, device, resource) {
    this.id = id
    this.device = device
    this.resource = resource || id
    this.data = {}
    this._sanitize()
  }

  load() {
    this.data = this.device.getItem(this.id) || {}
    this._sanitize()
  }

  save() {
    this._sanitize()
    this.device.setItem(this.id, this.data)
  }

  embed(resource) {
    const target = this.data['_links'][resource]
    if (!this.data.hasOwnProperty('_embedded')) {
      this.data['_embedded'] = {} 
    }
    if (Array.isArray(target)) {
      this.data['_embedded'][resource] = target.map(item => {
        return StorageItem.fetch(item.href, this.device)
      })
    } else {
      this.data['_embedded'][resource] = StorageItem.fetch(target.href, this.device)
    }
  }

  static fetch(id, device, resource) {
    const collection = new Collection(id, device, resource)
    collection.load()
    return collection.data['_links'][collection.resource]
  }

  static fetchAll(id, device, resource) {
    const collection = new Collection(id, device, resource)
    collection.load()
    collection.embed(collection.resource)
    return collection.data['_embedded'][collection.resource]
  }

  addItem(id) {
    this.data['_links'][this.resource].push({ href : id })
    return this
  }

  removeItem(id) {
    let items = this.data['_links'][this.resource]
    for (let [index, item] of items.entries()) {
      if (item.href === id) {
        items.splice(index, 1)
        return this
      }
    }
    return this
  }

  _sanitize() {
    if (!this.data.hasOwnProperty('_links')) {
      this.data['_links'] = {} 
    }
    if (!this.data['_links'].hasOwnProperty('self')) {
      this.data['_links']['self'] = {}
    } 
    this.data['_links']['self'].href = this.id
    if (!this.data['_links'].hasOwnProperty(this.resource)) {
      this.data['_links'][this.resource] = []
    }
  }

}

const Command = {
  Up   : 'up',
  Down : 'down',
  factory : (action, device, payload) => {
    switch (action) {
      case 'transaction':
        return new Transaction(device, payload)
      case 'create_resource':             
        return new CreateResource(device, payload)
      case 'destroy_resource':            
        return new DestroyResource(device, payload)
      case 'update_resource':             
        return new UpdateResource(device, payload)
      case 'stock_movement':              
        return new StockMovement(device, payload)
      case 'add_last_item_to_collection': 
        return new AddLastToCollection(device, payload)
      case 'add_to_collection':           
        return new AddToCollection(device, payload)
      case 'remove_from_collection':      
        return new RemoveFromCollection(device, payload)
      default:
        throw `Unknown action: ${action}`
    }
  }
}

function syncStart(length) {
  return {
    type  : 'sync_start',
    total : length
  }
}

function syncProgress(remain) {
  return {
    type : 'sync_progress',
    remain 
  }
}

function syncComplete() {
  return {
    type : 'sync_complete'
  }
}

function requestStart() {
  return {
    type : 'request_start'
  }
}

function requestComplete() {
  return {
    type : 'request_complete'
  }
}

export class SyncHandler {

  constructor(device, store) {
    this.device = device
    this.store  = store
    this.isBusy = false
    this.batch  = []
    this.requestHandler = null
  }

  setRequestHandler(handler) {
    this.requestHandler = handler
  }

  handleResponse(response) {
    this.batch = response.actions
    if (this.batch.length > 50) {
      if (this.store) {
        this.store.dispatch(syncStart(this.batch.length))
      }
      this.processBatch()
    } else {
      response.actions.forEach(command => {
        this.device.run(command, Command.Up, false)
      })
      this.isBusy = false
    }
  }

  processBatch() {
    console.log('batch length : ' + this.batch.length)
    if (this.batch.length) {
      this.device.run(this.batch.splice(0, 1)[0], Command.Up, false)
      setTimeout(() => this.processBatch(), 4)
      if (this.store) {
        this.store.dispatch(syncProgress(this.batch.length))
      }
    } else {
      this.isBusy = false
      if (this.store) {
        this.store.dispatch(syncComplete())
      }
    }
  }

  sync(callback) {
    if (true === this.isBusy) {
      throw 'Device busy'
    }
    if (this.store) {
      this.store.dispatch(requestStart())
    }
    this.isBusy = true
    const body = {
      commit : this.device.getContext().commit,
      node   : this.device.getNamespace()
    }
    const request = {
      type                : 'POST',
      url                 : 'http://localhost:8081/sync',
      data                : JSON.stringify(body),
      contentType         : 'application/json',
      dataType            : 'json',
      error               : e => {
        console.log(e)
        if (this.store) {
          this.store.dispatch(requestComplete())
        }
        this.isBusy = false
      },
      success             : resp => {
        if (this.store) {
          this.store.dispatch(requestComplete())
        }
        this.handleResponse(resp)
        if ('function' === typeof callback) {
          callback(resp)
        }
      }
    }
    if ('function' === typeof this.requestHandler) {
      this.requestHandler(request, body)
    } else {
      $.ajax(request)
    }
  }

}

class Device extends EventEmitter {

  constructor(namespace, storage) {
    super()
    this._namespace = namespace
    this._lastItem = null
    this._lastId = 0
    if (storage) {
      this._storage = storage
    } else if ('object' === typeof localStorage) {
      this._storage = localStorage
    } else {
      throw 'A storage API must be provided for environments with no localStorage.'
    }
  }

  getLastItem() {
    return this._lastItem
  }

  getNamespace() {
    return this._namespace
  }

  generateId() {
    ++this._lastId
    return this._lastId
  }

  fetch(item) {
    return StorageItem.fetch(item, this)
  }

  fetchAll(resource) {
    return Collection.fetchAll(resource, this)
  }

  setItem(key, obj) {
    this._storage.setItem(`${this._namespace}.${key}`, JSON.stringify(obj))
    this._lastItem = key
  }

  getItem(key, _default = null) {
    try {
      const str = this._storage.getItem(`${this._namespace}.${key}`)
      if (str) {
        return JSON.parse(str)
      }
    } catch(e) {
      console.log(e)
    }
    return _default
  }

  removeItem(key) {
    this._storage.removeItem(`${this._namespace}.${key}`)
  }

  updateItem(key, edit, _default) {
    let item = this.getItem(key, _default)
    edit(item)
    this.setItem(key, item)
  }

  hasItem(key) {
    return !!this.getItem(key)
  }

  clearStorage() {
    this._storage.clear()
  }

  notify(message) {
    this.emit('notification', message)
  }

  getContext() {
    return this.getItem('_device', { commit : [] })
  }

  run(command, method = Command.Up, log = true) {
    const { action, payload } = command
    Command.factory(action, this, payload)[method]()
    if (true === log) {
      this.updateItem('_device', context => {
        context.commit.push(command)
      }, { commit : [] })
    }
  }

}

export default Device
